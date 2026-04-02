import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const CATEGORY_COLORS: Record<string, { bg: string; accent: string }> = {
  "Kaygı":      { bg: "#0d4439", accent: "#30b49a" },
  "İlişkiler":  { bg: "#1a1a3e", accent: "#a78bfa" },
  "Ergen":      { bg: "#1a3a1a", accent: "#4ade80" },
  "Çocuk":      { bg: "#1a2e40", accent: "#60c4f0" },
  "Aile":       { bg: "#2d1a10", accent: "#f5b84a" },
  "Depresyon":  { bg: "#1e1e2e", accent: "#c084fc" },
  "Psikoloji":  { bg: "#0d4439", accent: "#30b49a" },
  "Genel":      { bg: "#0d4439", accent: "#30b49a" },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title    = searchParams.get("title")    ?? "TerapiRehberi";
  const category = searchParams.get("category") ?? "Genel";
  const author   = searchParams.get("author")   ?? "";

  const colors = CATEGORY_COLORS[category] ?? CATEGORY_COLORS["Genel"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: colors.bg,
          padding: "60px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dekoratif daire */}
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: colors.accent,
            opacity: 0.08,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-80px",
            bottom: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: colors.accent,
            opacity: 0.06,
          }}
        />

        {/* Üst: logo + kategori */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: colors.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
              }}
            >
              🌿
            </div>
            <span style={{ color: "white", fontWeight: 700, fontSize: "22px", letterSpacing: "-0.3px" }}>
              TerapiRehberi
            </span>
          </div>

          <div
            style={{
              background: colors.accent,
              color: colors.bg,
              fontSize: "14px",
              fontWeight: 700,
              padding: "8px 18px",
              borderRadius: "100px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>
        </div>

        {/* Başlık */}
        <div style={{ marginTop: "40px", marginBottom: "auto" }}>
          <div
            style={{
              color: "white",
              fontSize: title.length > 60 ? "42px" : "52px",
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Alt: yazar + site bilgisi */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid rgba(255,255,255,0.12)`,
            paddingTop: "24px",
            marginTop: "40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: colors.accent,
                opacity: 0.3,
              }}
            />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>
              {author || "TerapiRehberi Editör"}
            </span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "15px" }}>
            terapirehberi.com
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
