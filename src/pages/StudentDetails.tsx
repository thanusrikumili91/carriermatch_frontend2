import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, GraduationCap, Calendar, Award, Wrench } from "lucide-react";

const educationOptions = ["B.Tech","B.Sc","BCA","MCA","M.Tech","MBA","Degree","Diploma","Other"];

const citiesByCountry: Record<string, string[]> = {
  in: ["Hyderabad", "Bangalore", "Chennai", "Mumbai", "Delhi"],
  us: ["New York", "San Francisco", "Austin", "Seattle"],
  gb: ["London", "Manchester", "Birmingham"],
  ca: ["Toronto", "Vancouver", "Montreal"]
};

const StudentDetails = () => {

  const navigate = useNavigate();

  const [form,setForm] = useState({
    name:"",
    education:"",
    year:"",
    cgpa:"",
    skills:"",
    country:"gb",
    city:"",
    salaryMin:"",
    salaryMax:"",
    companyType:""
  });

  const [loading,setLoading] = useState(false);

  const handleSubmit = (e:React.FormEvent) => {

    e.preventDefault();

    localStorage.setItem("jobFilters",JSON.stringify(form));

    setLoading(true);

    setTimeout(()=>{
      setLoading(false);
      navigate("/upload");
    },800);

  };

  const inputClass =
  "w-full pl-10 pr-4 py-3 rounded-lg input-glow text-sm text-foreground bg-input placeholder:text-muted-foreground";

  return (

    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">

      <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.5}}
      className="w-full max-w-lg glass-card glow-box p-8 sm:p-10"
      >

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Student Details
          </h1>
          <p className="text-sm text-muted-foreground">
            Tell us about yourself
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>

              <input
              required
              value={form.name}
              onChange={(e)=>setForm({...form,name:e.target.value})}
              className={inputClass}
              placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Education
            </label>

            <div className="relative">

              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>

              <select
              required
              value={form.education}
              onChange={(e)=>setForm({...form,education:e.target.value})}
              className={inputClass}
              >
                <option value="">Select</option>

                {educationOptions.map((opt)=>(
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Year
              </label>

              <div className="relative">

                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>

                <input
                type="number"
                min="1"
                max="6"
                required
                value={form.year}
                onChange={(e)=>setForm({...form,year:e.target.value})}
                className={inputClass}
                />

              </div>
            </div>

            <div>

              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                CGPA
              </label>

              <div className="relative">

                <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>

                <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                required
                value={form.cgpa}
                onChange={(e)=>setForm({...form,cgpa:e.target.value})}
                className={inputClass}
                />

              </div>
            </div>

          </div>

          <div>

            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Skills
            </label>

            <div className="relative">

              <Wrench className="absolute left-3 top-3 w-4 h-4 text-muted-foreground"/>

              <textarea
              value={form.skills}
              onChange={(e)=>setForm({...form,skills:e.target.value})}
              className={inputClass+" min-h-[80px] resize-none"}
              placeholder="React, Python..."
              />

            </div>

          </div>

          {/* Filters */}

          <div className="space-y-3">

            <h3 className="text-sm font-semibold text-muted-foreground">
              Job Filters
            </h3>

            <div className="grid grid-cols-2 gap-3">

              {/* Country */}
              <select
              value={form.country}
              onChange={(e)=>setForm({...form,country:e.target.value, city:""})}
              className={inputClass}
              >
                <option value="gb">UK</option>
                <option value="us">USA</option>
                <option value="in">India</option>
                <option value="ca">Canada</option>
              </select>

              {/* City */}
              <select
              value={form.city}
              onChange={(e)=>setForm({...form,city:e.target.value})}
              className={inputClass}
              >
                <option value="">Select City</option>
                {citiesByCountry[form.country]?.map((city)=>(
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <input
              type="number"
              placeholder="Min Salary"
              value={form.salaryMin}
              onChange={(e)=>setForm({...form,salaryMin:e.target.value})}
              className={inputClass}
              />

              <input
              type="number"
              placeholder="Max Salary"
              value={form.salaryMax}
              onChange={(e)=>setForm({...form,salaryMax:e.target.value})}
              className={inputClass}
              />

              <select
              value={form.companyType}
              onChange={(e)=>setForm({...form,companyType:e.target.value})}
              className={inputClass}
              >
                <option value="">Company Type</option>
                <option value="MNC">MNC</option>
                <option value="Startup">Startup</option>
              </select>

            </div>

          </div>

          <button
          type="submit"
          disabled={loading}
          className="w-full glow-button py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >

            {loading ?
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"/>
            :
            "Continue →"}

          </button>

        </form>

      </motion.div>

    </div>
  );

};

export default StudentDetails;
