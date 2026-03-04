import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ParticleBackground from "./ParticleBackground";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ParticleBackground />
      <Navbar />
      <main className="flex-1 pt-16 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
