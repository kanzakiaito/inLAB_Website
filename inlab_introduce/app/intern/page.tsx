"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Youtube,
  Twitter,
  Twitch,
  Globe,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation"; // Import useRouter and usePathname

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

export default function Intern() {
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
      communityDescription:
        "Get in touch with our inLAB specialist",
      joinDiscord: "Join Discord",
      coreTeam: "CORE TEAM",
      intern: "INTERN",
      aboutUs: "ABOUT US",
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
      coreTeam: "ทีมหลัก",
      intern: "นักศึกษาฝึกงาน",
      aboutUs: "เกี่ยวกับเรา",
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

  const members: Member[] = [
    {
      name: { en: "ARIA NOVA", th: "อาเรีย โนวา" },
      department: { en: "GAMING", th: "เกมมิ่ง" },
      code: "G1A-X",
      specialty: { en: "FPS & Strategy", th: "FPS และกลยุทธ์" },
      avatar: "/placeholder.svg?height=200&width=200",
      description: {
        en: "Elite gaming specialist with expertise in competitive FPS and real-time strategy games.",
        th: "ผู้เชี่ยวชาญด้านเกมระดับสูงที่มีความเชี่ยว เจนในเกม FPS แข่งขันและเกมกลยุทธ์แบบเรียลไทม์",
      },
      socials: { youtube: "#", twitter: "#", twitch: "#" },
    },
    {
      name: { en: "LUNA TECH", th: "ลูน่า เทค" },
      department: { en: "SCIENCE", th: "วิทยาศาสตร์" },
      code: "S2B-Y",
      specialty: { en: "Tech Reviews", th: "รีวิวเทคโนโลยี" },
      avatar: "/placeholder.svg?height=200&width=200",
      description: {
        en: "Technology researcher and hardware analyst bringing cutting-edge tech to the virtual world.",
        th: "นักวิจัยเทคโนโลยีและนักวิเคราะห์ฮาร์ดแวร์ที่นำเทคโนโลยีล้ำสมัยมาสู่โลกเสมือนจริง",
      },
      socials: { youtube: "#", twitter: "#", twitch: "#" },
    },
    {
      name: { en: "MELODY HEART", th: "เมโลดี้ ฮาร์ท" },
      department: { en: "MUSIC", th: "ดนตรี" },
      code: "M3C-Z",
      specialty: { en: "Vocal Performance", th: "การแสดงร้องเพลง" },
      avatar: "/placeholder.svg?height=200&width=200",
      description: {
        en: "Professional vocalist and music producer creating original compositions and covers.",
        th: "นักร้องมืออาชีพและโปรดิวเซอร์เพลงที่สร้างสรรค์เพลงต้นฉบับและเพลงคัฟเวอร์",
      },
      socials: { youtube: "#", twitter: "#", twitch: "#" },
    },
    {
      name: { en: "CHEF KIKO", th: "เชฟ คิโกะ" },
      department: { en: "CULINARY", th: "การทำอาหาร" },
      code: "C4D-W",
      specialty: { en: "Cooking Shows", th: "รายการทำอาหาร" },
      avatar: "/placeholder.svg?height=200&width=200",
      description: {
        en: "Master chef bringing delicious recipes and cooking techniques to virtual audiences.",
        th: "เชฟมืออาชีพที่นำสูตรอาหารอร่อยและเทคนิคการทำอาหารมาสู่ผู้ชมในโลกเสมือนจริง",
      },
      socials: { youtube: "#", twitter: "#", twitch: "#" },
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
            {/* Make the logo and text group clickable */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                router.push('/');
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
                  className="text-6xl lg:text-8xl text-black tracking-tight font-staatliches"
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
                const isActive = pathname === `/${item.link}`; // Check if current path matches item link
                return (
                  <div
                    key={index}
                    className={`text-left cursor-pointer transition-colors duration-300 p-2 rounded-lg 
                      ${isActive ? 'bg-white shadow-md' : 'hover:opacity-80'}`} // Apply active styles
                    onClick={() => handleNavClick(item.link)}
                  >
                    <div className="text-lg md:text-2xl lg:text-3xl mb-1 font-staatliches">{item.title[language]}</div>
                    <div className="text-xs lg:text-sm opacity-80 font-mono">{item.members[language]}</div>
                    <div className="text-xs opacity-60 font-mono">{item.code}</div>
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
          backgroundRepeat: "no-repeat"
        }}
        onContextMenu={handleContextMenu}
      >
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-shadow-md font-bold text-white font-mono leading-tight">
            Not a corpo, not a group<br/>
            Just a bunch of science VTuber together strong
          </h1>
        </div>
      </div>

      {/* Black bar */}
        <div className="h-4 bg-black"></div>

      {/* Members Section */}
      <div className="bg-white flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-mono">
              {t.meetTalent}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-mono">
              {t.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name[language]}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-orange-500 hover:bg-orange-600 font-mono">
                    {member.code}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 font-mono">
                      {member.name[language]}
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-orange-600 border-orange-600 font-mono"
                    >
                      {member.department[language]}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 font-mono">
                    {member.description[language]}
                  </p>

                  <div className="flex gap-2 mb-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 font-mono"
                    >
                      <Youtube className="w-4 h-4 mr-1" />
                      YouTube
                    </Button>
                    <Button size="sm" variant="outline" className="font-mono">
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="font-mono">
                      <Twitch className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                  src={isDiscordHovered ? "/img/discord_black.png" : "/img/discord.png"}
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
        <div className="text-center pt-8 text-sm text-orange-300">© 2025 InLAB, Outreach division.</div>
      </div>
    </div>
  );
}