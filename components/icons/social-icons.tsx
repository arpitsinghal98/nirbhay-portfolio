import type { ComponentProps } from "react";

export function GitHubIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M9 19c-4.3 1.3-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13 13 0 0 0-7 0C5.4.2 4.2.6 4.2.6a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 2.7 8c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22"
        transform="translate(1 1) scale(.9)"
      />
    </svg>
  );
}

export function LinkedInIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7m0-10v.01M11 17v-7m0 3a3 3 0 0 1 6 0v4" />
    </svg>
  );
}
