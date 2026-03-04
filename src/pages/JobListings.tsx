import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { MapPin, Building2, ExternalLink, ArrowLeft } from "lucide-react";

const JobListings = () => {
  const location = useLocation();
  const resumeData = location.state?.resumeData;

  if (!resumeData) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">No Data Found</h1>
          <Link
            to="/"
            className="text-primary underline font-medium"
          >
            Upload Resume Again
          </Link>
        </div>
      </div>
    );
  }

  const { predicted_role, job_listings } = resumeData;

  // Fallback if job_listings is empty
  const jobs = Array.isArray(job_listings) && job_listings.length > 0
    ? job_listings
    : [
        { title: predicted_role, company: "Multiple Companies", location: "Various Locations", url: "#" }
      ];

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
              Jobs for <span className="gradient-text">{predicted_role}</span>
            </h1>
            <p className="text-muted-foreground">{jobs.length} openings found</p>
          </div>

          <div className="space-y-4">
            {jobs.map((job: any, i: number) => (
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
                    href={job.url || "#"}
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
