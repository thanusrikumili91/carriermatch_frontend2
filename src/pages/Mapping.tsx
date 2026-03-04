import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, TrendingUp } from "lucide-react";

const mockRoles = [
  { name: "Frontend Developer", match: 87 },
  { name: "Data Analyst", match: 82 },
  { name: "UI/UX Designer", match: 76 },
];

const Mapping = () => {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(true);
  const [roles, setRoles] = useState<typeof mockRoles>([]);

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
            <p className="text-2xl font-bold gradient-text mb-3">Matching Your Skills with Job Roles...</p>
            <p className="text-muted-foreground">Our AI is analyzing your profile</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-2">Your <span className="gradient-text">Top Matches</span></h1>
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

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${role.match}%` }}
                      transition={{ delay: i * 0.2 + 0.3, duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full progress-glow"
                    />
                  </div>
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
