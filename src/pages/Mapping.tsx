import { useLocation } from "react-router-dom";

const Mapping = () => {
  const location = useLocation();
  const resumeData = location.state?.resumeData;

  if (!resumeData) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">No Data Found</h1>
        <p>Please upload a resume first.</p>
      </div>
    );
  }

  const {
    extracted_skills,
    predicted_role,
    similarity_score,
    job_listings,
  } = resumeData;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Resume Analysis Result
      </h1>

      {/* Extracted Skills */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Extracted Skills</h2>
        <div className="flex flex-wrap gap-2">
          {extracted_skills?.map((skill: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Predicted Role */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Predicted Role</h2>
        <p className="text-xl font-bold text-primary">
          {predicted_role}
        </p>
      </div>

      {/* Similarity Score */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Similarity Score</h2>
        <p>{similarity_score}</p>
      </div>

      {/* Job Listings */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Job Listings</h2>

        {Array.isArray(job_listings) &&
          job_listings.map((job: any, index: number) => (
            <div
              key={index}
              className="mb-4 p-4 border rounded-lg shadow-sm"
            >
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
    </div>
  );
};

export default Mapping;
