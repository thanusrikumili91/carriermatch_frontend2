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

  const handleFile = (f: File) => {
    if (f.type === "application/pdf" || f.type.startsWith("image/")) {
      setFile(f);
    } else {
      alert("Only PDF or image files allowed.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);

    try {
      // -----------------------
      // MOCK FRONTEND ANALYSIS
      // -----------------------
      const text = "react javascript html css typescript"; // Pretend extracted text from resume

      const ROLE_SKILLS: Record<string, string[]> = {
        "Frontend Developer": ["react", "javascript", "html", "css", "typescript"],
        "Backend Developer": ["python", "django", "flask", "sql", "api"],
        "Data Analyst": ["excel", "sql", "python", "statistics", "powerbi"],
        "UI/UX Designer": ["figma", "adobe xd", "ux", "ui", "prototyping"],
        "AI Engineer": ["python", "tensorflow", "pytorch", "machine learning", "deep learning"],
      };

      const normalizedSkills = text.toLowerCase().split(" ");
      const roleMatches = Object.entries(ROLE_SKILLS).map(([role, skills]) => {
        const matchedCount = skills.filter(skill => normalizedSkills.includes(skill)).length;
        const matchPercentage = Math.round((matchedCount / skills.length) * 100);
        return { role, matchPercentage };
      });
      roleMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);

      const predicted_role = roleMatches[0]?.role || "No role detected";
      const similarity_score = roleMatches[0]?.matchPercentage + "%" || "0%";

      const JOB_LISTINGS: Record<string, any[]> = {
        "Frontend Developer": [
          { title: "Senior Frontend Engineer", company: "Google", location: "Bangalore", url: "#" },
          { title: "React Developer", company: "Microsoft", location: "Hyderabad", url: "#" },
          { title: "UI Engineer", company: "Flipkart", location: "Bangalore", url: "#" },
        ],
        "Backend Developer": [
          { title: "Python Developer", company: "Amazon", location: "Mumbai", url: "#" },
          { title: "Backend Engineer", company: "Flipkart", location: "Bangalore", url: "#" },
        ],
        "Data Analyst": [
          { title: "Data Analyst", company: "TCS", location: "Pune", url: "#" },
        ],
        "UI/UX Designer": [
          { title: "UX Designer", company: "Zoho", location: "Chennai", url: "#" },
        ],
        "AI Engineer": [
          { title: "AI Researcher", company: "Google AI", location: "Bangalore", url: "#" },
        ],
      };

      const job_listings = JOB_LISTINGS[predicted_role] || [];

      const resumeData = {
        extracted_skills: normalizedSkills.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
        predicted_role,
        similarity_score,
        job_listings,
      };

      navigate("/mapping", { state: { resumeData } });

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
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
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
            <p className="text-lg font-semibold">
              Analyzing Resume with AI...
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ResumeUpload;
