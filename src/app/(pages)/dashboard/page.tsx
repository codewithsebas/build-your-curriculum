"use client"
import SelectedRole from "@/components/SelectedRole";
import Curriculum from "@/components/Curriculum";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full lg:min-h-screen">
      <SelectedRole />
      <Curriculum />
      {/* <LoadSpinner state={load} /> */}
    </div>
  );
};

export default DashboardPage;