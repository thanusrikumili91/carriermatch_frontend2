import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { MapPin, Building2, ExternalLink, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface Job {
  title: string;
  company: string;
  location: string;
  salary: number;
  type: string;
  link: string;
}

const STATIC_JOBS: Job[] = [
  { title:"Software Developer", company:"Apple", location:"Hyderabad", salary:80000, type:"Product", link:"https://jobs.apple.com" },
  { title:"Backend Developer", company:"IBM", location:"Bangalore", salary:70000, type:"Service", link:"https://www.ibm.com/careers" },
  { title:"Frontend Developer", company:"Google", location:"Hyderabad", salary:90000, type:"Product", link:"https://careers.google.com" },
  { title:"Fullstack Developer", company:"Infosys", location:"Chennai", salary:60000, type:"Service", link:"https://career.infosys.com" },
  { title:"Java Developer", company:"Microsoft", location:"Pune", salary:85000, type:"Product", link:"https://careers.microsoft.com" },
  { title:"Python Developer", company:"Amazon", location:"Hyderabad", salary:95000, type:"Product", link:"https://www.amazon.jobs" },
  { title:"React Developer", company:"Accenture", location:"Bangalore", salary:65000, type:"Service", link:"https://www.accenture.com/careers" },
  { title:"Node Developer", company:"Oracle", location:"Mumbai", salary:88000, type:"Product", link:"https://www.oracle.com/careers" },
  { title:"Software Engineer", company:"Capgemini", location:"Pune", salary:62000, type:"Service", link:"https://www.capgemini.com/careers" },
  { title:"Backend Engineer", company:"Adobe", location:"Bangalore", salary:93000, type:"Product", link:"https://careers.adobe.com" },
  { title:"Frontend Engineer", company:"TCS", location:"Chennai", salary:58000, type:"Service", link:"https://www.tcs.com/careers" },
  { title:"Full Stack Engineer", company:"Wipro", location:"Hyderabad", salary:61000, type:"Service", link:"https://careers.wipro.com" },
  { title:"Cloud Developer", company:"Google", location:"Bangalore", salary:98000, type:"Product", link:"https://careers.google.com" },
  { title:"API Developer", company:"Zoho", location:"Chennai", salary:72000, type:"Product", link:"https://www.zoho.com/careers" },
  { title:"Web Developer", company:"HCL", location:"Pune", salary:63000, type:"Service", link:"https://www.hcltech.com/careers" },
  { title:"Java Backend Developer", company:"IBM", location:"Hyderabad", salary:87000, type:"Service", link:"https://www.ibm.com/careers" },
  { title:"UI Developer", company:"Samsung", location:"Bangalore", salary:91000, type:"Product", link:"https://www.samsung.com/careers" },
  { title:"Software Engineer II", company:"PayPal", location:"Chennai", salary:94000, type:"Product", link:"https://www.paypal.com/careers" },
  { title:"Spring Boot Developer", company:"Cognizant", location:"Hyderabad", salary:67000, type:"Service", link:"https://careers.cognizant.com" },
  { title:"Frontend React Engineer", company:"Flipkart", location:"Bangalore", salary:92000, type:"Product", link:"https://www.flipkartcareers.com" }
];

const JobListings = () => {

  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "Software Developer";

  const [jobs, setJobs] = useState<Job[]>([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    setJobs(STATIC_JOBS);
  }, []);

  const filteredJobs = jobs.filter((job) => {

    if (role && !job.title.toLowerCase().includes(role.toLowerCase()))
      return false;

    if (locationFilter && job.location !== locationFilter)
      return false;

    if (salaryFilter && job.salary < salaryFilter)
      return false;

    if (typeFilter && job.type !== typeFilter)
      return false;

    return true;
  });

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
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </Link>

          <h1 className="text-3xl font-bold mb-6">
            Jobs for <span className="gradient-text">{role}</span>
          </h1>

          {/* FILTERS */}

          <div className="flex flex-wrap gap-4 mb-8">

            <select
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">All Locations</option>
              <option>Hyderabad</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Pune</option>
              <option>Mumbai</option>
            </select>

            <select
              onChange={(e) => setSalaryFilter(Number(e.target.value))}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="0">Any Salary</option>
              <option value="60000">60k+</option>
              <option value="80000">80k+</option>
              <option value="90000">90k+</option>
            </select>

            <select
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">All Companies</option>
              <option>Product</option>
              <option>Service</option>
            </select>

          </div>

          <p className="text-muted-foreground mb-6">
            {filteredJobs.length} openings found
          </p>

          {/* JOB CARDS */}

          <div className="space-y-4">

            {filteredJobs.map((job, i) => (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card glow-border p-6 card-hover"
              >

                <div className="flex flex-col sm:flex-row justify-between gap-4">

                  <div>

                    <h2 className="font-semibold text-lg">
                      {job.title}
                    </h2>

                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">

                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5"/>
                        {job.company}
                      </span>

                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5"/>
                        {job.location}
                      </span>

                      <span className="text-green-500 font-medium">
                        💰 ₹{job.salary}
                      </span>

                      <span className="text-blue-400">
                        {job.type}
                      </span>

                    </div>

                  </div>

                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-button px-5 py-2.5 rounded-lg text-xs font-semibold inline-flex items-center gap-2"
                  >
                    Apply
                    <ExternalLink className="w-3.5 h-3.5"/>
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
