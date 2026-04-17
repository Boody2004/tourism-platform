import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Company. We are here to help plan your perfect trip.",
};

export default function ContactPage() {
  return <ContactClient />;
}
