"use client"
import LoadSpinner from "@/components/LoadSpinner";
import SelectedRole from "@/components/SelectedRole";
import Curriculum from "@/components/Curriculum";
import useSession from "@/hooks/useSession";

const DashboardPage: React.FC = () => {
  const {load } = useSession();

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full lg:min-h-screen">
      <SelectedRole />
      <Curriculum />
      <LoadSpinner state={load} />
    </div>
  );
};

export default DashboardPage;