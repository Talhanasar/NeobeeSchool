import type { Metadata } from "next";
import { PortalApp } from "./portal-app";

export const metadata: Metadata = {
  title: "Portal Demo | Neobee International School",
  description:
    "Role-based demo portal for the Neobee International School app — Admin, Teacher, and Parent views using local data only.",
};

export default function PortalPage() {
  return <PortalApp />;
}
