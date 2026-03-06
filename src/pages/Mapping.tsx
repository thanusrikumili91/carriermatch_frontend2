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
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // COURSES DATA
  const courses: Record<string, { title: string; link: string }[]> = {
    "Machine Learning": [
      {
        title: "Machine Learning by Andrew Ng",
        link: "https://www.coursera.org/learn/machine-learning",
      },
      {
        title: "Machine Learning A-Z",
        link: "https://www.udemy.com/course/machinelearning/",
      },
      {
        title: "Intro to Machine Learning",
        link: "https://www.kaggle.com/learn/intro-to-machine-learning",
      },
    ],

    "Deep Learning": [
      {
        title: "Deep Learning Specialization",
        link: "https://www.coursera.org/specializations/deep-learning",
      },
      {
        title: "Deep Learning with TensorFlow",
        link: "https://www.udacity.com/course/deep-learning-pytorch--ud188",
      },
      {
        title: "Neural Networks Course",
        link: "https://www.udemy.com/course/deeplearning/",
      },
    ],

    Python: [
      {
        title: "Python for Everybody",
        link: "https://www.coursera.org/specializations/python",
      },
      {
        title: "Complete Python Bootcamp",
        link: "https://www.udemy.com/course/complete-python-bootcamp/",
      },
      {
        title: "Python Tutorial",
        link: "https://www.w3schools.com/python/",
      },
    ],
  };

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
    setTimeout(() => {
      setRoles([
        { name: "Data Scientist", match: 92 },
        { name: "ML Engineer", match: 86 },
        { name: "AI Engineer", match: 80 },
      ]);

      setMissingSkills(["Machine Learning", "Deep Learning", "Python"]);
      setProfiles({ github: githubParam || "", linkedin: linkedinParam || "" });

      setAnalyzing(false);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <motion.h1
        className="text-3xl font-bold text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Career Skill Mapping
      </motion.h1>

      {/* Missing Skills */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Missing Skills</h2>

        <div className="flex flex-wrap gap-3">
          {missingSkills.map((skill, index) => (
            <button
              key={index}
              onClick={() => setSelectedSkill(skill)}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition"
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Show Courses */}
        {selectedSkill && courses[selectedSkill] && (
          <div className="mt-6">
            <h3 className="font-semibold mb-3">
              Recommended Courses for {selectedSkill}
            </h3>

            <div className="space-y-2">
              {courses[selectedSkill].map((course, i) => (
                <button
                  key={i}
                  onClick={() => window.open(course.link, "_blank")}
                  className="block w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg"
                >
                  {course.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Suggested Projects</h2>

        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            className="block mb-3 text-blue-600 hover:underline"
          >
            {project.name}
          </a>
        ))}
      </div>

      {/* Jobs */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Briefcase size={20} /> Suggested Jobs
        </h2>

        {suggestedJobs.map((job, index) => (
          <div
            key={index}
            className="border-b py-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{job.title}</p>
              <p className="text-sm text-gray-500">
                {job.company} • {job.location}
              </p>
            </div>

            <a
              href={job.link}
              target="_blank"
              className="text-blue-600 flex items-center gap-1"
            >
              Apply <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mapping;
