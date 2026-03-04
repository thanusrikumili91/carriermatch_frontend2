import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, X } from "lucide-react";
import { motion } from "framer-motion";

const BACKEND_URL = "https://thanusrikumili91-resumeai.hf.space/analyze";

const ResumeUpload = () => {
  const navigate = useNavigate();
  const [file,setFile] = useState<File|null>(null);
  const [dragging,setDragging] = useState(false);
  const [loading,setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f:File) => { if(f.type==="application/pdf"||f.type.startsWith("image/")) setFile(f); }
  const handleDrop = (e:React.DragEvent) => { e.preventDefault(); setDragging(false); if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }

  const handleSubmit = async () => {
    if(!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try{
      const res = await fetch(BACKEND_URL, {method:"POST", body:formData});
      const data = await res.json();
      if(data.predicted_role){
        navigate(`/jobs?role=${encodeURIComponent(data.predicted_role)}`);
      }
    }catch(err){ console.error(err); }
    finally{ setLoading(false); }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <motion.div className="w-full max-w-lg glass-card p-8" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Upload Your Resume</h1>
          <p className="text-sm text-muted-foreground">Drag & drop or click to upload a PDF or image</p>
        </div>
        {!loading?(
          <>
          <div onDragOver={(e)=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={handleDrop} onClick={()=>inputRef.current?.click()} className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer ${dragging?"border-primary bg-primary/5":"border-border hover:border-primary/40"}`}>
            <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground"/>
            <p className="text-sm text-muted-foreground">Drop your resume here or <span className="text-primary font-medium">browse</span></p>
            <p className="text-xs text-muted-foreground mt-1">PDF or Image formats</p>
            <input ref={inputRef} type="file" accept=".pdf,image/*" className="hidden" onChange={(e)=>e.target.files?.[0]&&handleFile(e.target.files[0])}/>
          </div>
          {file&&(<motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="mt-4 flex items-center justify-between glass-card p-4">
            <div className="flex items-center gap-3"><FileText className="w-5 h-5 text-primary"/><div><p className="text-sm font-medium text-foreground">{file.name}</p><p className="text-xs text-muted-foreground">{(file.size/1024).toFixed(1)} KB</p></div></div>
            <button onClick={()=>setFile(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4"/></button>
          </motion.div>)}
          <button onClick={handleSubmit} disabled={!file} className="w-full mt-6 glow-button py-3 rounded-lg font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed">Analyze Resume →</button>
          </>
        ):(
          <motion.div className="text-center py-12" initial={{opacity:0}} animate={{opacity:1}}>
            <div className="w-16 h-16 mx-auto mb-6 border-4 border-primary/20 border-t-primary rounded-full animate-spin"/>
            <p className="text-lg font-semibold gradient-text mb-2">Analyzing Resume with AI...</p>
            <p className="text-sm text-muted-foreground">Extracting skills and matching roles</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ResumeUpload;
