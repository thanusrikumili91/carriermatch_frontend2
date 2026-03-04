import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, GraduationCap, Calendar, Award, Wrench } from "lucide-react";

const educationOptions = ["B.Tech", "B.Sc", "BCA", "MCA", "M.Tech", "MBA", "Degree", "Diploma", "Other"];

const StudentDetails = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    education: "",
    year: "",
    cgpa: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/upload");
    }, 800);
  };

  const inputClass = "w-full pl-10 pr-4 py-3 rounded-lg input-glow text-sm text-foreground bg-input placeholder:text-muted-foreground";

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg glass-card glow-box p-8 sm:p-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Student Details</h1>
          <p className="text-sm text-muted-foreground">Tell us about yourself to personalize your experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="John Doe" aria-label="Full name" />
            </div>
          </div>

          <div>
            <label htmlFor="education" className="text-xs font-medium text-muted-foreground mb-1.5 block">Education Status</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select id="education" required value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} className={inputClass + " appearance-none"} aria-label="Education status">
                <option value="" disabled>Select Education</option>
                {educationOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-card text-foreground">{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="year" className="text-xs font-medium text-muted-foreground mb-1.5 block">Year</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input id="year" type="number" min="1" max="6" required value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className={inputClass} placeholder="3" aria-label="Year of education" />
              </div>
            </div>
            <div>
              <label htmlFor="cgpa" className="text-xs font-medium text-muted-foreground mb-1.5 block">CGPA</label>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input id="cgpa" type="number" step="0.01" min="0" max="10" required value={form.cgpa} onChange={(e) => setForm({ ...form, cgpa: e.target.value })} className={inputClass} placeholder="8.5" aria-label="CGPA" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="skills" className="text-xs font-medium text-muted-foreground mb-1.5 block">Skills (optional)</label>
            <div className="relative">
              <Wrench className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <textarea id="skills" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className={inputClass + " min-h-[80px] resize-none"} placeholder="React, Python, Machine Learning..." aria-label="Skills" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full glow-button py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              "Continue →"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentDetails;
