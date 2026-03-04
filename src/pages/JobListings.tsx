import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MapPin, Building2, ExternalLink, ArrowLeft } from "lucide-react";

interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
}

const JobListings = () => {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role") || "";
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async (role: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:7860/analyze", {
        method: "POST",
        body: new FormData(), // empty because we just want jobs for a role
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        // Filter jobs by roleParam if provided
        const filteredJobs = role
          ? data.jobs.filter((job: Job) =>
              job.title.toLowerCase().includes(role.toLowerCase())
            )
          : data.jobs;
        setJobs(filteredJobs || []);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch jobs from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roleParam) fetchJobs(roleParam);
  }, [roleParam]);

  return (
    <div className="min-h-[85vh] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/upload"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Upload
        </Link>

        <h1 className="text-3xl font-bold mb-4">
          Jobs for <span className="gradient-text">{roleParam || "All Roles"}</span>
        </h1>

        {loading && <p className="text-muted-foreground">Loading jobs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-4 mt-6">
          {!loading && !error && jobs.length === 0 && <p>No jobs found.</p>}

          {jobs.map((job, i) => (
            <div key={i} className="glass-card glow-border p-6 card-hover">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-lg">{job.title}</h2>
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
                >
                  Apply <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobListings;
