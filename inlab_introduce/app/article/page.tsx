"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Youtube, Twitter, Twitch, Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation"; // Import useRouter and usePathname

type Language = "en" | "th";

export default function AboutUs() {
  const [language, setLanguage] = useState<Language>("en");
  const [isDiscordHovered, setIsDiscordHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname

  const translations = {
    en: {
      department: "InLAB",
      subtitle: "Outreach division",
      section: "ISV Andøya Expedition",
      meetTalent: "Meet Our Talent",
      description:
        "Discover the exceptional inLAB specialists who drive our outreach initiatives, each contributing distinctive insights and specialized experience to elevate your experience.",
      follow: "Follow",
      joinCommunity: "Join Our Community",
      communityDescription: "Get in touch with our inLAB specialist",
      joinDiscord: "Join Discord",
      coreTeam: "CORE TEAM",
      intern: "INTERN",
      aboutUs: "ABOUT US",
      aboutDescription: `inLAB is not vtuber agency or entertainment group, and have no external financial backing. inLAB is just a group of science vtuber friend who doing niche science content coming together to support each other and roleplay as a vtuber group under strong CI for easy discovery by the follower.\n\n
                              Our core idea is making friend, support each other, show the interesting and living side of science, and make boring science class a crime.`,
    },
    th: {
      department: "InLAB",
      subtitle: "Outreach division",
      section: "ISV Andøya Expedition",
      meetTalent: "พบกับพรสวรรค์ของเรา",
      description:
        "ค้นพบผู้เชี่ยวชาญที่หลากหลายในแผนกเสมือนจริงของเรา แต่ละคนนำทักษะและความบันเทิงที่ไม่เหมือนใครมาสู่ชุมชนของเรา",
      follow: "ติดตาม",
      joinCommunity: "เข้าร่วมห้องปฏิบัติการของพวกเรา",
      communityDescription:
        "ร่วมพูดคุยกับเหล่า Specialist ใน inLAB อย่างใกล้ชิดได้ที่นี่",
      joinDiscord: "เข้าร่วม Discord",
      coreTeam: "ทีมหลัก",
      intern: "นักศึกษาฝึกงาน",
      aboutUs: "เกี่ยวกับเรา",
      aboutDescription: `inLAB ไม่ใช่สังกัด VTuber (และไม่มีการแสวงหาผลกำไรแต่อย่างใด) พวกเราเป็นเพียงกลุ่มเพื่อน VTuber สายวิทยาศาสตร์ที่มารวมตัวกันเพื่อสร้าง Content ทางด้านวิทยาศาสตร์โดยเฉพาะและ Support ซึ่งกันและกัน\n\n
                        และนอกเหนือจากนี้ พวกเราก็มีเป้าหมายในการแสดงด้านของวิทยาศาสตร์ที่คนทั่วไปไม่อาจได้พบเห็นบ่อย เพราะเรื่องวิทยาศาสตร์ ก็เป็นเรื่องสนุก(และเป็นภัย)ได้ยังไงล่ะ?!`,
    },
  };

  const navigationItems = [
    {
      title: { en: "CORE TEAM", th: "CORE TEAM" },
      members: { en: "SCIENCE", th: "SCIENCE" },
      code: "CT-01",
      link: "core-team",
    },
    {
      title: { en: "INTERN", th: "INTERN" },
      members: { en: "RESEARCH", th: "RESEARCH" },
      code: "IN-02",
      link: "intern",
    },
    {
      title: { en: "ABOUT US", th: "ABOUT US" },
      members: { en: "INFORMATION", th: "INFORMATION" },
      code: "AB-03",
      link: "about-us",
    },
  ];

  const t = translations[language];

  const handleNavClick = (section: string) => {
    router.push(`/${section}`); // Use router.push for navigation
  };

  // Function to prevent right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === "en" ? "th" : "en")}
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
                <h1 className="text-6xl lg:text-8xl text-black tracking-tight font-staatliches">
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
                const isActive = pathname === `/${item.link}`; // Check if current path matches item link
                return (
                  <div
                    key={index}
                    className={`text-left cursor-pointer transition-colors duration-300 p-2 rounded-lg 
                      ${isActive ? "bg-white shadow-md" : "hover:opacity-80"}`} // Apply active styles
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-shadow-md text-white font-staatliches leading-tight">
            ABOUT US
          </h1>
        </div>
      </div>

      {/* Black bar */}
      <div className="h-4 bg-black"></div>

      {/* Members Section */}
      <div className="bg-white flex-grow">
        <div className="flex flex-col lg:flex-row min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] xl:min-h-[70vh]">
          {/* Left side - Image */}
          <div className="lg:w-5/8 relative order-2 lg:order-1 overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto">
            <Image
              src="/img/INLAB_ABOUT_US.png"
              alt="Intern Team"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              onContextMenu={handleContextMenu} // Prevents right-click
              onDragStart={handleDragStart} // Prevents dragging
            />
          </div>
          {/* Right side - Text content */}
          <div
            className="flex flex-col justify-center order-1 lg:order-2 border-l-16 border-black"
            style={{
              borderImage:
                "repeating-linear-gradient(45deg, black 0, black 10px, orange 10px, orange 20px) 8",
            }}
          />
          <div className="bg-gray-800 lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-staatliches text-orange-400 mb-4 sm:mb-6 md:mb-8 text-right underline">
              inLAB
            </h2>
            <div className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px] lg:min-h-[140px] xl:min-h-[160px]">
              <p
                className={`text-xs sm:text-sm md:text-base lg:text-lg text-orange-500 text-right leading-relaxed whitespace-pre-wrap ${
                  language === "th" ? "font-kanit" : "font-mono"
                }`}
              >
                {t.aboutDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-4 bg-black"></div>

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
