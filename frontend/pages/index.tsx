import { useRouter } from "next/router";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/simulator");
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gradient-to-br from-blue-50 via-white to-purple-100 text-gray-900">
      <main className="flex flex-col items-center justify-center flex-grow text-center p-6">
        <div className="backdrop-blur-md bg-white/60 shadow-lg rounded-xl p-10 w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to MastaSkillz Job Simulation Platform
          </h1>
          <p className="text-lg mb-8">
            We have different simulation tasks for different levels and roles,
            designed to prepare you for real-world challenges.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleRedirect}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            >
              <span>Click to Continue</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center p-4 bg-white/50 text-sm backdrop-blur-sm">
        &copy; {new Date().getFullYear()} MastaSkillz. All rights reserved.
      </footer>
    </div>
  );
}
