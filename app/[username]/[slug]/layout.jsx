import { ModeToggle } from "@/components/shared/mode-toggle";

export default function FeedbackLayout({ children }) {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-end p-4">
        <ModeToggle />
      </div>
      {children}
    </div>
  );
}
