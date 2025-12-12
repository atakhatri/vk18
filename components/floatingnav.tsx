"use client";

import { useState, useEffect } from "react";
import { HomeIcon, Blend, SwordsIcon, Flame } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const FloatingNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const navItems = [
    { link: "/", icon: HomeIcon, label: "OVERVIEW" },
    { link: "/odi", icon: Blend, label: "ODIs" },
    { link: "/tests", icon: SwordsIcon, label: "TESTs" },
    { link: "/t20is", icon: Flame, label: "T20Is" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    handleScroll(); // Check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            const isActive = pathname === item.link;

            return (
              <button
                key={item.link}
                onClick={() => router.push(item.link)}
                className={`group relative flex items-center gap-2 px-4 md:px-6 py-1 md:py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
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
    </nav>
  );
};

export default FloatingNav;
