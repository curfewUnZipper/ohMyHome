import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

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

  // USERS -------------------------------------
  const profiles = ["Mom", "Ankit", "Ankita", "Papa"];

  const [selectedProfile, setSelectedProfile] = useState(() => {
    return sessionStorage.getItem("profile") || "Guest";
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectProfile = async (profile) => {
        setSelectedProfile(profile);
        sessionStorage.setItem("profile", profile);
        setDropdownOpen(false);

        try {
          await fetch("http://localhost:5000/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: profile }),
          });

          console.log(`✔ Profile sent to backend: ${profile}`);
        } catch (err) {
          console.error("❌ Failed to send user to backend:", err);
        }
      };


  // NAVIGATION ----------------------------------
  const handleHome = () => navigate('/');
  const handleEco = () => navigate('/eco');

  return (
    <nav className="w-full bg-brand-bg text-brand-text shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT: Brand */}
        <h1 
          className="text-xl md:text-2xl font-bold tracking-wide text-brand-primary cursor-pointer"
          onClick={handleHome}
        >
          OhMyHome
        </h1>

        {/* RIGHT: Links + Theme + Profile */}
        <div className="flex items-center gap-6">

          {/* Desktop Navigation */}
          <button className="hover:text-brand-primary transition" onClick={handleEco}>
            Eco🌱
          </button>


          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="text-xl hover:text-brand-primary transition">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(prev => !prev)}
              className="text-sm px-3 py-1 rounded hover:bg-brand-hover transition"
            >
              👤 {selectedProfile}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-brand-bg border border-brand-hover rounded-md shadow-lg p-2 text-sm">
                {profiles.map((p, i) => (
                  <button 
                    key={i}
                    className="block w-full text-left py-1 px-2 hover:bg-brand-hover transition rounded"
                    onClick={() => selectProfile(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
         
        </div>
      </div>
    </nav>
  );
}
