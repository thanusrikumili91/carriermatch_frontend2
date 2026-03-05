import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { MapPin, Building2, ExternalLink, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
}

// ------------------------------
// Static fallback jobs per role
// ------------------------------
const STATIC_JOBS: Record<string, Job[]> = {
  "Software Developer": [
    { title: "Software Developer I", company: "Tech Solutions Ltd", location: "London, UK", link: "#" },
    { title: "Junior Developer", company: "CodeCraft", location: "Manchester, UK", link: "#" },
    { title: "Fullstack Developer", company: "NextGen Apps", location: "Birmingham, UK", link: "#" },
    { title: "Backend Developer", company: "Digital Works", location: "Leeds, UK", link: "#" },
    { title: "Frontend Developer", company: "Web Innovations", location: "Glasgow, UK", link: "#" },
  ],
  "Data Architect": [
    { title: "Data Architect", company: "Data Insights", location: "London, UK", link: "#" },
    { title: "Senior Data Engineer", company: "Analytica", location: "Manchester, UK", link: "#" },
    { title: "Big Data Architect", company: "Tech Data Ltd", location: "Birmingham, UK", link: "#" },
    { title: "ETL Developer", company: "InfoTech Solutions", location: "Glasgow, UK", link: "#" },
    { title: "Database Designer", company: "SmartData Labs", location: "Leeds, UK", link: "#" },
  ],
  "Backend Developer": [
    { title: "Backend Developer", company: "Digital Works", location: "London, UK", link: "#" },
    { title: "API Developer", company: "Tech Solutions Ltd", location: "Manchester, UK", link: "#" },
    { title: "Python Developer", company: "CodeCraft", location: "Birmingham, UK", link: "#" },
    { title: "Node.js Developer", company: "NextGen Apps", location: "Glasgow, UK", link: "#" },
    { title: "Java Developer", company: "Web Innovations", location: "Leeds, UK", link: "#" },
  ],
  "Frontend Engineer": [
    { title: "Frontend Engineer", company: "Web Innovations", location: "London, UK", link: "#" },
    { title: "React Developer", company: "NextGen Apps", location: "Manchester, UK", link: "#" },
    { title: "UI Engineer", company: "Tech Solutions Ltd", location: "Birmingham, UK", link: "#" },
    { title: "Frontend Developer", company: "Digital Works", location: "Glasgow, UK", link: "#" },
    { title: "Vue.js Developer", company: "CodeCraft", location: "Leeds, UK", link: "#" },
  ],
};

const JobListings = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "Software Developer";

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      try {
        // Try API call first
        const res = await fetch(
          `https://thanusrikumili91-resumeai.hf.space/jobs?role=${encodeURIComponent(role)}`
        );

        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();

        // Use API jobs if returned, otherwise fallback to static
        if (data?.jobs && data.jobs.length > 0) {
          setJobs(data.jobs);
        } else {
          setJobs(STATIC_JOBS[role] || STATIC_JOBS["Software Developer"]);
        }
      } catch (err) {
        console.error("Job fetch failed:", err);
        // Fallback to static jobs
        setJobs(STATIC_JOBS[role] || STATIC_JOBS["Software Developer"]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [role]);

  return (
    <div className="min-h-[85vh] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/mapping"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Results
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">
              Jobs for <span className="gradient-text">{role}</span>
            </h1>
            {loading ? (
              <p className="text-muted-foreground">Loading job postings...</p>
            ) : (
              <p className="text-muted-foreground">{jobs.length} openings found</p>
            )}
          </div>

          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card glow-border p-6 card-hover"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-foreground text-lg">{job.title}</h2>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" /> {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {job.location}
                      </span>
                    </div>
                  </div>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-button px-5 py-2.5 rounded-lg text-xs font-semibold inline-flex items-center gap-2 shrink-0"
                    aria-label={`Apply for ${job.title} at ${job.company}`}
                  >
                    Apply <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobListings;
