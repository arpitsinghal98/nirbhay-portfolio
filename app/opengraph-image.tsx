import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// Next.js 16.3 deprecates Edge Runtime; the default Node runtime also supports ImageResponse.
export const alt =
  "Nirbhay Pratap Singh — Thoughtful software. Intelligent systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "68px 76px",
        background: "#f7f6f0",
        color: "#233d32",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 25,
        }}
      >
        <span>nirbhay.</span>
        <span style={{ color: "#ad533a", fontSize: 20 }}>
          FULL-STACK & AI ENGINEER
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          letterSpacing: -3,
          lineHeight: 1.15,
        }}
      >
        <span>Thoughtful software.</span>
        <span style={{ color: "#ad533a" }}>Intelligent systems.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #ddded3",
          paddingTop: 24,
          fontSize: 22,
        }}
      >
        <span>{profile.name}</span>
        <span>{profile.location}</span>
      </div>
    </div>,
    size,
  );
}
