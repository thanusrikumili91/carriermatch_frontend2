import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { MapPin, Building2, ExternalLink, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  link: string;
}

// ------------------------------
// Static fallback jobs per role
// ------------------------------
const STATIC_JOBS: Record<string, Job[]> = {
  "Software Developer": [
    { title: "Software Developer I", company: "Apple", location: "Hyderabad", salary: "₹50,000 - ₹80,000", link: "#" },
    { title: "Junior Developer", company: "IBM", location: "Hyderabad", salary: "₹55,000 - ₹90,000", link: "#" },
    { title: "Fullstack Developer", company: "Google", location: "Hyderabad", salary: "₹70,000 - ₹100,000", link: "#" },
    { title: "Backend Developer", company: "Microsoft", location: "Hyderabad", salary: "₹60,000 - ₹95,000", link: "#" },
    { title: "Frontend Developer", company: "Infosys", location: "Hyderabad", salary: "₹50,000 - ₹75,000", link: "#" },
  ],

  "Data Architect": [
    { title: "Data Architect", company: "Google", location: "Hyderabad", salary: "₹80,000 - ₹100,000", link: "https://www.naukri.com/google-jobs-in-hyderabad-secunderabad" },
    { title: "Senior Data Engineer", company: "IBM", location: "Hyderabad", salary: "₹70,000 - ₹95,000", link: "#" },
    { title: "Big Data Architect", company: "Microsoft", location: "Hyderabad", salary: "₹85,000 - ₹100,000", link: "#" },
    { title: "ETL Developer", company: "Infosys", location: "Hyderabad", salary: "₹60,000 - ₹80,000", link: "#" },
    { title: "Database Designer", company: "Apple", location: "Hyderabad", salary: "₹65,000 - ₹90,000", link: "#" },
  ],

  "Backend Developer": [
    { title: "Backend Developer", company: "Microsoft", location: "Hyderabad", salary: "₹65,000 - ₹95,000", link: "#" },
    { title: "API Developer", company: "Google", location: "Hyderabad", salary: "₹70,000 - ₹100,000", link: "#" },
    { title: "Python Developer", company: "IBM", location: "Hyderabad", salary: "₹60,000 - ₹85,000", link: "#" },
    { title: "Node.js Developer", company: "Apple", location: "Hyderabad", salary: "₹65,000 - ₹90,000", link: "#" },
    { title: "Java Developer", company: "Infosys", location: "Hyderabad", salary: "₹55,000 - ₹80,000", link: "#" },
  ],

  "Frontend Engineer": [
    { title: "Frontend Engineer", company: "Apple", location: "Hyderabad", salary: "₹60,000 - ₹90,000", link: "#" },
    { title: "React Developer", company: "Google", location: "Hyderabad", salary: "₹70,000 - ₹100,000", link: "#" },
    { title: "UI Engineer", company: "Microsoft", location: "Hyderabad", salary: "₹65,000 - ₹95,000", link: "#" },
    { title: "Frontend Developer", company: "IBM", location: "Hyderabad", salary: "₹60,000 - ₹85,000", link: "#" },
    { title: "Vue.js Developer", company: "Infosys", location: "Hyderabad", salary: "₹55,000 - ₹75,000", link: "#" },
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
        const res = await fetch(
          `https://thanusrikumili91-resumeai.hf.space/jobs?role=${encodeURIComponent(role)}`
        );

        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();

        if (data?.jobs && data.jobs.length > 0) {
          setJobs(data.jobs);
        } else {
          setJobs(STATIC_JOBS[role] || STATIC_JOBS["Software Developer"]);
        }
      } catch (err) {
        console.error("Job fetch failed:", err);
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

                      <span className="flex items-center gap-1 font-medium text-green-400">
                        💰 {job.salary}
                      </span>
                    </div>
                  </div>

                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-button px-5 py-2.5 rounded-lg text-xs font-semibold inline-flex items-center gap-2 shrink-0"
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
