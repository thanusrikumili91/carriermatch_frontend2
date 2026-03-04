import { useLocation } from "react-router-dom";

const Mapping = () => {
  const location = useLocation();
  const resumeData = location.state?.resumeData || "";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Resume Analysis Result</h1>
      <div dangerouslySetInnerHTML={{ __html: resumeData }} />
    </div>
  );
};

export default Mapping;
