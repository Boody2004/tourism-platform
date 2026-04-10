import tripsData from '@/data/trips.json';
import { Trip } from './types';

export const trips: Trip[] = tripsData as Trip[];

// Get all unique trip types dynamically from data
export function getAllTripTypes(): string[] {
  const types = new Set(trips.map(t => t.type));
  return Array.from(types).sort();
}

// Get all unique destinations dynamically from data
export function getAllDestinations(): string[] {
  const destinations = new Set(trips.map(t => t.destination));
  return Array.from(destinations).sort();
}

// Get all trips
export function getAllTrips(): Trip[] {
  return trips;
}

// Get featured trips
export function getFeaturedTrips(): Trip[] {
  return trips.filter(t => t.featured);
}

// Get trip by slug
export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find(t => t.slug === slug);
}

// Get trips by type (case-insensitive)
export function getTripsByType(type: string): Trip[] {
  return trips.filter(t => t.type.toLowerCase() === type.toLowerCase());
}

// Get trips by destination (case-insensitive, partial match)
export function getTripsByDestination(destination: string): Trip[] {
  return trips.filter(t =>
    t.destination.toLowerCase().includes(destination.toLowerCase()) ||
    destination.toLowerCase().includes(t.destination.toLowerCase().split(',')[0])
  );
}

// Generate static params for [type] pages — purely from JSON, never hardcoded
export function generateTripTypeParams() {
  return getAllTripTypes().map(type => ({
    type: type.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Generate static params for [destination] pages — purely from JSON, never hardcoded
export function generateDestinationParams() {
  return getAllDestinations().map(dest => ({
    destination: dest.toLowerCase().replace(/[,\s]+/g, '-'),
  }));
}

// Utility: format type/destination from URL param back to readable
export function paramToLabel(param: string): string {
  return param.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// cn utility
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
