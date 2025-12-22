import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center">
      <Button asChild>
        <Link href="/auth">Login</Link>
      </Button>
    </div>
  );
}
