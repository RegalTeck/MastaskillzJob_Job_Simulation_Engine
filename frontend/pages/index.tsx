import { useRouter } from "next/router";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/simulator");
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-50 text-gray-900">
      <main className="flex flex-col items-center justify-center flex-grow text-center p-6">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to MastaSkillz Job Simulation Platform
        </h1>
        <p className="text-lg mb-8 max-w-xl">
          We have different simulation tasks for different levels and roles,
          designed to prepare you for real-world challenges.
        </p>
        <button
          onClick={handleRedirect}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
        >
          Click to Continue <ArrowRight size={18} />
        </button>
      </main>

      <footer className="text-center p-4 bg-gray-200 text-sm">
        &copy; {new Date().getFullYear()} MastaSkillz. All rights reserved.
      </footer>
    </div>
  );
}
