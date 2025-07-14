import { ImageResponse } from "next/og";

import { type OgImageProps } from "@/lib/og";

export const runtime = "edge";

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
      new URL(
        "../../../../public/assets/font/inter/Inter-Regular.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer());

    const interBold = fetch(
      new URL(
        "../../../../public/assets/font/inter/Inter-Bold.ttf",
        import.meta.url
      )
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
            padding: "40px",
            fontSize: "24px",
            letterSpacing: "-0.47px",
            backgroundColor: "black",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "28px",
              border: "2px solid #fff",
              borderRadius: "9999px",
              padding: "8px 20px",
            }}
          >
            {type && <span>{type}</span>}
          </div>
          <div
            style={{
              fontSize: "60px",
              fontWeight: 700,
              lineHeight: 1.1,
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "32px",
              lineHeight: 1.4,
              opacity: 0.8,
              maxWidth: "80%",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {description}
          </div>
          {(date || readingTime) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                fontSize: "24px",
                opacity: 0.7,
                marginTop: "20px",
              }}
            >
              {date && <span>{date}</span>}
              {date && readingTime && <span>•</span>}
              {readingTime && <span>{readingTime}</span>}
            </div>
          )}
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
