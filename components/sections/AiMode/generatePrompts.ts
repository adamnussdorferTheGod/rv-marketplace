import type { ListingData } from '../../../app/src/data/types';

export function generateInitialPrompts(listing: ListingData): string[] {
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
  listing: ListingData,
): string[] {
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
