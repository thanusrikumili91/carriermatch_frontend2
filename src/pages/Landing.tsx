import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Target, Briefcase, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Resume Analysis",
    description: "Our AI engine extracts and analyzes skills from your resume with precision.",
  },
  {
    icon: Target,
    title: "Smart Role Matching",
    description: "Get matched with top job roles based on your unique skill profile.",
  },
  {
    icon: Briefcase,
    title: "Live Job Listings",
    description: "Discover current openings that align perfectly with your capabilities.",
  },
];

const Landing = () => {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">AI-Powered Career Mapping</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6">
              Discover Your
              <br />
              <span className="gradient-text">Perfect Career Path</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Upload your resume and let our AI analyze your skills, match you with ideal job roles, and find live opportunities — all in seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login" className="glow-button px-8 py-3.5 rounded-lg font-semibold text-sm inline-flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#features" className="px-8 py-3.5 rounded-lg font-semibold text-sm text-foreground glow-border hover:bg-secondary/50 transition-colors">
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How <span className="gradient-text">SkillMap AI</span> Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three simple steps to unlock your career potential
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-card p-8 card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center glass-card glow-box p-12 sm:p-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Map Your <span className="gradient-text">Future?</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of students who discovered their ideal career path using SkillMap AI.
          </p>
          <Link to="/login" className="glow-button px-8 py-3.5 rounded-lg font-semibold text-sm inline-flex items-center gap-2">
            Start Now <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;
