"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Youtube, Twitch, X, Globe, ExternalLink } from "lucide-react";
import XIcon from "@mui/icons-material/X";
import { useRouter, usePathname } from "next/navigation";

type Language = "en" | "th";

interface Member {
  name: { en: string; th: string };
  department: { en: string; th: string };
  code: string;
  specialty: { en: string; th: string };
  avatar: string;
  logo: string;
  model: string;
  description: { en: string; th: string };
  detailedDescription?: { en: string; th: string };
  socials: { youtube: string; twitter: string; twitch: string };
  birthday: { en: string; th: string };
  fanmark: string;
  achievements?: { en: string[]; th: string[] };
}

export default function CoreTeam() {
  const [language, setLanguage] = useState<Language>("en");
  const [isDiscordHovered, setIsDiscordHovered] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const translations = {
    en: {
      department: "InLAB",
      subtitle: "Outreach division",
      section: "ISV Andøya Expedition",
      meetTalent: "Meet Our Talent",
      description:
        "Discover our talented interns, bringing fresh perspectives and new experience to everyone.",
      follow: "Follow",
      joinCommunity: "Join Our Community",
      communityDescription: "Get in touch with our inLAB specialist",
      joinDiscord: "Join Discord",
      coreTeam: "CORE TEAM",
      intern: "INTERN",
      aboutUs: "ABOUT US",
      viewProfile: "View Profile",
      birthday: "Birthday",
      fanmark: "Fanmark",
      achievements: "Achievements",
      socialLinks: "Social Links",
      specialty: "Specialty",
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
      viewProfile: "ดูโปรไฟล์",
      birthday: "วันเกิด",
      achievements: "ความสำเร็จ",
      socialLinks: "ลิงก์โซเชียล",
      specialty: "ความเชี่ยวชาญ",
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
      name: { en: "KANZAKI AITO", th: "อาเรีย โนวา" },
      department: { en: "COMPUTER SCIENCE", th: "เกมมิ่ง" },
      code: "A1T-IC",
      specialty: { en: "FPS & Strategy", th: "FPS และกลยุทธ์" },
      avatar: "/img/inLAB_Intern/Aito.png",
      logo: "",
      model: "",
      description: {
        en: "Elite gaming specialist with expertise in competitive FPS and real-time strategy games.",
        th: "ผู้เชี่ยวชาญด้านเกมระดับสูงที่มีความเชี่ยว เจนในเกม FPS แข่งขันและเกมกลยุทธ์แบบเรียลไทม์",
      },
      detailedDescription: {
        en: "A professional esports player turned content creator, Selma brings years of competitive gaming experience to the team. With tournament victories in multiple FPS titles and strategic gameplay analysis, she provides educational content for aspiring gamers while entertaining audiences with high-level gameplay demonstrations.",
        th: "นักกีฬาอีสปอร์ตมืออาชีพที่หันมาเป็นผู้สร้างเนื้อหา เซลม่านำประสบการณ์การเล่นเกมแข่งขันหลายปีมาสู่ทีม ด้วยชัยชนะในทัวร์นาเมนต์เกม FPS หลายรายการและการวิเคราะห์เกมเพลย์เชิงกลยุทธ์",
      },
      birthday: {
        en: "9th August",
        th: "9 สิงหาคม",
      },
      fanmark: "",
      achievements: {
        en: [
          "Regional FPS Champion 2023",
          "Top 10 Global Ranking",
          "100K+ Followers",
          "Gaming Award Winner",
        ],
        th: [
          "แชมป์ FPS ระดับภูมิภาค 2023",
          "อันดับ 10 อันดับโลก",
          "ผู้ติดตาม 100K+",
          "ผู้ชนะรางวัลเกมมิ่ง",
        ],
      },
      socials: { youtube: "#", twitter: "#", twitch: "#" },
    },
    {
      name: { en: "LYRIC URSAE", th: "ลูน่า เทค" },
      department: { en: "BIOLOGY", th: "วิทยาศาสตร์" },
      code: "S2R-B",
      specialty: { en: "Tech Reviews", th: "รีวิวเทคโนโลยี" },
      avatar: "",
      logo: "",
      model: "",
      description: {
        en: "Captivating young snake researcher who blends science and flavor to bring people together.",
        th: "งูสาวนักวิจัย ผู้ใช้วิทยาศาสตร์และรสชาติเป็นสื่อในการเชื่อมโยงผู้คนเข้าด้วยกัน ภายใต้ความเชื่อว่าอาหารคือพื้นที่แห่งการทดลองและการค้นพบ",
      },
      detailedDescription: {
        en: "Luna is our resident tech expert with a PhD in Computer Science and years of experience in hardware development. She specializes in making complex technology accessible to everyone through detailed reviews, tutorials, and cutting-edge research presentations.",
        th: "ลูน่าเป็นผู้เชี่ยวชาญด้านเทคโนโลยีประจำของเรา ที่มีปริญญาเอกด้านวิทยาการคอมพิวเตอร์และประสบการณ์หลายปีในการพัฒนาฮาร์ดแวร์",
      },
      birthday: {
        en: "",
        th: "",
      },
      fanmark: "",
      achievements: {
        en: [
          "PhD in Computer Science",
          "Published 15+ Research Papers",
          "Tech Innovation Award",
          "Industry Speaker",
        ],
        th: [
          "ปริญญาเอกวิทยาการคอมพิวเตอร์",
          "ตีพิมพ์งานวิจัย 15+ ฉบับ",
          "รางวัลนวัตกรรมเทคโนโลยี",
          "วิทยากรในอุตสาหกรรม",
        ],
      },
      socials: { youtube: "#", twitter: "#", twitch: "#" },
    },
    {
      name: { en: "ARITHMOS", th: "ลูน่า เทค" },
      department: { en: "ACTUARY", th: "วิทยาศาสตร์" },
      code: "A3M-IA",
      specialty: {
        en: "Plant-based food, Drinking, Digital marketing",
        th: "รีวิวเทคโนโลยี",
      },
      avatar: "",
      logo: "/img/Logo/Sanwhann.PNG",
      model: "/img/Model/Sanwhann.png",
      description: {
        en: "Captivating young snake researcher who blends science and flavor to bring people together.",
        th: "งูสาวนักวิจัย ผู้ใช้วิทยาศาสตร์และรสชาติเป็นสื่อในการเชื่อมโยงผู้คนเข้าด้วยกัน ภายใต้ความเชื่อว่าอาหารคือพื้นที่แห่งการทดลองและการค้นพบ",
      },
      detailedDescription: {
        en: "A young woman with an emerald snake tail, living in a wooden house in the middle of a vast forest. Hidden behind a bookshelf is her secret laboratory, where she experiments with new recipes.\n\nShe believes that food is a space for experimentation and discovery. Throughout her time in this forest home, she often brews warm tea and serves freshly invented snacks to share with visitors who stop by to rest and exchange stories.\n\nCurrently, she is joining the ISV Andøya Expedition crew to find more ingredients and new recipe",
        th: "ลูน่าเป็นผู้เชี่ยวชาญด้านเทคโนโลยีประจำของเรา ที่มีปริญญาเอกด้านวิทยาการคอมพิวเตอร์และประสบการณ์หลายปีในการพัฒนาฮาร์ดแวร์",
      },
      birthday: {
        en: "9th August",
        th: "9 สิงหาคม",
      },
      fanmark: "🐍🤎✨",
      achievements: {
        en: [
          "PhD in Computer Science",
          "Published 15+ Research Papers",
          "Tech Innovation Award",
          "Industry Speaker",
        ],
        th: [
          "ปริญญาเอกวิทยาการคอมพิวเตอร์",
          "ตีพิมพ์งานวิจัย 15+ ฉบับ",
          "รางวัลนวัตกรรมเทคโนโลยี",
          "วิทยากรในอุตสาหกรรม",
        ],
      },
      socials: { youtube: "#", twitter: "#", twitch: "" },
    },
  ];

  const t = translations[language];

  const handleNavClick = (section: string) => {
    router.push(`/${section}`);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
    setIsDialogOpen(true);
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
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
              className="flex items-center gap-2 sm:mb-5 cursor-pointer"
            >
              <Image
                src="/img/INLABLOGO.png"
                alt="InLAB Logo"
                width={68}
                height={68}
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

        <div className="h-4 bg-black"></div>
      </div>

      {/* Hero Quote Section */}
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
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-shadow-md text-white font-staatliches leading-tight">
            INTERN
          </h1>
        </div>
      </div>

      <div className="h-4 bg-black"></div>

      {/* Members Section */}
      <div className="bg-white flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-mono">
              {t.description}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 py-0"
                onClick={() => handleMemberClick(member)}
              >
                <div className="relative w-full">
                  <Image
                    src={member.avatar || "/img/placeholder.png"}
                    alt={member.name[language]}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
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

                  <p className="text-sm text-gray-600 mb-4 font-mono">
                    {member.description[language]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Member Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-0">
          {selectedMember && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Left Section: Orange background */}
              <div className="md:col-span-1 flex flex-col items-center justify-start bg-orange-400 py-10 px-6 rounded-t-lg md:rounded-t-none md:rounded-l-lg">
                <Image
                  src={selectedMember.model || "/placeholder.svg"}
                  alt={selectedMember.name[language]}
                  width={180}
                  height={180}
                  className="rounded-lg object-cover mb-4 shadow-lg"
                />
                <h3 className="text-lg font-bold text-gray-900 font-mono">
                  {selectedMember.name[language]}
                </h3>
                <Badge
                  variant="outline"
                  className="text-orange-400 border-orange-400 font-mono bg-black whitespace-nowrap mb-2"
                >
                  {selectedMember.department[language]}
                </Badge>
                <h4 className="text-sm font-semibold text-gray-700 font-mono mb-2">
                  Social Links
                </h4>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 font-mono cursor-pointer transition-colors duration-200 hover:bg-red-500 hover:text-white hover:border-red-600"
                    onClick={() =>
                      window.open(selectedMember.socials.youtube, "_blank")
                    }
                  >
                    <Youtube className="w-4 h-4" />
                    YouTube
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 font-mono cursor-pointer transition-colors duration-200 hover:bg-black hover:text-white hover:border-black"
                    onClick={() =>
                      window.open(selectedMember.socials.twitter, "_blank")
                    }
                  >
                    <XIcon className="w-2 h-2" />X
                  </Button>
                  {selectedMember.socials.twitch &&
                    selectedMember.socials.twitch.trim() !== "" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2 font-mono cursor-pointer transition-colors duration-200 hover:bg-orange-500 hover:text-white hover:border-orange-600"
                        onClick={() =>
                          window.open(selectedMember.socials.twitch, "_blank")
                        }
                      >
                        <Twitch className="w-4 h-4" />
                        Twitch
                      </Button>
                    )}
                </div>
              </div>

              {/* Right Section: Black background, white text */}
              <div className="md:col-span-2 bg-black text-white py-10 px-4 md:px-10 flex flex-col rounded-b-lg md:rounded-b-none md:rounded-r-lg">
                <div className="flex justify-center items-center mb-4">
                  <Image
                    src={selectedMember.logo || "/img/placeholder.png"}
                    alt={selectedMember.name[language]}
                    width={200}
                    height={200}
                    className="w-auto h-auto object-cover"
                  />
                </div>
                <div className="mb-6">
                  <h4 className="bg-orange-400 rounded-lg text-center text-lg font-bold text-white mb-3 font-mono">
                    Description
                  </h4>
                  <p className="text-gray-200 leading-relaxed font-mono text-justify whitespace-pre-wrap">
                    {selectedMember.detailedDescription?.[language] ||
                      selectedMember.description[language]}
                  </p>
                </div>
                {/* Area of Interest Section */}
                <div className="mb-6">
                  <h4 className="bg-orange-400 rounded-lg text-center text-lg font-bold text-white mb-3 font-mono">
                    Area of Interest
                  </h4>
                  <p className="text-gray-200 leading-relaxed font-mono text-center whitespace-pre-wrap">
                    {selectedMember.specialty[language]}
                  </p>
                </div>
                <div className="flex gap-6 mb-6">
                  {/* Birthday Section */}
                  {selectedMember.birthday &&
                    selectedMember.birthday[language] && (
                      <div className="flex-1">
                        <h4 className="bg-orange-400 rounded-lg text-center text-lg font-bold text-white mb-3 font-mono">
                          Birthday
                        </h4>
                        <p className="text-gray-200 leading-relaxed font-mono text-center">
                          {selectedMember.birthday[language]}
                        </p>
                      </div>
                    )}
                  {/* Fanmark Section */}
                  <div className="flex-1">
                    <h4 className="bg-orange-400 rounded-lg text-center text-lg font-bold text-white mb-3 font-mono">
                      Fanmark
                    </h4>
                    <p className="text-gray-200 leading-relaxed font-mono text-center">
                      {selectedMember.fanmark}
                    </p>
                  </div>
                </div>
                {/* Achievements */}
                {selectedMember.achievements && (
                  <div>
                    <h4 className="bg-orange-400 rounded-lg text-center text-lg font-bold text-white mb-3 font-mono">
                      Achievements
                    </h4>
                    <ul className="space-y-2">
                      {selectedMember.achievements[language].map(
                        (achievement, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 font-mono text-gray-200"
                          >
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            {achievement}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
              href="https://discord.gg/yK6bxAFx7F"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsDiscordHovered(true)}
              onMouseLeave={() => setIsDiscordHovered(false)}
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
        <div className="text-center pt-8 text-sm text-orange-300">
          © 2025 InLAB, Outreach division.
        </div>
      </div>
    </div>
  );
}
