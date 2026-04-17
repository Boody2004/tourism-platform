import { Metadata } from "next";
import TripsManagementClient from "./TripsManagementClient";
import { getAllTrips } from "@/lib/data";

export const metadata: Metadata = { title: "Trips Management" };

export default function DashboardTripsPage() {
  const trips = getAllTrips();
  return <TripsManagementClient initialTrips={trips} />;
}
