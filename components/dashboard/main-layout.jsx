import { AllBoards } from "./all-boards";
import { CreateBoard } from "./create-board";

export const MainLayout = () => {
  return (
    <main className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-4 md:mt-12">
      <div className="md:col-span-1">
        <CreateBoard />
      </div>
      <div className="md:col-span-2">
        <AllBoards />
      </div>
    </main>
  );
};
