"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";
import { Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation"; // Import useRouter for navigation

type Language = "en" | "th";

export default function InLAB() {
  const [language, setLanguage] = useState<Language>("en");
  // State to manage hover for the Discord button
  const [isDiscordHovered, setIsDiscordHovered] = useState(false);
  const router = useRouter(); // Initialize useRouter
  const pathname = usePathname(); // Get the current pathname

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage whenever it changes
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const translations = {
    en: {
      department: "INLAB",
      subtitle: "Outreach division",
      section: "ISV Andøya Expedition",
      meetTalent: "- Meet Our Specialists -",
      follow: "Follow",
      joinCommunity: "Join Our Community",
      communityDescription: "Get in touch with our inLAB specialist",
      joinDiscord: "Join Discord",
      // Navigation items
      coreTeam: "CORE TEAM",
      intern: "INTERN",
      aboutUs: "ABOUT US",
      coreTeamTitle: "CORE TEAM",
      internTeamTitle: "INTERN",
      coreTeamDescription:
        "Meet the pioneer specialists who form the backbone of inLAB, driving innovation and leading our key initiatives.",
      internTeamDescription:
        "Discover our talented interns, bringing fresh perspectives and new experience to everyone.",
    },
    th: {
      department: "INLAB",
      subtitle: "Outreach division",
      section: "ISV Andøya Expedition",
      meetTalent: "พบกับพรสวรรค์ของเรา",
      follow: "ติดตาม",
      joinCommunity: "เข้าร่วมห้องปฏิบัติการของพวกเรา",
      communityDescription:
        "ร่วมพูดคุยกับเหล่า Specialist ใน inLAB อย่างใกล้ชิดได้ที่นี่",
      joinDiscord: "เข้าร่วม Discord",
      // Navigation items
      coreTeam: "CORE TEAM",
      intern: "INTERN",
      aboutUs: "ABOUT US",
      coreTeamTitle: "CORE TEAM",
      internTeamTitle: "INTERN",
      coreTeamDescription:
        "พบกับเหล่า Specialist ผู้ก่อตั้ง inLAB กลุ่มวีทูปเบอร์สายวิทย์ที่เต็มเปี่ยมไปด้วยงานวิจัยและ Content สุดจะหาทำ",
      internTeamDescription:
        "พบกับเหล่าน้องใหม่ประจำ inLAB ที่มาพร้อมความสามารถและประสบการณ์อันเต็มเปี่ยม ที่คุณไม่ควรพลาด!",
    },
  };

  const navigationItems = [
    {
      title: { en: "OUR TEAM", th: "OUR TEAM" },
      members: { en: "SCIENCE", th: "SCIENCE" },
      code: "CT-01",
      link: "team",
    },
    {
      title: { en: "ARTICLE", th: "ARTICLE" },
      members: { en: "RESEARCH", th: "RESEARCH" },
      code: "AR-02",
      link: "article",
    },
    {
      title: { en: "ABOUT US", th: "ABOUT US" },
      members: { en: "INFORMATION", th: "INFORMATION" },
      code: "AB-03",
      link: "about-us",
    },
  ];

  const t = translations[language];

  // Updated handleNavClick to use Next.js router
  const handleNavClick = (section: string) => {
    router.push(`/${section}`);
  };

  // Function to prevent right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Function to prevent image dragging
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600">
      {/* Secret Button (hidden with CSS) */}
      <div className="fixed bottom-6 right-6 z-50" style={{ display: "none" }}>
        <Button
          size="sm"
          variant="outline"
          className="bg-black/70 text-orange-300 border-orange-400 hover:bg-orange-500 hover:text-white font-mono shadow-lg"
          onClick={() => router.push("/tunnel/step1")}
        >
          Secret
        </Button>
      </div>
      {/* Language Toggle and Logout Button */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <LogoutButton className="bg-white/20 border-white/30 text-black hover:bg-white/30" />
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleLanguageChange(language === "en" ? "th" : "en")}
          className="bg-white/20 border-white/30 text-black hover:bg-white/30"
        >
          <Globe className="w-4 h-4 mr-2" />
          {language === "en" ? "TH" : "EN"}
        </Button>
      </div>

      {/* Header Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Make the logo and text group clickable */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                router.push("/");
              }}
              className="flex items-center gap-2 sm:mb-5 cursor-pointer"
            >
              <Image
                src="/img/INLABLOGO.png" // Assuming you have a separate logo-only file
                alt="InLAB Logo"
                width={68} // Adjust size as needed
                height={68} // Adjust size as needed
                className="object-contain"
              />
              <div className="flex flex-col">
                <h1
                  className={`text-6xl lg:text-8xl text-black tracking-tight font-staatliches`}
                >
                  {t.department}
                </h1>
                <p className="text-xl text-black/80 font-medium font-staatliches -mt-2 lg:-mt-4">
                  {t.subtitle}
                </p>
              </div>
            </a>

            {/* Center: Navigation - Left Aligned Text */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 text-black mb-2 lg:mb-0">
              {navigationItems.map((item, index) => {
                const isActive = pathname === `/${item.link}`;
                return (
                  <div
                    key={index}
                    className={`text-left cursor-pointer transition-colors duration-300 p-2 rounded-lg 
                      ${isActive ? "bg-white shadow-md" : "hover:opacity-80"}`}
                    onClick={() => handleNavClick(item.link)}
                  >
                    <div className="text-lg md:text-2xl lg:text-3xl mb-1 font-staatliches">
                      {item.title[language]}
                    </div>
                    <div className="text-xs lg:text-sm opacity-80 font-mono">
                      {item.members[language]}
                    </div>
                    <div className="text-xs opacity-60 font-mono">
                      {item.code}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Section Info and Logo */}
            <div className="hidden lg:block">
              <div className="text-right text-black flex items-center gap-4">
                <div>
                  <div className="text-4xl font-staatliches">{t.section}</div>
                  <div className="text-xl font-mono">Sun Synchronous Orbit</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Black bar */}
        <div className="h-4 bg-black"></div>
      </div>

      {/* Hero Quote Section - With background image */}
      <div
        className="relative py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        style={{
          backgroundImage: "url('/img/bg/working_space.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onContextMenu={handleContextMenu}
      >
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-shadow-md font-bold text-white font-mono leading-tight">
            Not a corpo, not a group
            <br />
            Just a bunch of science VTuber
            <br />
            "together strong"
          </h1>
        </div>
      </div>

      {/* Black bar */}
      <div className="h-4 bg-black"></div>

      {/* Team Information Section */}
      <div className="bg-white flex-grow">
        <div className="w-full">
          {/* Core Team Section */}
          <div className="mb-0 bg-orange-400">
            <div className="flex flex-col lg:flex-row min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] xl:min-h-[70vh]">
              {/* Left side - Text content */}
              <div className="lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20">
                <a
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-staatliches text-gray-800 mb-4 sm:mb-6 md:mb-8 text-left underline"
                  href="/core-team"
                >
                  {t.coreTeamTitle}
                </a>
                <div className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px] lg:min-h-[140px] xl:min-h-[160px]">
                  <p
                    className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 text-left leading-relaxed whitespace-pre-wrap ${
                      language === "th" ? "font-kanit" : "font-mono"
                    }`}
                  >
                    {t.coreTeamDescription}
                  </p>
                </div>
              </div>
              {/* Right side - Image */}

              <div className="lg:w-3/4 relative overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto">
                <div className="flex justify-center items-center h-full">
  <div
    style={{
      display: "inline-block",
      border: "8px solid",
      borderImage:
        "repeating-linear-gradient(45deg, black 0, black 10px, orange 10px, orange 20px) 8",
      borderRadius: "0.5rem",
      boxSizing: "border-box",
      background: "black", // optional: for contrast behind transparent images
      maxWidth: "100%",
      maxHeight: "100%",
    }}
  >
    <Image
      src="/img/Team/inLAB_Core.png"
      alt="Core Team"
      width={800} // set your image width
      height={500} // set your image height
      className="object-contain object-center"
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      style={{
        display: "block",
        borderRadius: "0.5rem",
        maxWidth: "100%",
        height: "auto",
      }}
    />
  </div>
</div>
              </div>
            </div>
          </div>

          <div
            className="h-3 w-full bg-black" // Added w-full to ensure it spans the whole width
            style={{
              borderImage:
                "repeating-linear-gradient(90deg, black 0, black 10px, orange 10px, orange 20px) 8",
              borderWidth: "3px 0 3px 0", // Apply border to top and botto
              borderStyle: "solid",
            }}
          ></div>

          {/* Intern Team Section */}
          <div className="mb-0 bg-gray-800">
            <div className="flex flex-col lg:flex-row min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] xl:min-h-[70vh]">
              {/* Left side - Image */}
              <div className="lg:w-3/4 relative order-2 lg:order-1 overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto flex items-center justify-center">
                <div className="flex justify-center items-center h-full">
  <div
    style={{
      display: "inline-block",
      border: "8px solid",
      borderImage:
        "repeating-linear-gradient(45deg, black 0, black 10px, orange 10px, orange 20px) 8",
      borderRadius: "0.5rem",
      boxSizing: "border-box",
      background: "black",
      maxWidth: "100%",
      maxHeight: "100%",
    }}
  >
    <Image
      src="/img/Team/inLAB_Intern.png"
      alt="Intern Team"
      width={800} // set your image width
      height={500} // set your image height
      className="object-contain object-center"
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      style={{
        display: "block",
        borderRadius: "0.5rem",
        maxWidth: "100%",
        height: "auto",
      }}
    />
  </div>
</div>
          
              </div>
              {/* Right side - Text content */}
              <div className="lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 order-1 lg:order-2">
                <a
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-staatliches text-orange-400 mb-4 sm:mb-6 md:mb-8 text-right underline"
                  href="/intern"
                >
                  {t.internTeamTitle}
                </a>
                <div className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px] lg:min-h-[140px] xl:min-h-[160px]">
                  <p
                    className={`text-sm sm:text-base md:text-lg lg:text-xl text-orange-500 text-right leading-relaxed whitespace-pre-wrap ${
                      language === "th" ? "font-kanit" : "font-mono"
                    }`}
                  >
                    {t.internTeamDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-3 w-full bg-black" // Added w-full to ensure it spans the whole width
        style={{
          borderImage:
            "repeating-linear-gradient(90deg, black 0, black 10px, orange 10px, orange 20px) 8",
          borderWidth: "3px 0 3px 0", // Apply border to top and botto
          borderStyle: "solid",
        }}
      ></div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3
            className={`text-2xl font-bold mb-4 ${
              language === "th" ? "font-kanit" : "font-mono"
            }`}
          >
            {t.joinCommunity}
          </h3>
          <p
            className={`text-gray-400 mb-6 max-w-2xl mx-auto ${
              language === "th" ? "font-kanit" : "font-mono"
            }`}
          >
            {t.communityDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/yK6bxAFx7F" // Set the Discord invite link here
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer" // Recommended for security with target="_blank"
              onMouseEnter={() => setIsDiscordHovered(true)} // Keep hover effect on anchor
              onMouseLeave={() => setIsDiscordHovered(false)} // Keep hover effect on anchor
            >
              <Button
                size="lg"
                variant="outline"
                className={`bg-indigo-500 border-white text-white hover:bg-white hover:text-black cursor-pointer ${
                  language === "th" ? "font-kanit" : "font-mono"
                }`}
              >
                <Image
                  src={
                    isDiscordHovered
                      ? "/img/discord_black.png"
                      : "/img/discord.png"
                  }
                  alt="Discord Icon"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                {t.joinDiscord}
              </Button>
            </a>
          </div>
        </div>
        <div className="text-center pt-8 text-sm text-orange-300">
          © 2025 InLAB, Outreach division.
        </div>
      </div>
    </div>
  );
}
