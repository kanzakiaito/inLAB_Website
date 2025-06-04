"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Youtube, Twitter, Twitch, Globe } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

type Language = "en" | "th";

interface Member {
  name: { en: string; th: string };
  department: { en: string; th: string };
  code: string;
  specialty: { en: string; th: string };
  avatar: string;
  description: { en: string; th: string };
  socials: { youtube: string; twitter: string; twitch: string };
}

export default function VTuberDepartment() {
  const [language, setLanguage] = useState<Language>("en");
  // State to manage hover for the Discord button
  const [isDiscordHovered, setIsDiscordHovered] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const translations = {
    en: {
      department: "InLAB",
      subtitle: "Outreach division",
      section: "ISV Andøya Expedition",
      meetTalent: "- Meet Our Specialists -",
      description:
        "Discover the exceptional inLAB specialists who drive our outreach initiatives, each contributing distinctive insights and specialized experience to elevate your experience.",
      follow: "Follow",
      joinCommunity: "Join Our Community",
      communityDescription: "Get in touch with our inLAB specialist",
      joinDiscord: "Join Discord",
      // Navigation items
      coreTeam: "CORE TEAM",
      intern: "INTERN",
      aboutUs: "ABOUT US",
      coreTeamTitle: "CORE TEAM",
      internTeamTitle: "INTERN TEAM",
      coreTeamDescription:
        "Meet the pioneer specialists who form the backbone of inLAB, driving innovation and leading our key initiatives.",
      internTeamDescription:
        "Discover our talented interns, bringing fresh perspectives and new experience to everyone.",
    },
    th: {
      department: "InLAB",
      subtitle: "ส่วนการประชาสัมพันธ์",
      section: "ส่วน",
      meetTalent: "พบกับพรสวรรค์ของเรา",
      description:
        "ค้นพบผู้เชี่ยวชาญที่หลากหลายในแผนกเสมือนจริงของเรา แต่ละคนนำทักษะและความบันเทิงที่ไม่เหมือนใครมาสู่ชุมชนของเรา",
      follow: "ติดตาม",
      joinCommunity: "เข้าร่วมชุมชนของเรา",
      communityDescription:
        "รับข้อมูลอัปเดตล่าสุดเกี่ยวกับสตรีม กิจกรรม และประกาศจากแผนก VTuber ที่มีพรสวรรค์ของเรา",
      joinDiscord: "เข้าร่วม Discord",
      // Navigation items
      coreTeam: "ทีมหลัก",
      intern: "นักศึกษาฝึกงาน",
      aboutUs: "เกี่ยวกับเรา",
      coreTeamTitle: "ทีมหลัก",
      internTeamTitle: "ทีมนักศึกษาฝึกงาน",
      coreTeamDescription:
        "พบกับบุคคลากรหลักที่ขับเคลื่อนองค์กรของเรา สร้างสรรค์นวัตกรรม และเป็นผู้นำในโครงการสำคัญของเรา",
      internTeamDescription:
        "พบกับนักศึกษาฝึกงานที่มีความสามารถของเรา ผู้ซึ่งนำเสนอแนวคิดใหม่ๆ และมีส่วนร่วมอย่างแข็งขันในโครงการและการวิจัยของเรา",
    },
  };

  const navigationItems = [
    {
      title: { en: "CORE TEAM", th: "ทีมหลัก" },
      members: { en: "SCIENCE", th: "วิศวกรรม" },
      code: "CT-01",
      link: "core-team",
    },
    {
      title: { en: "INTERN", th: "นักศึกษาฝึกงาน" },
      members: { en: "RESEARCH", th: "วิจัย" },
      code: "IN-02",
      link: "intern",
    },
    {
      title: { en: "ABOUT US", th: "เกี่ยวกับเรา" },
      members: { en: "INFORMATION", th: "ข้อมูล" },
      code: "AB-03",
      link: "about-us",
    },
  ];

  // Data for the Intern Team members
  const internTeamMembers = [
    {
      name: { en: "Alex Chen", th: "อเล็กซ์ เฉิน" },
      role: { en: "Research Intern", th: "นักศึกษาฝึกงานวิจัย" },
      avatar: "/img/team/alex_chen.jpg", // Replace with your image path
    },
    {
      name: { en: "Maria Garcia", th: "มาเรีย กาเซีย" },
      role: { en: "Marketing Intern", th: "นักศึกษาฝึกงานการตลาด" },
      avatar: "/img/team/maria_garcia.jpg", // Replace with your image path
    },
    {
      name: { en: "Kenji Tanaka", th: "เคนจิ ทานากะ" },
      role: { en: "Development Intern", th: "นักศึกษาฝึกงานพัฒนา" },
      avatar: "/img/team/kenji_tanaka.jpg", // Replace with your image path
    },
    // Add more intern team members as needed
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
          {language === "en" ? "ไทย" : "EN"}
        </Button>
      </div>

      {/* Header Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center gap-2 sm:mb-5">
              {" "}
              {/* Added flex and gap */}
              <Image
                src="/img/INLABLOGO.png" // Assuming you have a separate logo-only file
                alt="InLAB Logo"
                width={68} // Adjust size as needed
                height={68} // Adjust size as needed
                className="object-contain"
              />
              <div className="flex flex-col">
                {" "}
                {/* This div will hold InLAB and Outreach vertically */}
                <h1
                  className="text-6xl lg:text-8xl text-black tracking-tight font-staatliches" // Added leading-none
                >
                  {t.department}
                </h1>
                <p className="text-xl text-black/80 font-medium font-staatliches -mt-2 lg:-mt-4">
                  {" "}
                  {/* Adjusted negative margin-top */}
                  {t.subtitle}
                </p>
              </div>
            </div>

            {/* Center: Navigation - Left Aligned Text */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 text-black mb-2 lg:mb-0">
              {navigationItems.map((item, index) => (
                <div
                  key={index}
                  className="text-left cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleNavClick(item.link)}
                >
                  {/* Increased font size for CORE TEAM, INTERN, ABOUT US */}
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
              ))}
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
            <div className="flex flex-col lg:flex-row min-h-[60vh]">
              {/* Left side - Text content */}
              <div className="lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-16">
                <h2 className="text-4xl lg:text-6xl font-staatliches text-gray-800 mb-8 text-left">
                  {t.coreTeamTitle}
                </h2>
                <p className="text-lg text-gray-700 text-left leading-relaxed">
                  {t.coreTeamDescription}
                </p>
              </div>
              {/* Right side - Image */}
              <div
                className="border-l-10 border-black"
                style={{
                  borderImage:
                    "repeating-linear-gradient(45deg, black 0, black 10px, orange 10px, orange 20px) 8",
                }}
              ></div>
              <div className="lg:w-1/2 relative overflow-hidden">
                <Image
                  src="/img/Team/inLAB_Core.png"
                  alt="Core Team"
                  fill
                  className=""
                  onContextMenu={handleContextMenu}
                />
              </div>
            </div>
          </div>

          <div className="h-2 bg-black"></div>

          {/* Intern Team Section */}
          <div className="mb-0 bg-gray-800">
            <div className="flex flex-col lg:flex-row min-h-[60vh]">
              {/* Left side - Image */}
              <div className="lg:w-1/2 relative order-2 lg:order-1 overflow-hidden">
                <Image
                  src="/img/Team/inLAB_Intern.png"
                  alt="Intern Team"
                  fill
                  className=""
                  onContextMenu={handleContextMenu}
                />
              </div>
              {/* Right side - Text content */}
              <div
                className="flex flex-col justify-center order-1 lg:order-2 border-l-10 border-black"
                style={{
                  borderImage:
                    "repeating-linear-gradient(45deg, black 0, black 10px, orange 10px, orange 20px) 8",
                }}
              />
              <div className="lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-16 order-1 lg:order-2">
                <h2 className="text-4xl lg:text-6xl font-staatliches text-orange-400 mb-8 text-right">
                  {t.internTeamTitle}
                </h2>
                <p className="text-lg text-orange-500 text-right leading-relaxed">
                  {t.internTeamDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 font-mono">
            {t.joinCommunity}
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto font-mono">
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
                className="bg-indigo-500 border-white text-white hover:bg-white hover:text-black font-mono cursor-pointer"
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
      </div>
    </div>
  );
}
