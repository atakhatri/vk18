"use client";

import { useState, useEffect } from "react";
import { HomeIcon, Blend, SwordsIcon, Flame } from "lucide-react";

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  const navItems = [
    { id: "hero", icon: HomeIcon, label: "OVERVIEW" },
    { id: "ODIs", icon: Blend, label: "ODIs" },
    { id: "TESTs", icon: SwordsIcon, label: "TESTs" },
    { id: "T20Is", icon: Flame, label: "T20Is" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    handleScroll(); // Check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-full px-2 py-2 mx-6 shadow-2xl">
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative flex items-center gap-2 px-4 md:px-6 py-1 md:py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-blue-500/20 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "scale-110" : ""
                  } transition-transform`}
                />
                <span
                  className={`overflow-hidden transition-all duration-500 ${
                    isActive
                      ? "max-w-[100px] opacity-100 "
                      : "max-w-0 opacity-0"
                  }`}
                >
                  {item.label}
                </span>

                {/* Tooltip for inactive items */}
                {!isActive && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default FloatingNav;
