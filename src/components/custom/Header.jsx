import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdminPage = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-gray-900"
        >
          VidyaNexus AI
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-700">
          <Link to="/news" className="hover:text-blue-600">
            Kerala News
          </Link>
          <Link to="/" className="hover:text-blue-600">
            Subjects
          </Link>
          <Link to="/learning-resources" className="hover:text-blue-600">
            Learning Resources
          </Link>
          <Link to="/projects" className="hover:text-blue-600">
            Projects / Tasks
          </Link>
          <Link to="/ai-assistant" className="hover:text-blue-600">
            AI Assistant
          </Link>
          <Link to="/youtube-notes" className="hover:text-blue-600">
            YT Notes
          </Link>
          <Link to="/sgpa-calculator" className="hover:text-blue-600">
            SGPA Calculator
          </Link>

          {user && isAdminPage && (
            <Button size="sm" variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-5 pt-4 space-y-3 border-t bg-white shadow-md">
          <nav className="flex flex-col gap-4 text-[15px] font-medium text-gray-800">
            <Link
              to="/news"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Kerala News
            </Link>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Subjects
            </Link>
            <Link
              to="/learning-resources"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Learning Resources
            </Link>
            <Link
              to="/projects"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Projects / Tasks
            </Link>
            <Link
              to="/ai-assistant"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600"
            >
              AI Assistant
            </Link>
            <Link
              to="/youtube-notes"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600"
            >
              YT Notes
            </Link>
            <Link
              to="/sgpa-calculator"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600"
            >
              SGPA Calculator
            </Link>

            {user && isAdminPage && (
              <div className="pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full"
                >
                  Logout
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
