'use client'
import {Link} from 'react-router'
import {Button} from "@/components/ui/button"
import Navbar from "@/components/layout/navbar";

export default function HeroSection() {

    return (
        <>
            <Navbar/>

            <main>
                <div
                    aria-hidden
                    className="z-2 absolute inset-0 isolate hidden opacity-50 contain-strict lg:block">
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>

                <section className="bg-muted/50 dark:bg-background overflow-hidden">
                    <div className="relative mx-auto max-w-5xl px-6 pt-28 lg:pt-24">
                        <div className="relative z-10 mx-auto max-w-2xl text-center">
                            <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl">Track your applications & Resume Ratings</h1>
                            <p className="text-muted-foreground mx-auto my-8 max-w-2xl text-xl">Review your submissions and check AI-powered feedback.</p>

                            <Button
                                asChild
                                size="lg">
                                <Link to="#">
                                    <span className="btn-label">Start Building</span>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="mx-auto 2xl:max-w-7xl">
                        <div className="perspective-distant pl-8 lg:pl-44">
                            <div className="lg:h-176 rotate-x-20 mask-b-from-55% mask-b-to-100% mask-r-from-75% skew-x-12 pl-6 pt-6">
                                <img
                                    className="rounded-(--radius) border shadow-xl dark:hidden"
                                    src="/hero.png"
                                    alt="Tailark hero section"
                                    width={2880}
                                    height={2074}
                                />
                                <img
                                    className="rounded-(--radius) hidden border shadow-xl dark:block"
                                    src="/hero-dark.png"
                                    alt="Tailark hero section"
                                    width={2880}
                                    height={2074}
                                />
                            </div>
                        </div>
                    </div>

                </section>

            </main>
        </>
    )
}