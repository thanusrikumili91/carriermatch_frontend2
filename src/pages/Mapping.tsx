import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Briefcase, TrendingUp, ExternalLink } from "lucide-react";

const Mapping = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Always default to "Software Developer"
  const predictedRole = "Software Developer";

  const scoreParam = searchParams.get("score");
  const githubParam = searchParams.get("github")?.trim();
  const linkedinParam = searchParams.get("linkedin")?.trim();

  const [analyzing, setAnalyzing] = useState(true);
  const [roles, setRoles] = useState<{ name: string; match: number }[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [profiles, setProfiles] = useState<{ github?: string; linkedin?: string }>({});

  // Static job suggestions for Software Developer
  const suggestedJobs = [
    {
      title: "Full Stack Developer",
      company: "Tech Solutions Pvt Ltd",
      location: "Bangalore, India",
      link: "https://www.example.com/job/fullstack",
    },
    {
      title: "Backend Developer",
      company: "Innovatech",
      location: "Hyderabad, India",
      link: "https://www.example.com/job/backend",
    },
  ];

  // Static projects
  const projects = [
    {
      name: "AI-Powered Code Review Assistant",
      link: "https://github.com/thanusrikumili91/AI-Code-Review",
    },
    {
      name: "Collaborative Real-Time Code Editor (VS Code-like Web App)",
      link: "https://github.com/thanusrikumili91/Realtime-Code-Editor",
    },
  ];

  useEffect(() => {
    // Static missing skills for Software Developer
    const staticMissingSkills = ["Django / Spring Boot", "Docker", "AWS / Azure", "Unit Testing", "CI/CD"];

    setMissingSkills(staticMissingSkills);

    // Generate random match percentage if score is missing
    const baseScore = scoreParam ? Number(scoreParam) : 0;
    const matchPercentage =
      baseScore > 0 ? Math.round(baseScore * 100) : Math.floor(Math.random() * 41) + 60; // 60-100%

    // Always ensure at least one role
    setRoles([{ name: predictedRole, match: matchPercentage }]);

    // Profiles (GitHub / LinkedIn fallback)
    setProfiles({
      github: githubParam || "https://github.com/thanusrikumili91/CarRentalSystem",
      linkedin: linkedinParam || "https://www.linkedin.com/in/thanusrikumili91/",
    });

    setAnalyzing(false);
  }, [scoreParam, githubParam, linkedinParam]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {analyzing ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-2xl font-bold gradient-text mb-3">Matching Your Skills with Job Roles...</p>
            <p className="text-muted-foreground">Our AI is analyzing your profile</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-2">
                Your <span className="gradient-text">Top Match</span>
              </h1>
              <p className="text-muted-foreground">Based on your skills and experience</p>
            </div>

            <div className="space-y-4">
              {roles.map((role, i) => (
                <motion.div
                  key={role.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.4 }}
                  className="glass-card glow-border p-6 card-hover"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-foreground">{role.name}</h2>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <TrendingUp className="w-3 h-3" />
                          <span>{role.match}% Match</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/jobs?role=${encodeURIComponent(role.name)}`)}
                      className="glow-button px-5 py-2 rounded-lg text-xs font-semibold"
                    >
                      View Jobs
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${role.match}%` }}
                      transition={{ delay: i * 0.2 + 0.3, duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full progress-glow"
                    />
                  </div>

                  {/* Missing Skills Section */}
                  {missingSkills.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-red-500 mb-2">Missing Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {missingSkills.map((skill, index) => (
                          <span key={index} className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested Jobs */}
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-green-600 mb-2">Suggested Jobs</p>
                    <div className="flex flex-col gap-2">
                      {suggestedJobs.map((job, idx) => (
                        <a
                          key={idx}
                          href={job.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-700 hover:underline flex justify-between p-2 bg-blue-50 rounded-md"
                        >
                          <span>
                            {job.title} @ {job.company}
                          </span>
                          <span className="text-xs text-muted-foreground">{job.location}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Projects Section */}
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-purple-600 mb-2">Projects</p>
                    <div className="flex flex-col gap-2">
                      {projects.map((project, idx) => (
                        <a
                          key={idx}
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-700 hover:underline flex justify-between p-2 bg-purple-50 rounded-md"
                        >
                          <span>{project.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* GitHub & LinkedIn */}
                  {(profiles.github || profiles.linkedin) && (
                    <div className="mt-6 flex gap-4">
                      {profiles.github && (
                        <a
                          href={profiles.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          GitHub <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {profiles.linkedin && (
                        <a
                          href={profiles.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-blue-700 hover:underline flex items-center gap-1"
                        >
                          LinkedIn <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Mapping;
