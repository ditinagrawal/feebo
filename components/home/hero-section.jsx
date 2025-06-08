"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import { Header } from "@/components/home/header";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code2, Github, Users } from "lucide-react";

export const HeroSection = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <section className="bg-linear-to-b to-muted from-background">
          <div className="relative py-36">
            <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
              <div className="md:w-1/2">
                <div>
                  <h1 className="max-w-md text-balance text-5xl font-extrabold md:text-6xl">
                    Build what users really want
                  </h1>
                  <p className="text-muted-foreground my-8 max-w-2xl text-balance text-lg font-medium">
                    Feebo lets you collect feedback from your customers
                    prioritize features, and build a product users love.
                  </p>

                  <div className="flex items-center gap-3">
                    <Button asChild size="lg" className="pr-4.5">
                      <Link href="/auth/login">
                        <span className="text-nowrap">Collect Feedback</span>
                        <ChevronRight />
                      </Link>
                    </Button>
                    <Button
                      key={2}
                      asChild
                      size="lg"
                      variant="outline"
                      className="pl-5"
                    >
                      <Link
                        href="https://github.com/ditinagrawal/feebo"
                        target="_blank"
                      >
                        <Github className="fill-primary/25 stroke-primary" />
                        <span className="text-nowrap">Give it a Star</span>
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-muted-foreground">
                    Build with confidence:
                  </p>
                  <div className="flex gap-1 mt-2">
                    <div className="bg-primary/10 rounded-full px-3 py-1.5 text-sm font-medium flex items-center">
                      <Users className="mr-2 h-3 w-3" />
                      User-Driven
                    </div>
                    <div className="bg-primary/10 rounded-full px-3 py-1.5 text-sm font-medium flex items-center">
                      <Code2 className="mr-2 h-3 w-3" />
                      Open Source
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="perspective-near mt-24 translate-x-12 md:absolute md:-right-6 md:bottom-16 md:left-1/2 md:top-40 md:mt-0 md:translate-x-0">
              <div className="before:border-foreground/5 before:bg-foreground/5 relative h-full before:absolute before:-inset-x-4 before:bottom-7 before:top-0 before:skew-x-6 before:rounded-[calc(var(--radius)+1rem)] before:border">
                <div className="bg-background rounded-(--radius) shadow-foreground/10 ring-foreground/5 relative h-full -translate-y-12 skew-x-6 overflow-hidden border border-transparent shadow-md ring-1">
                  {mounted && (
                    <Image
                      src={
                        resolvedTheme === "dark" ? "/dark.png" : "/light.png"
                      }
                      alt="app screen"
                      width="2880"
                      height="1842"
                      className="object-top-left size-full object-cover"
                      priority
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
