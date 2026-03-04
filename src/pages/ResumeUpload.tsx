import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, X } from "lucide-react";

const ResumeUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFile = (f: File) => {
    if (f.type === "application/pdf" || f.type.startsWith("image/")) {
      setFile(f);
    } else {
      alert("Only PDF or image files allowed.");
    }
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  // Submit file to Hugging Face Gradio backend
  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("data", file); // Gradio expects "data" key

      const response = await fetch(
        "https://thanusrikumili91-resumeai.hf.space/api/predict/", // Gradio endpoint
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Backend Error: ${response.status}`);
      }

      const result = await response.json();

      // Gradio wraps output in 'data' array
      const data = result?.data?.[0];

      if (!data) {
        throw new Error("No data received from backend.");
      }

      // Navigate to Mapping page with resume analysis
      navigate("/mapping", { state: { resumeData: data } });
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg glass-card glow-box p-8 sm:p-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Upload Your Resume</h1>
          <p className="text-sm text-muted-foreground">
            Drag & drop or click to upload a PDF or image
          </p>
        </div>

        {!loading ? (
          <>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                dragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drop your resume here or{" "}
                <span className="text-primary font-medium">browse</span>
              </p>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,image/*"
                className="hidden"
                onChange={(e) =>
                  e.target.files?.[0] && handleFile(e.target.files[0])
                }
              />
            </div>

            {file && (
              <div className="mt-4 flex items-center justify-between glass-card p-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button onClick={() => setFile(null)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!file}
              className="w-full mt-6 glow-button py-3 rounded-lg font-semibold text-sm disabled:opacity-40"
            >
              Analyze Resume →
            </button>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-6 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-lg font-semibold">Analyzing Resume with AI...</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ResumeUpload;
