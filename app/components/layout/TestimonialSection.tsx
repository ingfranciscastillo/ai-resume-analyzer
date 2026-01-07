import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

type Review = {
  name: string;
  username: string;
  body: string;
  img: string;
};

const reviews: Review[] = [
  {
    name: "Daniel Ruiz",
    username: "@danruiz",
    body: "La revisión con IA me ayudó a optimizar palabras clave para pasar filtros ATS. Noté la diferencia casi de inmediato.",
    img: "https://avatar.vercel.sh/daniel",
  },
  {
    name: "María López",
    username: "@marial",
    body: "Nunca había recibido feedback tan específico sobre mi CV. Me explicó exactamente qué mejorar y por qué.",
    img: "https://avatar.vercel.sh/maria",
  },
  {
    name: "Andrés Castillo",
    username: "@andresdev",
    body: "Ideal para perfiles tech. Me ayudó a explicar mejor mi experiencia y a destacar impacto, no solo tareas.",
    img: "https://avatar.vercel.sh/andres",
  },
  {
    name: "Valentina Cruz",
    username: "@valencruz",
    body: "Subí mi currículum sin muchas expectativas y terminé rehaciéndolo completo con mucha más confianza.",
    img: "https://avatar.vercel.sh/valentina",
  },
  {
    name: "José Ramírez",
    username: "@jramirez",
    body: "El feedback es claro, directo y accionable. No solo te dice qué está mal, sino cómo arreglarlo.",
    img: "https://avatar.vercel.sh/jose",
  },
  {
    name: "Camila Torres",
    username: "@camitorres",
    body: "Me ayudó a adaptar mi CV según el puesto al que aplicaba. Ahorra muchísimo tiempo.",
    img: "https://avatar.vercel.sh/camila",
  },
  {
    name: "Ricardo Núñez",
    username: "@ricardon",
    body: "Excelente para quienes llevan años sin actualizar su currículum. El análisis es muy profesional.",
    img: "https://avatar.vercel.sh/ricardo",
  },
  {
    name: "Paula Fernández",
    username: "@paulaf",
    body: "Me gustó que el feedback no fuera genérico. Se nota que la IA entiende el contexto del rol.",
    img: "https://avatar.vercel.sh/paula",
  },
  {
    name: "Luis Herrera",
    username: "@luisdev",
    body: "Después de aplicar los cambios sugeridos, conseguí más entrevistas en dos semanas.",
    img: "https://avatar.vercel.sh/luis",
  },
  {
    name: "Natalia Vega",
    username: "@natvega",
    body: "Perfecta si estás buscando trabajo activamente y quieres mejorar tu CV sin pagar una asesoría costosa.",
    img: "https://avatar.vercel.sh/natalia",
  },
  {
    name: "Laura Gómez",
    username: "@laurag",
    body: "Subí mi currículum y en minutos tenía sugerencias claras y accionables. Mejoré la estructura y el contenido, y ya empecé a recibir más respuestas.",
    img: "https://avatar.vercel.sh/laura",
  },
  {
    name: "Carlos Méndez",
    username: "@cmendez",
    body: "La IA detectó errores que yo nunca había notado y me ayudó a adaptar mi CV al puesto que buscaba.",
    img: "https://avatar.vercel.sh/carlos",
  },
  {
    name: "Ana Rodríguez",
    username: "@anarod",
    body: "Feedback claro, directo y fácil de entender. Ideal si no sabes cómo optimizar tu currículum.",
    img: "https://avatar.vercel.sh/ana",
  },
  {
    name: "Miguel Pérez",
    username: "@miguelp",
    body: "El análisis por secciones marca la diferencia. Mucho mejor que otras herramientas que probé.",
    img: "https://avatar.vercel.sh/miguel",
  },
  {
    name: "Sofía Herrera",
    username: "@sofiahr",
    body: "Como reclutadora, la recomiendo totalmente. Los CVs salen mucho más profesionales.",
    img: "https://avatar.vercel.sh/sofia",
  },
];

const chunkArray = (array: Review[], chunkSize: number): Review[][] => {
  const result: Review[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const reviewChunks = chunkArray(reviews, Math.ceil(reviews.length / 3));

export default function WallOfLoveSection() {
  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">
              Mejora tu currículum como ellos
            </h2>
            <p className="mt-6">
              Miles de profesionales ya usan nuestra IA para recibir feedback
              claro y mejorar sus oportunidades laborales.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {reviewChunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="space-y-3">
                {chunk.map(({ name, username, body, img }, index) => (
                  <Card key={index}>
                    <CardContent className="grid grid-cols-[auto_1fr] gap-3">
                      <Avatar className="size-9">
                        <AvatarImage
                          alt={name}
                          src={img}
                          loading="lazy"
                          width="120"
                          height="120"
                        />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium">{name}</h3>

                        <span className="text-muted-foreground block text-sm tracking-wide">
                          {username}
                        </span>

                        <blockquote className="mt-3">
                          <p className="text-gray-700 dark:text-gray-300">
                            {body}
                          </p>
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
