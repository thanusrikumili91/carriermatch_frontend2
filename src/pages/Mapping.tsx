import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Briefcase, TrendingUp, ExternalLink } from "lucide-react";

const Mapping = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const predictedRole = "Data Scientist";

  const scoreParam = searchParams.get("score");
  const githubParam = searchParams.get("github")?.trim();
  const linkedinParam = searchParams.get("linkedin")?.trim();

  const [analyzing, setAnalyzing] = useState(true);
  const [roles, setRoles] = useState<{ name: string; match: number }[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [profiles, setProfiles] = useState<{ github?: string; linkedin?: string }>({});

  const suggestedJobs = [
    {
      title: "Data Scientist",
      company: "TCS",
      location: "Hyderabad, India",
      link: "https://www.example.com/job/datascientist",
    },
    {
      title: "Machine Learning Engineer",
      company: "Infosys",
      location: "Bangalore, India",
      link: "https://www.example.com/job/mlengineer",
    },
    {
      title: "AI Engineer",
      company: "Wipro",
      location: "Pune, India",
      link: "https://www.example.com/job/aiengineer",
    },
  ];

  const projects = [
    {
      name: "Resume to Job Role Prediction using ML",
      link: "https://github.com/thanusrikumili91/resume-job-matcher",
    },
    {
      name: "Customer Churn Prediction System",
      link: "https://github.com/thanusrikumili91/churn-prediction",
    },
    {
      name: "House Price Prediction using Machine Learning",
      link: "https://github.com/thanusrikumili91/house-price-ml",
    },
    {
      name: "Sentiment Analysis on Twitter Data",
      link: "https://github.com/thanusrikumili91/sentiment-analysis",
    },
  ];

  useEffect(() => {
    const staticMissingSkills = [
      "Machine Learning",
      "Deep Learning",
      "Data Visualization",
      "Feature Engineering",
      "Model Deployment",
      "Big Data Tools (Spark/Hadoop)",
    ];

    setMissingSkills(staticMissingSkills);

    const baseScore = scoreParam ? Number(scoreParam) : 0;
    const matchPercentage =
      baseScore > 0 ? Math.round(baseScore * 100) : Math.floor(Math.random() * 41) + 60;

    setRoles([{ name: predictedRole, match: matchPercentage }]);

    setProfiles({
      github: githubParam || "https://github.com/thanusrikumili91",
      linkedin: linkedinParam || "https://www.linkedin.com",
    });

    setAnalyzing(false);
  }, [scoreParam, githubParam, linkedinParam]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-black">
      <div className="w-full max-w-3xl">

        {analyzing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-2xl font-bold text-blue-400 mb-3">
              Matching Your Skills with Job Roles...
            </p>
            <p className="text-gray-400">Our AI is analyzing your profile</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-white">
                Your <span className="text-blue-400">Top Match</span>
              </h1>
              <p className="text-gray-400">
                Based on your skills and experience
              </p>
            </div>

            {roles.map((role, i) => (
              <motion.div
                key={role.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="backdrop-blur-xl bg-white/5 border border-blue-500/20 rounded-2xl p-8 shadow-xl hover:border-blue-500/40 transition"
              >
                {/* Role Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Briefcase className="text-blue-400 w-5 h-5" />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {role.name}
                      </h2>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {role.match}% Match
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/jobs?role=${encodeURIComponent(role.name)}`)
                    }
                    className="px-5 py-2 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 transition shadow-lg shadow-blue-500/30"
                  >
                    View Jobs
                  </button>
                </div>

                {/* Progress */}
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${role.match}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-[0_0_10px_#3b82f6]"
                  />
                </div>

                {/* Missing Skills */}
                <div className="mt-8">
                  <p className="text-blue-400 font-semibold mb-3">
                    Missing Skills
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {missingSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggested Jobs */}
                <div className="mt-8">
                  <p className="text-blue-400 font-semibold mb-3">
                    Suggested Jobs
                  </p>

                  <div className="space-y-2">
                    {suggestedJobs.map((job, idx) => (
                      <a
                        key={idx}
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-between text-sm bg-white/5 hover:bg-white/10 transition p-3 rounded-lg"
                      >
                        <span className="text-white">
                          {job.title} @ {job.company}
                        </span>
                        <span className="text-gray-400">{job.location}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="mt-8">
                  <p className="text-blue-400 font-semibold mb-3">Projects</p>

                  <div className="space-y-2">
                    {projects.map((project, idx) => (
                      <a
                        key={idx}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm block bg-white/5 hover:bg-white/10 p-3 rounded-lg text-blue-300"
                      >
                        {project.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Social */}
                {(profiles.github || profiles.linkedin) && (
                  <div className="mt-8 flex gap-5">
                    {profiles.github && (
                      <a
                        href={profiles.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                      >
                        GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {profiles.linkedin && (
                      <a
                        href={profiles.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                      >
                        LinkedIn <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Mapping;
