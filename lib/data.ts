import tripsData from "@/data/trips.json";
import destinationsData from "@/data/destinations.json";
import tripTypesData from "@/data/trip-types.json";
import { Trip } from "./types";

export interface Destination {
  id: string;
  name: string;
  slug: string;
  country: string;
  description: string;
  image: string;
}

export interface TripType {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const trips: Trip[] = tripsData as Trip[];
export const destinations: Destination[] = destinationsData as Destination[];
export const tripTypes: TripType[] = tripTypesData as TripType[];

export function getAllDestinations(): Destination[] {
  return destinations;
}
export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
export function getAllDestinationNames(): string[] {
  return destinations.map((d) => d.name);
}

export function getAllTripTypes(): TripType[] {
  return tripTypes;
}
export function getTripTypeBySlug(slug: string): TripType | undefined {
  return tripTypes.find((t) => t.slug === slug);
}
export function getAllTripTypeNames(): string[] {
  return tripTypes.map((t) => t.name);
}

export function getAllTrips(): Trip[] {
  return trips;
}
export function getFeaturedTrips(): Trip[] {
  return trips.filter((t) => t.featured);
}
export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}
export function getTripsByDestination(slug: string): Trip[] {
  const dest = getDestinationBySlug(slug);
  if (!dest) return [];
  return trips.filter(
    (t) => t.destination.toLowerCase() === dest.name.toLowerCase(),
  );
}
export function getTripsByType(slug: string): Trip[] {
  const type = getTripTypeBySlug(slug);
  if (!type) return [];
  return trips.filter((t) => t.type.toLowerCase() === type.name.toLowerCase());
}

export function generateTripTypeParams() {
  return tripTypes.map((t) => ({ type: t.slug }));
}
export function generateDestinationParams() {
  return destinations.map((d) => ({ destination: d.slug }));
}

export function paramToLabel(param: string): string {
  return param.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
