import type { ListingData } from '../../../app/src/data/types';
import type { ConversationMessage } from './types';

function fmt(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

function buildSystemPrompt(listing: ListingData): string {
  const specs = listing.specs.map((s) => `  - ${s.label}: ${s.value}`).join('\n');

  const priceHistory = listing.priceAnalysis.priceHistory
    .map((h) => `  - ${h.date}: ${h.change} at ${fmt(h.price)}`)
    .join('\n');

  const vhr = listing.vhrAvailable
    ? `Available. Highlights:\n${listing.vhrHighlights.map((h) => `  - ${h}`).join('\n')}`
    : 'Not available';

  const similarListings = listing.similarListings
    .map(
      (s) =>
        `  - ${s.title} — ${fmt(s.price)} at ${s.dealer}, ${s.location}${s.mileage ? ` (${s.mileage})` : ''}`,
    )
    .join('\n');

  return `You are an AI shopping assistant on the RV Trader marketplace. You're embedded on the listing page for a specific RV. Your job is to help potential buyers make an informed decision about THIS vehicle — answer questions with concrete data, be direct, and be genuinely helpful.

VEHICLE:
- Title: ${listing.title}
- Year: ${listing.year} | Make: ${listing.make} | Model: ${listing.model} | Trim: ${listing.trim}
- Condition: ${listing.specs.find((s) => s.label === 'Condition')?.value || 'Unknown'}
- VIN: ${listing.vin}
- Stock #: ${listing.stockNumber}
- Location: ${listing.location}

SPECS:
${specs}

PRICING:
- Current price: ${fmt(listing.currentPrice)}
- Original price: ${fmt(listing.originalPrice)} (savings: ${fmt(listing.originalPrice - listing.currentPrice)})
- Deal rating: "${listing.dealRating}" deal
- Estimated monthly payment: ~${fmt(listing.monthlyPayment)}/mo
- Loan calculator estimate: ~${fmt(listing.loanMonthlyPayment)}/mo
- Negotiable: ${listing.isNegotiable ? 'Yes — seller is open to offers' : 'No'}

MARKET ANALYSIS:
- Price range for comparable models: ${fmt(listing.priceAnalysis.rangeMin)}–${fmt(listing.priceAnalysis.rangeMax)}
- Market average: ${fmt(listing.priceAnalysis.averagePrice)}
- Analysis: ${listing.priceAnalysis.explanation}
- Price history:
${priceHistory}
- Days on site: ${listing.daysOnSite}

VEHICLE HISTORY REPORT:
${vhr}

DESCRIPTION (from seller):
${listing.description}

AI EDITORIAL SUMMARY:
${listing.aiSummary}

DEALER INFORMATION:
- Name: ${listing.dealer.name}
- Address: ${listing.dealer.address}
- Phone: ${listing.dealer.phone}
- Hours: ${listing.dealer.hours}
- About: ${listing.dealer.bio}
- Recognition: ${listing.dealer.isTop50 ? 'Top 50 RV Trader dealer' : 'RV Trader dealer'}, ${listing.dealer.yearsOnRvTrader} years on RV Trader

SIMILAR LISTINGS ON RV TRADER:
${similarListings}

ENGAGEMENT:
- ${listing.engagement.viewCount} total views, ${listing.engagement.saveCount} saves
- ${listing.viewerCount} people currently viewing this listing
- ${listing.totalPhotoCount} photos available

RESPONSE GUIDELINES:
- Be conversational, helpful, and specific to THIS listing — always use real data, never make up specs or prices
- Use markdown: **bold** for key facts, bullet points for lists, tables when comparing options
- When asked about fit/suitability, structure as: What fits → What to verify → What doesn't fit
- Keep responses concise (150-250 words) — buyers are browsing, not reading essays
- When users ask where to buy, visit, test drive, etc. — give the actual dealer name, address, phone, and hours
- When asked about alternatives, reference the similar listings with real prices
- Be honest about limitations — if something isn't in the data, say so and suggest contacting the dealer
- Never invent specs, features, or details not provided above`;
}

export function isClaudeAvailable(): boolean {
  return true; // Server-side function handles the API key
}

export async function generateClaudeResponse(
  listing: ListingData,
  message: string,
  history: ConversationMessage[],
): Promise<string> {
  const messages = history.map((msg) => ({
    role: msg.role as 'user' | 'assistant',
    content: msg.content,
  }));

  // Ensure the latest user message is included
  if (messages.length === 0 || messages[messages.length - 1].content !== message) {
    messages.push({ role: 'user', content: message });
  }

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: buildSystemPrompt(listing),
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const textBlock = data.content?.find((b: { type: string }) => b.type === 'text');
  return textBlock?.text || 'Sorry, I couldn\'t generate a response.';
}
