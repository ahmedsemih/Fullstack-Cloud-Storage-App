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
  "folder"
}

export const STORAGE_PLANS = {
  free: {
    name: "free",
    limit: 1073741824,
    price: 0,
    duration: 3155695200000 // 100 years as milliseconds
  },
  standard: {
    name: "standard",
    limit: 1073741824 * 20,
    price: 9.99,
    duration: 2592000000 // 30 days as milliseconds
  },
  premium: {
    name: "premium",
    limit: 1073741824 * 50,
    price: 19.99,
    duration: 2592000000 // 30 days as milliseconds
  },
};