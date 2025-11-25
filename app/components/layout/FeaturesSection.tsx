import { Cpu, Fingerprint, Pencil, Settings2, Sparkles, Zap } from 'lucide-react'

export default function FeaturesSection() {
    return (
        <section className="py-12 md:py-20" id="features">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">
                        La forma más inteligente de mejorar tu currículum
                    </h2>
                    <p>
                        Nuestra plataforma analiza tu CV con precisión, identifica fortalezas y áreas de mejora,
                        y te da recomendaciones personalizadas basadas en la descripción del empleo que deseas.
                        Todo impulsado por IA, optimizado para ayudarte a destacar.
                    </p>
                </div>

                <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">Análisis Instantáneo</h3>
                        </div>
                        <p className="text-sm">
                            Tu currículum se evalúa en segundos con un motor de IA optimizado para identificar
                            qué tan bien encaja con el trabajo que buscas.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4" />
                            <h3 className="text-sm font-medium">Diagnóstico Preciso</h3>
                        </div>
                        <p className="text-sm">
                            La IA detecta palabras clave faltantes, fortalezas relevantes y detalles
                            que pueden mejorar tus posibilidades de selección.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Fingerprint className="size-4" />
                            <h3 className="text-sm font-medium">Feedback Personalizado</h3>
                        </div>
                        <p className="text-sm">
                            Obtén recomendaciones adaptadas a tu experiencia y al perfil del empleo,
                            no simples sugerencias genéricas como en otras plataformas.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Pencil className="size-4" />
                            <h3 className="text-sm font-medium">Mejoras Redactadas por IA</h3>
                        </div>
                        <p className="text-sm">
                            La herramienta genera reescrituras claras y profesionales de tus secciones más
                            importantes, listas para copiar y pegar.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Settings2 className="size-4" />
                            <h3 className="text-sm font-medium">Adaptado al Puesto</h3>
                        </div>
                        <p className="text-sm">
                            Indica la oferta laboral y el sistema ajusta su análisis para mostrar exactamente
                            lo que el empleador espera ver.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4" />
                            <h3 className="text-sm font-medium">Optimizado para IA</h3>
                        </div>
                        <p className="text-sm">
                            Construido desde cero para aprovechar modelos avanzados, garantizando feedback
                            claro, accionable y alineado a las tendencias actuales de selección.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
