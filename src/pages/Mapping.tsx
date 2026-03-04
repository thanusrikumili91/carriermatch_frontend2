import { useNavigate } from "react-router-dom";

interface ResumeData {
  extracted_skills: string[];
  predicted_role: string;
  similarity_score: string;
  job_listings: {
    title: string;
    company: string;
    location: string;
    url: string;
  }[];
}

interface MappingProps {
  resumeData: ResumeData;
}

const Mapping = ({ resumeData }: MappingProps) => {
  const navigate = useNavigate();

  if (!resumeData) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">No Data Found</h1>
        <button
          className="mt-4 text-primary underline"
          onClick={() => navigate("/")}
        >
          Upload Resume Again
        </button>
      </div>
    );
  }

  const { extracted_skills, predicted_role, similarity_score, job_listings } = resumeData;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Resume Analysis Result</h1>

      <h2 className="text-lg font-semibold mb-2">Extracted Skills</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {extracted_skills.map((skill, index) => (
          <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-2">Predicted Role</h2>
      <p className="text-xl font-bold mb-6 text-primary">{predicted_role}</p>

      <h2 className="text-lg font-semibold mb-2">Similarity Score</h2>
      <p className="mb-6">{similarity_score}</p>

      <h2 className="text-lg font-semibold mb-4">Job Listings</h2>
      {job_listings.map((job, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
          <h3 className="font-semibold">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{job.company} - {job.location}</p>
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

      <button
        className="mt-8 glow-button px-6 py-2 rounded-lg"
        onClick={() => navigate("/jobs", { state: { role: predicted_role, job_listings } })}
      >
        View Jobs
      </button>
    </div>
  );
};

export default Mapping;
