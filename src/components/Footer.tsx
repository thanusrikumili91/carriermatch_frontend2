import { Brain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold gradient-text">SkillMap AI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered career mapping platform that analyzes your skills and connects you with the perfect job roles.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>SkillMap AI is a hackathon project designed to bridge the gap between student skills and industry demands.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: team@skillmapai.com</li>
              <li>Built with ❤️ for Hackathon 2026</li>
            </ul>
          </div>
        </div>

        <div className="neon-line mt-8 mb-4" />
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SkillMap AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
