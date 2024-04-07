import { Clock, CloudCog, Home, Star, Trash2 } from "lucide-react";

export const NAV_LINKS = [
  {
    link: "/locker",
    name: "Home",
    icon: Home,
  },
  {
    link: "/latest",
    name: "Latest",
    icon: Clock,
  },
  {
    link: "/starred",
    name: "Starred",
    icon: Star,
  },
  {
    link: "/trash",
    name: "Trash",
    icon: Trash2,
  },
  {
    link: "/storage-space",
    name: "Storage Space",
    icon: CloudCog,
  },
];

export enum DATE_FILTER_OPTIONS {
  "today",
  "this week",
  "this month",
  "this year",
  "last year",
}

export enum TYPE_FILTER_OPTIONS {
  "image",
  "pdf",
  "video",
  "audio",
  "document",
}

export const STORAGE_PLANS = {
  free: {
    name: "free",
    limit: 1073741824,
  },
  standard: {
    name: "standard",
    limit: 1073741824 * 20,
  },
  premium: {
    name: "premium",
    limit: 1073741824 * 50,
  },
};
