import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, X } from "lucide-react";

const ResumeUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (f.type === "application/pdf" || f.type.startsWith("image/")) setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:7860/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Server Error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12">
      {!loading ? (
        <>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
              dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
            }`}
          >
            <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
            <p>Drop your resume here or <span className="text-primary font-medium">browse</span></p>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          {file && (
            <div className="mt-4 flex items-center justify-between glass-card p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p>{file.name}</p>
                  <p>{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button onClick={() => setFile(null)}><X className="w-4 h-4" /></button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!file}
            className="mt-6 glow-button py-3 px-6 rounded-lg disabled:opacity-40"
          >
            Analyze Resume →
          </button>
        </>
      ) : (
        <p className="mt-12 text-lg font-semibold">Analyzing Resume...</p>
      )}

      {result && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md max-w-xl w-full">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <>
              <p><b>Extracted Skills:</b> {result.skills.join(", ")}</p>
              <p><b>Predicted Role:</b> {result.predicted_role}</p>
              <p><b>Similarity Score:</b> {result.similarity_score}</p>
              <p><b>Jobs:</b></p>
              <ul className="list-disc ml-5">
                {result.jobs.map((job: any, idx: number) => (
                  <li key={idx}>
                    {job.title} at {job.company} ({job.location}) - 
                    <a href={job.link} target="_blank" className="text-blue-600 ml-1">Apply</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
