// app/api/docparser/route.ts
import { NextRequest, NextResponse } from "next/server";
import https from "https";

export const runtime = "nodejs"; // força o uso do Node.js (sem Edge runtime)

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "pdf";

  // ✅ Usa HTTPS agora
  const base = "https://docparser-dev-docparser-dev.apps.ocp4.tce.local";
  const apiKey = process.env.NEXT_PUBLIC_DOCPARSER_API_KEY;

  // 👇 Ignora certificado autoassinado (como o -k do curl)
  const insecureAgent = new https.Agent({ rejectUnauthorized: false });

  try {
    if (type === "url") {
      const { url } = await req.json();

      console.log("📡 Enviando URL para OCR:", url);

      const res = await (fetch as any)(`${base}/v1/tesseract/url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ url }),
        agent: insecureAgent,
      });

      const data = await res.json();
      console.log("✅ OCR URL concluído:", res.status);
      return NextResponse.json(data, { status: res.status });
    }

    // 🔹 Upload de arquivo (mantém corpo binário original)
    const contentType = req.headers.get("content-type") || "";
    const buffer = Buffer.from(await req.arrayBuffer());

    const endpoint =
      type === "image"
        ? "/v1/tesseract/file/image"
        : "/v1/tesseract/file/pdf";

    console.log(`📤 Enviando arquivo (${type}) para ${base}${endpoint}`);

    const res = await (fetch as any)(`${base}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": contentType,
      },
      body: buffer,
      agent: insecureAgent,
    });

    console.log("📥 Resposta da API Docparser:", res.status);

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("❌ Erro no proxy docparser:", err);
    return NextResponse.json(
      { error: err.message || "Erro interno no proxy Docparser" },
      { status: 500 }
    );
  }
}
