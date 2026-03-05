import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Building2, ExternalLink, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface Job {
  title: string;
  company: string;
  location: string;
  salary: number;
  type: string;
  link: string;
}

// -----------------------------
// 20 Data Science / Data Engineer Jobs
// -----------------------------
const STATIC_JOBS: Job[] = [
  { title: "Data Engineer", company: "Google", location: "Hyderabad", salary: 90000, type: "Product", link: "https://careers.google.com" },
  { title: "Junior Data Scientist", company: "Microsoft", location: "Bangalore", salary: 85000, type: "Product", link: "https://careers.microsoft.com" },
  { title: "Machine Learning Engineer", company: "Amazon", location: "Hyderabad", salary: 95000, type: "Product", link: "https://amazon.jobs" },
  { title: "Data Analyst", company: "IBM", location: "Pune", salary: 70000, type: "Service", link: "https://www.ibm.com/careers" },
  { title: "AI Engineer", company: "Meta", location: "Bangalore", salary: 98000, type: "Product", link: "https://www.metacareers.com" },
  { title: "Data Engineer", company: "Infosys", location: "Chennai", salary: 65000, type: "Service", link: "https://career.infosys.com" },
  { title: "Data Scientist", company: "TCS", location: "Hyderabad", salary: 72000, type: "Service", link: "https://www.tcs.com/careers" },
  { title: "ML Engineer", company: "Apple", location: "Bangalore", salary: 97000, type: "Product", link: "https://jobs.apple.com" },
  { title: "Data Architect", company: "Accenture", location: "Mumbai", salary: 88000, type: "Service", link: "https://www.accenture.com/careers" },
  { title: "Data Analyst", company: "Deloitte", location: "Hyderabad", salary: 76000, type: "Service", link: "https://jobs2.deloitte.com" },
  { title: "AI Research Engineer", company: "NVIDIA", location: "Pune", salary: 99000, type: "Product", link: "https://www.nvidia.com/en-us/about-nvidia/careers" },
  { title: "Data Engineer", company: "Oracle", location: "Bangalore", salary: 91000, type: "Product", link: "https://www.oracle.com/careers" },
  { title: "ML Developer", company: "Capgemini", location: "Chennai", salary: 67000, type: "Service", link: "https://www.capgemini.com/careers" },
  { title: "AI Engineer", company: "Samsung", location: "Bangalore", salary: 92000, type: "Product", link: "https://www.samsungcareers.com" },
  { title: "Big Data Engineer", company: "Wipro", location: "Hyderabad", salary: 74000, type: "Service", link: "https://careers.wipro.com" },
  { title: "Data Scientist", company: "Flipkart", location: "Bangalore", salary: 93000, type: "Product", link: "https://www.flipkartcareers.com" },
  { title: "AI Developer", company: "Zoho", location: "Chennai", salary: 81000, type: "Product", link: "https://careers.zoho.com" },
  { title: "Data Engineer", company: "HCL", location: "Pune", salary: 70000, type: "Service", link: "https://www.hcltech.com/careers" },
  { title: "Machine Learning Engineer", company: "PayPal", location: "Hyderabad", salary: 94000, type: "Product", link: "https://www.paypal.com/careers" },
  { title: "Data Analyst", company: "EY", location: "Mumbai", salary: 76000, type: "Service", link: "https://careers.ey.com" }
];

const LOCATIONS = ["All", "Hyderabad", "Bangalore", "Chennai", "Pune", "Mumbai"];
const TYPES = ["All", "Product", "Service"];

const JobListings = () => {

  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [salaryFilter, setSalaryFilter] = useState(0);

  // Filter logic
  const filteredJobs = STATIC_JOBS.filter((job) => {
    const locationMatch =
      locationFilter === "All" || job.location === locationFilter;

    const typeMatch =
      typeFilter === "All" || job.type === typeFilter;

    const salaryMatch =
      salaryFilter === 0 || job.salary >= salaryFilter;

    return locationMatch && typeMatch && salaryMatch;
  });

  return (
    <div className="min-h-[85vh] px-4 py-12">

      <div className="max-w-3xl mx-auto">

        <Link
          to="/mapping"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Results
        </Link>

        <h1 className="text-3xl font-bold mb-6">
          <span className="gradient-text">Data Science Job Listings</span>
        </h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

          {/* Location Filter */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="p-2 border rounded-md"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>

          {/* Company Type */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 border rounded-md"
          >
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          {/* Salary Filter */}
          <select
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(Number(e.target.value))}
            className="p-2 border rounded-md"
          >
            <option value={0}>All Salaries</option>
            <option value={70000}>70k+</option>
            <option value={80000}>80k+</option>
            <option value={90000}>90k+</option>
          </select>

        </div>

        <p className="text-muted-foreground mb-6">
          {filteredJobs.length} openings found
        </p>

        {/* Job Cards */}
        <div className="space-y-4">
          {filteredJobs.map((job, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card glow-border p-6"
            >

              <div className="flex flex-col sm:flex-row justify-between gap-4">

                <div>

                  <h2 className="text-lg font-semibold">
                    {job.title}
                  </h2>

                  <div className="flex gap-4 text-sm text-muted-foreground mt-2">

                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {job.company}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>

                    <span className="text-green-500 font-medium">
                      ₹{job.salary}
                    </span>

                  </div>

                </div>

                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-button px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
                >
                  Apply <ExternalLink className="w-3.5 h-3.5" />
                </a>

              </div>

            </motion.div>

          ))}
        </div>

      </div>

    </div>
  );
};

export default JobListings;
