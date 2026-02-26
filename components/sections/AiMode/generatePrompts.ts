import type { ListingData } from '../../../app/src/data/types';

export function generateInitialPrompts(listing: ListingData): string[] {
  return [
    `What destinations are best for this ${listing.model} ${listing.trim}?`,
    `Plan a weekend trip with this ${listing.make} ${listing.model}`,
    `What national parks can I visit with this trailer?`,
    `What do I need to tow this ${listing.model}?`,
    `What's it like camping in an ${listing.make}?`,
  ];
}

export function generateFollowUpPrompts(
  lastMessage: string,
  listing: ListingData,
): string[] {
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

  if (lower.includes('spec') || lower.includes('feature') || lower.includes('layout')) {
    return [
      `How does this floor plan work for a family of 4?`,
      `What makes ${listing.make} stand out for long trips?`,
      `What destinations show off these features best?`,
    ];
  }

  if (lower.includes('compar') || lower.includes('vs') || lower.includes('alternative')) {
    return [
      `Which is better for boondocking?`,
      `What about for cross-country road trips?`,
      `How do they compare for full-time living?`,
    ];
  }

  if (lower.includes('own') || lower.includes('mainten') || lower.includes('gear')) {
    return [
      `What accessories do I need for my first trip?`,
      `Best beginner-friendly campgrounds to try first?`,
      `How do I prepare for cold weather camping?`,
    ];
  }

  return [
    `Suggest a road trip for this ${listing.model}`,
    `What campgrounds work best for this trailer?`,
    `What gear should I bring on my first trip?`,
  ];
}
