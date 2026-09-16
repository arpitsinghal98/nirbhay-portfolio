import { projects } from "@/content/portfolio";
import { profile } from "@/content/profile";

const allowedLinks = new Set<string>([
  "#work",
  "#about",
  "#experience",
  "#contact",
  profile.resume,
  `mailto:${profile.email}`,
  ...Object.values(profile.links),
  ...projects.flatMap((project) => project.links.map((link) => link.href)),
]);

// Never navigate to arbitrary model-generated URLs or load remote images.
export function safeAssistantLink(url: string) {
  return allowedLinks.has(url) ? url : undefined;
}
