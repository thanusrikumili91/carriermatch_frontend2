import { useNavigate } from "react-router-dom";

const skillToRoleMap: Record<string, string> = {
  "React": "Frontend Developer",
  "JavaScript": "Frontend Developer",
  "HTML": "Frontend Developer",
  "CSS": "Frontend Developer",
  "Python": "Data Analyst",
  "SQL": "Data Analyst",
  "Excel": "Data Analyst",
  "UI Design": "UI/UX Designer",
  "Figma": "UI/UX Designer",
  "Adobe XD": "UI/UX Designer",
};

// Mock job listings for each role
const jobsByRole: Record<string, { title: string; company: string; location: string; url: string }[]> = {
  "Frontend Developer": [
    { title: "Senior Frontend Engineer", company: "Google", location: "Bangalore, India", url: "#" },
    { title: "React Developer", company: "Microsoft", location: "Hyderabad, India", url: "#" },
    { title: "UI Engineer", company: "Flipkart", location: "Bangalore, India", url: "#" },
  ],
  "Data Analyst": [
    { title: "Business Analyst", company: "Amazon", location: "Chennai, India", url: "#" },
    { title: "Data Analyst", company: "Deloitte", location: "Mumbai, India", url: "#" },
    { title: "Analytics Engineer", company: "TCS", location: "Pune, India", url: "#" },
  ],
  "UI/UX Designer": [
    { title: "Product Designer", company: "Swiggy", location: "Bangalore, India", url: "#" },
    { title: "UX Designer", company: "Zoho", location: "Chennai, India", url: "#" },
    { title: "UI/UX Designer", company: "Freshworks", location: "Remote", url: "#" },
  ],
};

const Mapping = () => {
  const navigate = useNavigate();

  // <-- Change these skills to test dynamically -->
  const extracted_skills = ["React", "Python", "UI Design"];

  // Generate roles based on skills
  const predicted_roles = Array.from(
    new Set(
      extracted_skills
        .map(skill => skillToRoleMap[skill])
        .filter(Boolean)
    )
  );

  // Generate job listings for these roles
  const job_listings = predicted_roles.flatMap(role => jobsByRole[role] || []);

  if (!predicted_roles.length) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">No Roles Found</h1>
        <button
          className="mt-4 text-primary underline"
          onClick={() => navigate("/")}
        >
          Upload Resume Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Resume Analysis Result</h1>

      <h2 className="text-lg font-semibold mb-2">Extracted Skills</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {extracted_skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-2">Predicted Roles</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {predicted_roles.map((role, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
          >
            {role}
          </span>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4">Job Listings</h2>
      {job_listings.map((job, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
          <h3 className="font-semibold">{job.title}</h3>
          <p className="text-sm text-muted-foreground">
            {job.company} - {job.location}
          </p>
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline text-sm"
          >
            Apply Here
          </a>
        </div>
      ))}
    </div>
  );
};

export default Mapping;
