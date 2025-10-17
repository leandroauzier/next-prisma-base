// /lib/docparserClient.ts
export type DocparserResponse = {
  texto?: string;
  api_version?: string;
  error?: string;
  [key: string]: any;
};

export class DocparserClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl.replace(/\/$/, ""); // remove / final se houver
    this.apiKey = apiKey;
  }

  private async request(
    endpoint: string,
    options: RequestInit,
    timeoutMs = 30000
  ): Promise<DocparserResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
        },
        signal: controller.signal,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ${res.status}: ${text}`);
      }

      return await res.json();
    } catch (err: any) {
      return { error: err.message ?? "Erro desconhecido ao chamar API" };
    } finally {
      clearTimeout(timeout);
    }
  }

  /** 🔹 Envia uma imagem para o endpoint /v1/tesseract/file/image */
  async fromImage(file: File): Promise<DocparserResponse> {
    const formData = new FormData();
    formData.append("file", file);
    return this.request("/v1/tesseract/file/image", {
      method: "POST",
      body: formData,
    });
  }

  /** 🔹 Envia um PDF para o endpoint /v1/tesseract/file/pdf */
  async fromPdf(file: File): Promise<DocparserResponse> {
    const formData = new FormData();
    formData.append("file", file);
    return this.request("/v1/tesseract/file/pdf", {
      method: "POST",
      body: formData,
    });
  }

  /** 🔹 Envia uma URL para o endpoint /v1/tesseract/url */
  async fromUrl(url: string): Promise<DocparserResponse> {
    return this.request("/v1/tesseract/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  }

  /** 🧠 Detecta tipo de arquivo e escolhe o endpoint automaticamente */
  async fromFileAuto(file: File): Promise<DocparserResponse> {
    const mime = file.type.toLowerCase();

    if (mime.includes("pdf")) {
      return this.fromPdf(file);
    } else if (
      mime.includes("image") ||
      /\.(jpg|jpeg|png|bmp|tif|tiff)$/i.test(file.name)
    ) {
      return this.fromImage(file);
    } else {
      return { error: "Tipo de arquivo não suportado. Use imagem ou PDF." };
    }
  }
}
