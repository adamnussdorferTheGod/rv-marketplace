import type { ListingData } from '../../../app/src/data/types';
import type { PanelMode } from './types';

export function generateInitialPrompts(listing?: ListingData): string[] {
  if (!listing) {
    return [
      "What's a good RV for a couple with pets?",
      'What should I look for in a used travel trailer?',
      'What size truck do I need to tow a fifth wheel?',
      "What's the best RV for full-time living?",
      'How much does RV ownership cost per year?',
    ];
  }

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(listing.currentPrice);

  return [
    `Is ${price} a good deal for this ${listing.make} ${listing.model}?`,
    `What are the key specs of this ${listing.model} ${listing.trim}?`,
    `What do I need to tow this trailer?`,
    `How does this compare to similar travel trailers?`,
    `What should I know about owning an ${listing.make}?`,
  ];
}

export function generateFollowUpPrompts(
  lastMessage: string,
  listing: ListingData | undefined,
  panelMode: PanelMode = 'default',
): string[] {
  if (panelMode === 'plan') {
    return generatePlanFollowUps(lastMessage, listing);
  }
  if (!listing) {
    return generateSrpFollowUps(lastMessage);
  }
  return generateDefaultFollowUps(lastMessage, listing);
}

function generateSrpFollowUps(lastMessage: string): string[] {
  const lower = lastMessage.toLowerCase();

  if (lower.includes('couple') || lower.includes('pet') || lower.includes('dog') || lower.includes('cat')) {
    return [
      'What floor plans work best for pets?',
      'How much should I budget for a first RV?',
      'Class B vs travel trailer — which is better for two people?',
    ];
  }

  if (lower.includes('family') || lower.includes('kid') || lower.includes('child') || lower.includes('bunk')) {
    return [
      'What are the best bunkhouse floor plans?',
      'Travel trailer vs Class C for families?',
      'How much space do we really need for 4 people?',
    ];
  }

  if (lower.includes('full-time') || lower.includes('fulltime') || lower.includes('live in') || lower.includes('nomad')) {
    return [
      'What does full-time RV living cost per month?',
      'How do I handle mail and domicile on the road?',
      'Best internet setup for working remotely in an RV?',
    ];
  }

  if (lower.includes('tow') || lower.includes('truck') || lower.includes('hitch') || lower.includes('pull')) {
    return [
      'What about fuel economy while towing?',
      'Fifth wheel vs travel trailer — pros and cons?',
      'Do I need a weight distribution hitch?',
    ];
  }

  if (lower.includes('price') || lower.includes('cost') || lower.includes('budget') || lower.includes('afford')) {
    return [
      'What are the hidden costs of RV ownership?',
      'Is it better to buy new or used?',
      'When is the best time of year to buy an RV?',
    ];
  }

  if (lower.includes('camp') || lower.includes('trip') || lower.includes('travel') || lower.includes('destination')) {
    return [
      'What are the best RV-friendly national parks?',
      'How do I find free camping spots?',
      'What apps do RVers use for trip planning?',
    ];
  }

  if (lower.includes('beginner') || lower.includes('first') || lower.includes('start') || lower.includes('new to')) {
    return [
      'Should I rent before I buy?',
      'What are the most common beginner mistakes?',
      'What gear do I need beyond the RV itself?',
    ];
  }

  if (lower.includes('class a') || lower.includes('class b') || lower.includes('class c') || lower.includes('motorhome') || lower.includes('van')) {
    return [
      'What are the maintenance costs for motorhomes?',
      'Can I tow a car behind a motorhome?',
      'Motorhome vs travel trailer — which is right for me?',
    ];
  }

  if (lower.includes('maintain') || lower.includes('repair') || lower.includes('inspect') || lower.includes('winterize')) {
    return [
      'How often should I reseal the roof?',
      'What are the most common RV problems?',
      'How do I winterize my RV?',
    ];
  }

  if (lower.includes('insur') || lower.includes('warranty') || lower.includes('financ') || lower.includes('loan')) {
    return [
      'What does RV insurance typically cost?',
      'Are extended warranties worth it?',
      'What credit score do I need for an RV loan?',
    ];
  }

  return [
    'What type of RV is best for beginners?',
    'How do I know if a used RV is a good deal?',
    'What questions should I ask a dealer?',
  ];
}

function generatePlanFollowUps(lastMessage: string, listing: ListingData | undefined): string[] {
  const lower = lastMessage.toLowerCase();

  if (lower.includes('destination') || lower.includes('park') || lower.includes('camp')) {
    return [
      `What's the best time of year to go?`,
      `Are there hookups at these campgrounds?`,
      `Plan a full road trip itinerary for me`,
    ];
  }

  if (lower.includes('trip') || lower.includes('route') || lower.includes('road')) {
    return [
      `What campgrounds should I book along the way?`,
      `What gear do I need for this trip?`,
      `How far can I comfortably drive each day while towing?`,
    ];
  }

  if (lower.includes('tow') || lower.includes('hitch') || lower.includes('truck')) {
    return [
      `What about fuel economy while towing?`,
      `What's the best setup for mountain roads?`,
      `Which destinations are easy towing routes?`,
    ];
  }

  if (lower.includes('gear') || lower.includes('pack') || lower.includes('bring')) {
    return [
      `What about cold weather camping gear?`,
      `Best beginner-friendly campgrounds to try first?`,
      `Plan a weekend trip for me`,
    ];
  }

  return [
    listing ? `Suggest a road trip for this ${listing.model}` : 'Suggest a great first road trip',
    listing ? `What campgrounds work best for this trailer?` : 'Best campgrounds for beginners?',
    `What gear should I bring on my first trip?`,
  ];
}

function generateDefaultFollowUps(lastMessage: string, listing: ListingData): string[] {
  const lower = lastMessage.toLowerCase();

  if (lower.includes('price') || lower.includes('deal') || lower.includes('cost')) {
    return [
      `Can I negotiate the price?`,
      `What are the financing options?`,
      `How does this compare to similar models?`,
    ];
  }

  if (lower.includes('spec') || lower.includes('feature') || lower.includes('layout')) {
    return [
      `What tow vehicle do I need for this?`,
      `How does this floor plan compare to others?`,
      `What are the ownership costs like?`,
    ];
  }

  if (lower.includes('tow') || lower.includes('hitch') || lower.includes('truck')) {
    return [
      `What about fuel economy while towing?`,
      `Tell me about the specs and features`,
      `Is this a good deal for the price?`,
    ];
  }

  if (lower.includes('compar') || lower.includes('vs') || lower.includes('alternative')) {
    return [
      `Why choose ${listing.make} over other brands?`,
      `Is this a fair price for what you get?`,
      `What are the ownership costs?`,
    ];
  }

  if (lower.includes('own') || lower.includes('mainten') || lower.includes('insur')) {
    return [
      `What about resale value?`,
      `What tow vehicle do I need?`,
      `Is the asking price fair?`,
    ];
  }

  return [
    `Tell me more about the pricing`,
    `What are the key features?`,
    `What do I need to tow this?`,
  ];
}
