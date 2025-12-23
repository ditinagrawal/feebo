import Image from "next/image";

import { ArrowLeftIcon } from "lucide-react";
import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";
import { GithubButton } from "@/modules/auth/components/github-button";

export const AuthView = () => {
  return (
    <div className="relative h-full">
      <div className="absolute top-5 left-5">
        <Button size="sm" variant="ghost" asChild>
          <Link href="/">
            <ArrowLeftIcon /> Back
          </Link>
        </Button>
      </div>
      <div className="flex h-full items-center justify-center">
        <div className="mx-auto max-w-md space-y-6 text-center">
          <div className="space-y-2">
            <Image
              src="/logo.svg"
              alt="logo"
              width={100}
              height={100}
              className="mx-auto size-10"
              priority
              draggable={false}
            />
            <h2 className="font-display text-3xl font-medium">
              Welcome to Feebo
            </h2>
          </div>
          <div className="max-w-sm">
            <GithubButton />
          </div>
          <div className="max-w-sm">
            <p className="text-muted-foreground text-xs">
              Just what you needed, another exciting platform to manage your
              incredibly thrilling reviews.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
