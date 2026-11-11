import type { Route } from "./+types/about";
import { Link } from "react-router";
import Navbar from "@/components/layout/navbar";
import FooterSection from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sobre nosotros | ResumeSense" },
    {
      name: "description",
      content:
        "ResumeSense analiza tu currículum con inteligencia artificial y te da recomendaciones para mejorarlo.",
    },
  ];
}

const steps = [
  {
    title: "Sube tu CV",
    description:
      "Carga tu currículum en PDF junto con el puesto y la descripción de la oferta.",
  },
  {
    title: "Análisis con IA",
    description:
      "Evaluamos estructura, contenido, habilidades y compatibilidad con sistemas ATS.",
  },
  {
    title: "Mejora con feedback",
    description:
      "Recibe una puntuación por categoría y recomendaciones concretas para mejorar.",
  },
];

export default function About() {
  return (
    <>
      <Navbar />
      <main className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-balance text-4xl font-semibold lg:text-5xl">
            Sobre ResumeSense
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            ResumeSense es una herramienta que usa inteligencia artificial para
            ayudarte a destacar en tu búsqueda de empleo. Analiza tu currículum
            frente a la oferta a la que aplicas y te dice qué funciona, qué no y
            cómo mejorarlo.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-3xl border p-6">
                <span className="text-sm font-medium text-muted-foreground">
                  Paso {i + 1}
                </span>
                <h2 className="mt-2 text-xl font-semibold">{step.title}</h2>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Button asChild size="lg">
              <Link to="/upload">Analizar mi currículum</Link>
            </Button>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
