"use client";

import React, { useState } from "react";
import Section from "@/components/ui/section";
import { DocparserClient, DocparserResponse } from "@/lib/docparserClient";

export default function OCRUploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState<DocparserResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const client = new DocparserClient(
    "https://docparser-dev-docparser-dev.apps.ocp4.tce.local", // base da API
    process.env.NEXT_PUBLIC_DOCPARSER_API_KEY // opcional
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setUrl("");
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setFile(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);

    try {
      let res: Response;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const type = file.type.includes("image") ? "image" : "pdf";
        res = await fetch(`/api/docparser?type=${type}`, {
          method: "POST",
          body: formData,
        });
      } else if (url) {
        res = await fetch(`/api/docparser?type=url`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
      } else {
        throw new Error("Selecione um arquivo ou insira uma URL.");
      }

      const json = await res.json();
      setResponse(json);
    } catch (err: any) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };


  return (
    <Section
      title="Leitor de Documentos e Imagens"
      description="Envie um PDF, imagem ou insira uma URL para extrair texto via OCR."
      bgColor="gray50"
      rounded="lg"
      shadow="md"
      align="center"
    >
      <div className="flex flex-col md:flex-row gap-4 items-center w-full justify-center">
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg p-2 w-full md:w-auto"
        />

        <span className="text-gray-500 font-medium">ou</span>

        <input
          type="text"
          placeholder="Cole aqui uma URL (https://...)"
          value={url}
          onChange={handleUrlChange}
          className="border border-gray-300 rounded-lg p-2 w-full md:w-1/2"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || (!file && !url)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Processando..." : "Enviar"}
        </button>
      </div>

      {response && (
        <pre className="bg-gray-900 text-green-400 text-sm p-4 rounded-lg mt-6 text-left w-full overflow-y-auto break-words whitespace-pre-wrap">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </Section>
  );
}
