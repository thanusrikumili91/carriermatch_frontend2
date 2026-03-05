import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Briefcase, TrendingUp, ExternalLink, X } from "lucide-react";

const skillResources: Record<string, { name: string; link: string }[]> = {
  "Django / Spring Boot": [
    { name: "Django Official Docs", link: "https://docs.djangoproject.com/" },
    { name: "Spring Boot Guide", link: "https://spring.io/projects/spring-boot" },
    { name: "Django Tutorial - Real Python", link: "https://realpython.com/tutorials/django/" },
  ],
  Docker: [
    { name: "Docker Official Docs", link: "https://docs.docker.com/" },
    { name: "Docker Tutorial - Docker Labs", link: "https://dockerlabs.collabnix.com/" },
    { name: "Docker Crash Course - YouTube", link: "https://www.youtube.com/watch?v=3c-iBn73dDE" },
  ],
  "AWS / Azure": [
    { name: "AWS Training", link: "https://aws.amazon.com/training/" },
    { name: "Azure Learn", link: "https://learn.microsoft.com/en-us/training/azure/" },
    { name: "Cloud Tutorials - FreeCodeCamp", link: "https://www.freecodecamp.org/news/aws-cloud-tutorial/" },
  ],
  "Unit Testing": [
    { name: "Jest Docs", link: "https://jestjs.io/docs/getting-started" },
    { name: "PyTest Docs", link: "https://docs.pytest.org/en/stable/" },
    { name: "Unit Testing Guide - Guru99", link: "https://www.guru99.com/unit-testing-guide.html" },
  ],
  "CI/CD": [
    { name: "GitHub Actions Docs", link: "https://docs.github.com/en/actions" },
    { name: "Jenkins CI/CD Tutorial", link: "https://www.jenkins.io/doc/tutorials/" },
    { name: "CI/CD Concepts - Atlassian", link: "https://www.atlassian.com/continuous-delivery/ci-vs-cd" },
  ],
};

const Mapping = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const roleParam = searchParams.get("role");
  const predictedRole = roleParam && roleParam.trim() !== "" ? roleParam.trim() : "Software Developer";

  const scoreParam = searchParams.get("score");
  const missingParam = searchParams.get("missing");
  const githubParam = searchParams.get("github")?.trim();
  const linkedinParam = searchParams.get("linkedin")?.trim();

  const [analyzing, setAnalyzing] = useState(true);
  const [roles, setRoles] = useState<{ name: string; match: number }[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [profiles, setProfiles] = useState<{ github?: string; linkedin?: string }>({});
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    let parsedMissing: string[] = [];
    if (missingParam) {
      try {
        parsedMissing = JSON.parse(decodeURIComponent(missingParam));
      } catch (err) {
        console.error("Error parsing missing skills:", err);
      }
    }
    setMissingSkills(parsedMissing);

    const baseScore = scoreParam ? Number(scoreParam) : 0;
    const matchPercentage =
      baseScore > 0 ? Math.round(baseScore * 100) : Math.floor(Math.random() * 41) + 60;

    setRoles([{ name: predictedRole, match: matchPercentage }]);

    setProfiles({
      github: githubParam || "https://github.com/thanusrikumili91/CarRentalSystem",
      linkedin: linkedinParam || "https://www.linkedin.com/in/thanusrikumili91/",
    });

    setAnalyzing(false);
  }, [predictedRole, scoreParam, missingParam, githubParam, linkedinParam]);

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

                  {/* Missing Skills */}
                  {missingSkills.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-red-500 mb-2">Missing Skills (Click to See Resources)</p>
                      <div className="flex flex-wrap gap-2">
                        {missingSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            onClick={() => setSelectedSkill(skill)}
                            className="cursor-pointer bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs hover:bg-red-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skill Resources Modal */}
                  {selectedSkill && skillResources[selectedSkill] && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    >
                      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                        <button
                          onClick={() => setSelectedSkill(null)}
                          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                          <X />
                        </button>
                        <h2 className="font-bold text-lg mb-4">{selectedSkill} Resources</h2>
                        <ul className="space-y-2 list-disc pl-5">
                          {skillResources[selectedSkill].map((res, idx) => (
                            <li key={idx}>
                              <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                                {res.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

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
