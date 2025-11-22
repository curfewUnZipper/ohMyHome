import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onBack }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // THEME ------------------------------------
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // NAVIGATION ----------------------------------
  const handleHome = () => navigate('/');
  const handleEco = () => navigate('/eco');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="w-full bg-brand-bg text-brand-text shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LEFT: Brand + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Hamburger Menu (Three Lines) */}
            <button 
              onClick={toggleSidebar}
              className="flex flex-col gap-1.5 hover:opacity-70 transition p-2 text-brand-text"
              aria-label="Toggle sidebar"
            >
              <span className="w-6 h-0.5 bg-brand-primary"></span>
              <span className="w-6 h-0.5 bg-brand-primary"></span>
              <span className="w-6 h-0.5 bg-brand-primary"></span>
            </button>

            <h1 
              className="text-xl md:text-2xl font-bold tracking-wide text-brand-primary cursor-pointer"
              onClick={onBack}
            >
              OhMyHome
            </h1>
          </div>

          {/* RIGHT: Eco + Theme */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <button className="hover:text-brand-primary transition" onClick={handleEco}>
              Eco🌱
            </button>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="text-xl hover:text-brand-primary transition">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-brand-bg text-brand-text shadow-lg z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Close Button */}
          <button 
            onClick={toggleSidebar}
            className="mb-6 text-2xl hover:text-brand-primary transition"
          >
            ✕
          </button>

          {/* Sidebar Content */}
          <div className="space-y-4">
            <div className="border-b border-brand-primary pb-4">
              <h2 className="text-lg font-semibold mb-2">Settings</h2>
            </div>
            
            <div className="py-4">
              <label className="block text-sm font-medium mb-2">
                Threshold
              </label>
              <input 
                type="number"
                defaultValue={50}
                className="w-full px-3 py-2 bg-brand-bg border border-brand-primary rounded focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}