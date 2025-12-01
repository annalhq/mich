import { ImageResponse } from "next/og";

import { type OgImageProps } from "@/lib/og";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams) as OgImageProps;

    const {
      title = "annalhq",
      description = "my personal portfolio",
      type,
      date,
      readingTime,
    } = params;

    const interRegular = fetch(
      new URL("/public/assets/font/inter/regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const interBold = fetch(
      new URL("/public/assets/font/inter/semi-bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "80px",
            background: "#f0f0f0",
            color: "#030303",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  letterSpacing: "-0.5px",
                  color: "#000000",
                }}
              >
                ann
              </div>

              {/* Type badge */}
              {type && (
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#444",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    padding: "8px 16px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "20px",
                    border: "1px solid #ccc",
                  }}
                >
                  {type}
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "900px",
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: "76px",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-2px",
                marginBottom: "28px",
                background: "linear-gradient(135deg, #000000 0%, #333333 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0px 0px 1px rgba(0,0,0,0.1)",
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: "26px",
                lineHeight: 1.4,
                color: "#444",
                fontWeight: 500,
                maxWidth: "650px",
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              marginTop: "20px",
            }}
          >
            {/* Metadata */}
            {(date || readingTime) && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  fontSize: "18px",
                  color: "#555",
                  fontWeight: 500,
                  padding: "8px 16px",
                }}
              >
                {date && <span>{date}</span>}
                {date && readingTime && (
                  <div
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      backgroundColor: "#888",
                    }}
                  />
                )}
                {readingTime && <span>{readingTime}</span>}
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: await interRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Inter",
            data: await interBold,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  } catch {
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
