"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Algo deu errado</h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Ocorreu um erro inesperado. Por favor, tente novamente ou volte para a página inicial.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => reset()}>
                Tentar novamente
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Voltar para o início</Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}