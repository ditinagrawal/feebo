import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-extrabold">Feebo</h1>
      <p className="text-2xl font-medium">Build what users really want</p>
      <Button>Get started</Button>
      <ModeToggle />
    </div>
  );
};

export default HomePage;
