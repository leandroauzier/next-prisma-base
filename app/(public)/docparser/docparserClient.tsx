"use client";

import OCRUploadSection from "@/components/ui/OCRUploadSection";
import Section from "@/components/ui/section";

type DocParserClientProps = {
};

export default function DocParserClient({ }: DocParserClientProps) {

  return (
    <>
      <Section
        title="Leitura Inteligente de Documentos"
        description="Esta API usa OCR para ler imagens, PDFs e URLs e extrair texto automaticamente."
        titleColor="blue"
        bgColor="gray100"
        rounded="lg"
        shadow="md"
        align="center"
      >
        <p>Envie um arquivo, foto ou link — nós cuidamos da leitura!</p>
      </Section>

      <Section title="Outra seção simples" bgColor="none">
        <OCRUploadSection />
      </Section>
    </>
  );
}
