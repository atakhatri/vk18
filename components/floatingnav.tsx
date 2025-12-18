"use client";

import { useState, useEffect, useRef } from "react";
import { HomeIcon, Blend, SwordsIcon, Flame } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const FloatingNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showCredit, setShowCredit] = useState(false);
  const isIpl = pathname?.includes("/ipl");
  const scrollTimeout = useRef<any>(null);

  const navItems = [
    { link: "#hero", icon: HomeIcon, label: "OVERVIEW" },
    { link: "#stats", icon: Blend, label: "STATS" },
    { link: "#matches", icon: SwordsIcon, label: "MATCHES" },
    { link: "#gallery", icon: Flame, label: "GALLERY" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      } else {
        setIsVisible(false);
      }
      setShowCredit(window.scrollY > window.innerHeight + 200);

      // Determine active section based on scroll position
      navItems.forEach((item) => {
        const el = document.getElementById(item.link.substring(1));
        if (el && el.getBoundingClientRect().top < 300) {
          setActiveSection(item.link.substring(1));
        }
      });
    };

    handleScroll(); // Check on mount
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <nav
      onMouseEnter={() => {
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        if (window.scrollY > 100) {
          scrollTimeout.current = setTimeout(() => {
            setIsVisible(false);
          }, 2000);
        }
      }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-full px-2 py-2 shadow-2xl">
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.link.substring(1);

            return (
              <button
                key={item.link}
                onClick={() => {
                  document
                    .getElementById(item.link.substring(1))
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group relative flex items-center gap-2 px-4 md:px-6 py-1 md:py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? isIpl
                      ? "bg-red-600 text-white shadow-lg shadow-red-500/25"
                      : "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
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

      {/* Stats Capsule (Left) */}
      <div
        className={`absolute right-full top-1/2 -translate-y-1/2 mr-2 transition-all duration-500 hidden md:block ${
          showCredit
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-full px-2 py-2 shadow-2xl whitespace-nowrap">
          <div className="px-4 py-2 rounded-full flex items-center">
            <span className="text-sm text-gray-400 font-medium">
              stats as per dec-2025
            </span>
          </div>
        </div>
      </div>

      {/* Credit Capsule */}
      <a
        href="https://portify-amber.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute left-full top-1/2 -translate-y-1/2 ml-2 transition-all duration-500 hidden md:block ${
          showCredit
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4 pointer-events-none"
        }`}
      >
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-full px-2 py-2 shadow-2xl whitespace-nowrap">
          <div className="px-4 py-2 rounded-full hover:bg-white/5 transition-colors flex items-center">
            <span className="text-sm text-gray-400 font-medium">
              Created by ATA KHATRI
            </span>
          </div>
        </div>
      </a>
    </nav>
  );
};

export default FloatingNav;
