import { useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";

export default function JobSimulatorUI() {
  const roles = [
    "Backend Developer",
    "Product Manager",
    "UI/UX Designer",
    "Data Analyst",
    "Virtual Assistant",
    "ML Engineer",
    "Frontend Developer",
    "Cloud/DevOps Engineer",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const [role, setRole] = useState(roles[0]);
  const [level, setLevel] = useState(levels[0]);
  const [task, setTask] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchTask = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/generate-task/${encodeURIComponent(
          role
        )}/${level}`
      );
      setTask(res.data.task);
      setOutput(null);
    } catch (err: any) {
      console.error("Fetch error:", err.response?.data || err.message);
      setTask(null);
      setOutput({ error: "Failed to fetch task." });
    }
  };

  const handleSubmit = async () => {
    if (!file && !description) {
      alert("Provide a file or description.");
      return;
    }

    const formData = new FormData();
    formData.append("role", role);
    formData.append("level", level);
    if (file) formData.append("file", file);
    if (description) formData.append("description", description);

    const isCode = file?.name.endsWith(".py");
    const endpoint = isCode ? "/submit-code" : "/submit-document";

    setLoading(true);
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000${endpoint}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setOutput(res.data);
    } catch (err: any) {
      console.error("Submit error:", err.response?.data || err.message);
      setOutput({ error: "Submission failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Job Simulation Engine</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-2 rounded text-black bg-white"
          >
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border p-2 rounded text-black bg-white"
          >
            {levels.map((lvl) => (
              <option key={lvl}>{lvl}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={fetchTask}
        className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Get Task <ArrowRight size={16} />
      </button>

      {task && (
        <div className="bg-gray-100 p-4 rounded text-black">
          <h2 className="font-bold text-black">Instructions:</h2>
          <p className="text-black font-medium">{task.instructions}</p>

          {task.constraints && (
            <>
              <h2 className="font-bold text-black mt-2">Constraints:</h2>
              <ul className="list-disc list-inside text-black">
                {task.constraints.map((c: string, i: number) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-semibold">
          Upload .py, .txt, .docx, or .pdf
        </label>
        <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
          Choose File <ArrowRight size={16} />
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        <label className="block mt-4 text-sm font-semibold">
          Or enter description manually:
        </label>
        <textarea
          className="w-full border p-2 rounded"
          rows={4}
          placeholder="As a user, I want to..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded w-full hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Task"} <ArrowRight size={16} />
        </button>
      </div>

      {output && (
        <div className="bg-white border border-gray-200 p-4 rounded mt-4">
          <h3 className="font-bold">Result:</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-700">
            {JSON.stringify(output, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
