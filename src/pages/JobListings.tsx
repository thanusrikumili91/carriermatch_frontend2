import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { MapPin, Building2, ExternalLink, ArrowLeft } from "lucide-react";

const mockJobs: Record<string, { company: string; title: string; location: string; link: string }[]> = {
  "Frontend Developer": [
    { company: "Google", title: "Senior Frontend Engineer", location: "Bangalore, India", link: "#" },
    { company: "Microsoft", title: "React Developer", location: "Hyderabad, India", link: "#" },
    { company: "Flipkart", title: "UI Engineer", location: "Bangalore, India", link: "#" },
    { company: "Razorpay", title: "Frontend Developer", location: "Remote", link: "#" },
  ],
  "Data Analyst": [
    { company: "Amazon", title: "Business Analyst", location: "Chennai, India", link: "#" },
    { company: "Deloitte", title: "Data Analyst", location: "Mumbai, India", link: "#" },
    { company: "TCS", title: "Analytics Engineer", location: "Pune, India", link: "#" },
  ],
  "UI/UX Designer": [
    { company: "Swiggy", title: "Product Designer", location: "Bangalore, India", link: "#" },
    { company: "Zoho", title: "UX Designer", location: "Chennai, India", link: "#" },
    { company: "Freshworks", title: "UI/UX Designer", location: "Remote", link: "#" },
  ],
};

const JobListings = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "Frontend Developer";
  const jobs = mockJobs[role] || mockJobs["Frontend Developer"];

  return (
    <div className="min-h-[85vh] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/mapping" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Results
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">
              Jobs for <span className="gradient-text">{role}</span>
            </h1>
            <p className="text-muted-foreground">{jobs.length} openings found</p>
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
