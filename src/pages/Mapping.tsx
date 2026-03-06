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
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const [profiles, setProfiles] = useState<{ github?: string; linkedin?: string }>({});

  useEffect(() => {
    setTimeout(() => {
      const score = scoreParam ? parseFloat(scoreParam) : 0.82;

      setRoles([
        { name: predictedRole, match: score },
        { name: "Machine Learning Engineer", match: score - 0.1 },
        { name: "AI Engineer", match: score - 0.15 },
      ]);

      setMissingSkills(["Machine Learning", "Deep Learning", "NLP"]);

      setProfiles({
        github: githubParam,
        linkedin: linkedinParam,
      });

      setAnalyzing(false);
    }, 2000);
  }, []);

  const suggestedJobs = [
    {
      title: "Data Scientist",
      company: "TCS",
      location: "Hyderabad",
      link: "https://www.example.com/job/datascientist",
    },
    {
      title: "Machine Learning Engineer",
      company: "Infosys",
      location: "Bangalore",
      link: "https://www.example.com/job/mlengineer",
    },
    {
      title: "AI Engineer",
      company: "Wipro",
      location: "Pune",
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

  const courseSuggestions: any = {
    "Machine Learning": [
      {
        title: "Machine Learning by Andrew Ng",
        url: "https://www.coursera.org/learn/machine-learning",
      },
      {
        title: "Google Machine Learning Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course",
      },
      {
        title: "ML Specialization",
        url: "https://www.coursera.org/specializations/machine-learning-introduction",
      },
    ],
    "Deep Learning": [
      {
        title: "Deep Learning Specialization",
        url: "https://www.coursera.org/specializations/deep-learning",
      },
      {
        title: "Deep Learning with PyTorch",
        url: "https://www.udacity.com/course/deep-learning-pytorch--ud188",
      },
      {
        title: "Neural Networks and Deep Learning",
        url: "https://www.coursera.org/learn/neural-networks-deep-learning",
      },
    ],
    NLP: [
      {
        title: "Natural Language Processing Specialization",
        url: "https://www.coursera.org/specializations/natural-language-processing",
      },
      {
        title: "NLP with Python",
        url: "https://www.udemy.com/course/nlp-natural-language-processing-with-python/",
      },
      {
        title: "Practical NLP",
        url: "https://course.fast.ai/",
      },
    ],
  };

  if (analyzing) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Analyzing Resume...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* Predicted Role */}
      <h1 className="text-3xl font-bold mb-6">
        Predicted Role: {predictedRole}
      </h1>

      {/* Role Match */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Role Match</h2>

        {roles.map((role) => (
          <div key={role.name} className="mb-3">
            <div className="flex justify-between">
              <span>{role.name}</span>
              <span>{(role.match * 100).toFixed(0)}%</span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-green-500 h-2 rounded"
                style={{ width: `${role.match * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Missing Skills */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Missing Skills</h2>

        <div className="flex flex-wrap gap-3">
          {missingSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Course Suggestions */}
      {selectedSkill && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Courses for {selectedSkill}
          </h2>

          <div className="space-y-3">
            {courseSuggestions[selectedSkill].map((course: any) => (
              <div
                key={course.title}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <span>{course.title}</span>

                <button
                  onClick={() => window.open(course.url, "_blank")}
                  className="flex items-center gap-1 text-blue-600"
                >
                  View Course
                  <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Jobs */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Briefcase size={20} />
          Suggested Jobs
        </h2>

        <div className="space-y-3">
          {suggestedJobs.map((job) => (
            <div
              key={job.title}
              className="flex justify-between items-center border p-4 rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-500">
                  {job.company} • {job.location}
                </p>
              </div>

              <button
                onClick={() => window.open(job.link, "_blank")}
                className="text-blue-600 flex items-center gap-1"
              >
                Apply
                <ExternalLink size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={20} />
          Suggested Projects
        </h2>

        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="flex justify-between items-center border p-4 rounded-lg"
            >
              <span>{project.name}</span>

              <button
                onClick={() => window.open(project.link, "_blank")}
                className="text-blue-600 flex items-center gap-1"
              >
                View
                <ExternalLink size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Mapping;
