import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, TrendingUp } from "lucide-react";

const mockRoles = [
  { name: "Frontend Developer", match: 87 },
  { name: "Data Analyst", match: 82 },
  { name: "UI/UX Designer", match: 76 },
];

// Missing skills for roles
const missingSkills: Record<string, string[]> = {
  "Frontend Developer": ["React", "TypeScript", "Machine Learning"],
  "Data Analyst": ["Python", "Machine Learning", "SQL"],
  "UI/UX Designer": ["Figma", "Design Systems", "User Research"],
};

// Course resources
const skillCourses: Record<string, { title: string; link: string }[]> = {
  "Machine Learning": [
    {
      title: "Machine Learning by Andrew Ng",
      link: "https://www.coursera.org/learn/machine-learning"
    },
    {
      title: "Google Machine Learning Crash Course",
      link: "https://developers.google.com/machine-learning/crash-course"
    },
    {
      title: "Machine Learning Full Course (YouTube)",
      link: "https://www.youtube.com/watch?v=Gv9_4yMHFhI"
    }
  ],

  React: [
    {
      title: "React Full Course",
      link: "https://www.youtube.com/watch?v=bMknfKXIFA8"
    },
    {
      title: "React Official Docs",
      link: "https://react.dev/learn"
    },
    {
      title: "React Crash Course",
      link: "https://www.youtube.com/watch?v=w7ejDZ8SWv8"
    }
  ],

  Python: [
    {
      title: "Python Full Course",
      link: "https://www.youtube.com/watch?v=_uQrJ0TkZlc"
    },
    {
      title: "Python Official Tutorial",
      link: "https://docs.python.org/3/tutorial/"
    },
    {
      title: "Python Crash Course",
      link: "https://www.youtube.com/watch?v=rfscVS0vtbw"
    }
  ]
};

const Mapping = () => {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(true);
  const [roles, setRoles] = useState<typeof mockRoles>([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyzing(false);
      setRoles(mockRoles);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">

        {analyzing ? (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-2xl font-bold gradient-text mb-3">
              Matching Your Skills with Job Roles...
            </p>
            <p className="text-muted-foreground">
              Our AI is analyzing your profile
            </p>
          </motion.div>

        ) : (

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-2">
                Your <span className="gradient-text">Top Matches</span>
              </h1>
              <p className="text-muted-foreground">
                Based on your skills and experience
              </p>
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
                        <h2 className="font-semibold text-foreground">
                          {role.name}
                        </h2>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <TrendingUp className="w-3 h-3" />
                          <span>{role.match}% Match</span>
                        </div>
                      </div>

                    </div>

                    {/* DO NOT CHANGE JOBS BUTTON */}
                    <button
                      onClick={() =>
                        navigate(`/jobs?role=${encodeURIComponent(role.name)}`)
                      }
                      className="glow-button px-5 py-2 rounded-lg text-xs font-semibold"
                    >
                      View Jobs
                    </button>

                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${role.match}%` }}
                      transition={{
                        delay: i * 0.2 + 0.3,
                        duration: 0.8,
                        ease: "easeOut"
                      }}
                      className="h-full rounded-full progress-glow"
                    />
                  </div>

                  {/* Missing Skills Buttons */}
                  <div className="mt-4 flex gap-2 flex-wrap">

                    {missingSkills[role.name]?.map((skill) => (

                      <button
                        key={skill}
                        onClick={() => setSelectedSkill(skill)}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg"
                      >
                        {skill}
                      </button>

                    ))}

                  </div>

                  {/* Courses Section */}
                  {selectedSkill && skillCourses[selectedSkill] && (

                    <div className="mt-4 space-y-2">

                      {skillCourses[selectedSkill].map((course, idx) => (

                        <div
                          key={idx}
                          className="flex justify-between items-center bg-gray-100 p-2 rounded"
                        >

                          <span className="text-sm">{course.title}</span>

                          <button
                            onClick={() =>
                              window.open(course.link, "_blank")
                            }
                            className="text-blue-600 text-xs font-semibold"
                          >
                            Go to Course
                          </button>

                        </div>

                      ))}

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
