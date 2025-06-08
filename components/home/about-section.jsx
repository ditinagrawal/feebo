import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";

export const AboutSection = () => (
  <section
    className="py-24 md:py-40 w-full flex flex-col items-center justify-center bg-background"
    id="about"
  >
    <div className="flex flex-col items-center w-full max-w-2xl px-4 md:px-8">
      <Avatar className="size-28 mb-8 shadow-lg border-4 border-background bg-white">
        <AvatarImage src="/ditin.png" alt="Ditin Agrawal" />
        <AvatarFallback className="text-3xl">DA</AvatarFallback>
      </Avatar>
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-3 leading-tight">
        Hey, It&apos;s Ditin <span className="align-middle">👋</span>
      </h1>
      <h2 className="text-2xl md:text-3xl text-center font-semibold mb-6 text-muted-foreground">
        Chef of the App
      </h2>
      <p className="text-center text-lg md:text-xl max-w-2xl text-muted-foreground mb-3">
        In 2024, I set out to solve a common problem:{" "}
        <span className="font-medium text-foreground">
          building products that users actually want
        </span>
        . Like many makers, I created many products and failed many times.
      </p>
      <p className="text-center text-lg md:text-xl max-w-2xl text-muted-foreground mb-6">
        After seeing what I&apos;m struggling with, I cooked up Feebo to help
        collect, organize, and act on user feedback effectively. This platform
        is the result of that journey—one focused on making product development
        more user-centric.
      </p>
      <ul className="text-left mx-auto list-none space-y-4 text-lg md:text-xl text-foreground mb-8 w-full max-w-lg">
        <li className="flex items-start gap-3">
          <CheckCircle className="text-green-500 mt-1" size={22} />
          <span>
            <b>Collect feedback</b>{" "}
            <span className="text-muted-foreground">
              — Gather user insights in one organized place.
            </span>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="text-green-500 mt-1" size={22} />
          <span>
            <b>Prioritize features</b>{" "}
            <span className="text-muted-foreground">
              — Prioritize features based on what users really want.
            </span>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="text-green-500 mt-1" size={22} />
          <span>
            <b>Build better products</b>{" "}
            <span className="text-muted-foreground">
              — Create products that your users will love to use.
            </span>
          </span>
        </li>
      </ul>
      <p className="text-center text-lg md:text-xl max-w-2xl text-muted-foreground italic">
        Thanks for checking out Feebo! If you have any questions or want to
        connect, feel free to reach out.
      </p>
      <div className="mt-4 flex items-center justify-center">
        <a
          href="https://x.com/ditinagrawal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-base text-blue-500 hover:underline font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M17.53 2.477h3.7l-8.1 9.26 9.54 9.786h-7.49l-5.89-6.05-8.09 6.05H1.6l8.67-9.7L.29 2.477h7.67l5.18 5.32 7.39-5.32zm-1.3 16.8h2.05L6.6 4.09H4.43l11.8 15.187z" />
          </svg>
          @ditinagrawal
        </a>
      </div>
    </div>
  </section>
);
