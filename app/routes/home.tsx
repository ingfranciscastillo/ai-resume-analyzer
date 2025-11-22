import type { Route } from "./+types/home";
import HeroSection from "@/components/layout/HeroSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
      <>
      <HeroSection/>


      </>
  )
}
