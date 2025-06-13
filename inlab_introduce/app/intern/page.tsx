"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Youtube, Twitch, X, Globe, Mail, Github } from "lucide-react";
import XIcon from "@mui/icons-material/X";
import { useRouter, usePathname } from "next/navigation";

type Language = "en" | "th";

interface Member {
  name: string;
  department: { en: string; th: string };
  code: string;
  AOI: { en: string[]; th: string[] };
  avatar: string;
  logo: string;
  model: string;
  description: { en: string; th: string };
  detailedDescription?: { en: string; th: string };
  socials: { youtube: string; twitter: string; twitch: string; mail: string; github: string; };
  birthday: { en: string; th: string };
  fanmark: string;
  specialize?: { en: string[]; th: string[] };
  quote: { en: string; th: string };
}

export default function InternTeam() {
  const [language, setLanguage] = useState<Language>("en");
  const [isDiscordHovered, setIsDiscordHovered] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSpoilerDialogOpen, setIsSpoilerDialogOpen] = useState(false);

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
      specialize: "specialize",
      socialLinks: "Social Links",
      AOI: "AOI",
    },
    th: {
      department: "InLAB",
      subtitle: "Outreach division",
      section: "ISV Andøya Expedition",
      meetTalent: "พบกับพรสวรรค์ของเรา",
      description:
        "พบกับ Intern ประจำ inLAB\nที่พร้อมมอบความรู้ใหม่ ๆ และประสบการณ์สุดล้ำค่ากับคุณ!",
      follow: "ติดตาม",
      joinCommunity: "เข้าร่วมห้องปฏิบัติการของพวกเรา",
      communityDescription:
        "ร่วมพูดคุยกับเหล่า Specialist ใน inLAB อย่างใกล้ชิดได้ที่นี่",
      joinDiscord: "เข้าร่วม Discord",
      coreTeam: "ทีมหลัก",
      intern: "นักศึกษาฝึกงาน",
      aboutUs: "เกี่ยวกับเรา",
      viewProfile: "ดูโปรไฟล์",
      birthday: "วันเกิด",
      specialize: "ความสำเร็จ",
      socialLinks: "ลิงก์โซเชียล",
      AOI: "ความเชี่ยวชาญ",
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

  const members: Member[] = [
    {
      name: "KANZAKI AITO",
      department: { en: "COMPUTER SCIENCE", th: "COMPUTER SCIENCE" },
      code: "A1T-IC",
      AOI: {
        en: [
          "Software Development (Programming / Full Stack)",
          "Software Engineering (Software Testing / Validation / Quality Assurance)",
          "AI (LLMs / Generative AI / Time Series Analysis / Recommendation System)",
          "Cybersecurity (OWASP / Red Team Pen-test)",
          "Education",
          "Chemistry",
          "Puzzle / Mystery Game",
          "Game Show / Quiz Show"
        ],
        th: [
          "Software Development (Programming / Full Stack)",
          "Software Engineering (Software Testing / Validation / Quality Assurance)",
          "AI (LLMs / Generative AI / Time Series Analysis / Recommendation System)",
          "Cybersecurity (OWASP / Red Team Pen-test)",
          "การศึกษา",
          "เคมี",
          "เกมปริศนา + ปัญหาเชาว์",
          "เกมโชว์/ควิซโชว์"
        ],
      },
      avatar: "/img/inLAB_Intern/Aito.png",
      logo: "/img/Logo/Aito.PNG",
      model: "/img/Model/Aito.png",
      description: {
        en: "A programmer with dark circles under his eyes, who does fortune telling a little bit(?)",
        th: 'โปรแกรมเมอร์ขอบตาดำ เจ้าของร้าน "คอมสารพัดนึก" ที่ดูดวงเป็นนิดหน่อย(?)',
      },
      detailedDescription: {
        en: "A multi-talented computer shop owner and programmer who can craft any technology imaginable.\n\nHis past remains shrouded in mystery. Only his ability to 'predict' seems inconsistent with being a programmer, but he can predict with remarkable accuracy.\n\n\"Want to know my story more? Try predicting it by yourself~\"",
        th: 'โปรแกรมเมอร์หนุ่มขอบตาดำมากความสามารถ เจ้าของร้าน "คอมสารพัดนึก" ที่สามารถรังสรรค์โปรแกรม เว็บ และคอมพิวเตอร์ได้ดั่งใจคุณต้องการ\n\nอดีตของเขายังคงถูกปิดบังเป็นปริศนา มีเพียงความสามารถในการ "ทำนาย" ที่ดูไม่เข้ากับความเป็นโปรแกรมเมอร์ แต่เขาก็สามารถทำนายได้อย่างแม่นยำ\n\n"อยากรู้เรื่องราวของไอโตะเหรอ? ลองทำนายดูสิ~"',
      },
      birthday: {
        en: "8th December",
        th: "8 ธันวาคม",
      },
      fanmark: " 💻🩵✨",
      specialize: {
        en: [
          "Programming (C, Java, Python, Web Programming, Rust, GoLang)",
          "Software Testing",
          "AI (Intermediate)",
          "Chemistry",
        ],
        th: [
          "Programming (C, Java, Python, Web Programming, Rust, GoLang)",
          "Software Testing",
          "AI (ความรู้ในระดับปานกลาง)",
          "เคมี",
        ],
      },
      socials: { youtube: "https://www.youtube.com/@KZK_Aito", twitter: "https://x.com/kanzaki_aito", twitch: "https://www.twitch.tv/kanzaki_aito", mail: "kanzaki.aitovt@gmail.com", github: "https://github.com/kanzakiaito" },
      quote: { en: "Predict the future, code the present.", th: "ผมก็เป็นแค่โปรแกรมเมอร์... ที่ดูดวงเป็นนิดหน่อยน่ะ" },
    },
    {
      name: "LYRIC URSAE",
      department: { en: "VETERINARY MEDICINE", th: "VETERINARY MEDICINE" },
      code: "L2R-IV",
      AOI: {
        en: [
          "Game Development",
          "Medical Simulation",
        ],
        th: [
          "การพัฒนาเกม (Game Development)",
          "การจำลองเชิงการแพทย์ (Medical Simulation)",
        ],
      },
      avatar: "/img/inLAB_Intern/Lyric.png",
      logo: "/img/Logo/Lyric.png",
      model: "/img/Model/Lyric.png",
      description: {
        en: "Grumpy bear Commander with passion!",
        th: "หมีสาวผู้บัญชาการขี้บ่น ที่เต็มเปี่ยมไปด้วยแรงบันดาลใจ!",
      },
      detailedDescription: {
        en: "A bear girl who serves as a commanding officer of the medical unit aboard a spaceship. She is proficient in veterinary medicine and epidemiology. One of the mystery people still wondering about her is why she always has a anesthetic dart gun at hand.\n\nHer past history remains unclear, but with her abilities in terms of knowledge and her tendency to complain(?), she is definitely ready to dispense medicine and share her experiences with everyone who passes by!",
        th: "หมีสาวผู้บัญชาการประจำหน่วยแพทย์บนยาน ผู้รอบรู้ในด้านสัตวแพทย์ และโรคระบาด แต่ไม่เข้าใจเหมือนกันว่าทำไมเธอถึงต้องมีปืนยาสลบอยู่ใกล้มือตลอดเวลา?\n\nประวัติในอดีตยังไม่เป็นอันทราบแน่ชัด แต่ด้วยความสามารถของเธอในเชิงความรู้และขี้บ่น(?) เธอพร้อมที่จะป้ายยาและแชร์ประสบการณ์ให้ผู้ผ่านทางทุกคนอย่างแน่นอน!",
      },
      birthday: {
        en: "26th April",
        th: "26 เมษายน",
      },
      fanmark: "🐻🥽",
      specialize: {
        en: [
          "Veterinary medicine (Especially in Orthopedics)",
          "Epidemiology",
        ],
        th: [
          "สัตวแพทย์ (Orthopedics)",
          "ระบาดวิทยา (Epidemiology)",
        ],
      },
      socials: { youtube: "youtube.com/@LyricUrsae", twitter: "https://x.com/LyricUrsae", twitch: "", mail: "", github: "" },
      quote: { en: "Bear with me! 🐻🥽", th: "สวัสดีทุกคน Lyric Ursae (ไลริค เออร์ซี่) 🐻🥽 เองงง" },
    },
    {
      name: "ARITHMOS",
      department: { en: "ACTUARY", th: "ACTUARY" },
      code: "A3M-IA",
      AOI: {
        en: [
          "Mathematics",
          "Actuary",
          "Finance",
          "Statistics",
          "Science",
          "Programming",
        ],
        th: [
          "คณิตศาสตร์",
          "คณิตศาสตร์ประกันภัย",
          "ไฟแนนซ์",
          "สถิติ",
          "วิทยาศาสตร์",
          "Programming",
        ],
      },
      avatar: "/img/inLAB_Intern/Arithmos.png",
      logo: "/img/Logo/Arithmos.png",
      model: "/img/Model/Arithmos.png",
      description: {
        en: "A mathematician, a lifetime devoted to numbers and mathematical principles, often losing sleep to games.",
        th: "นักคณิตศาสตร์ผู้อยู่กับตัวเลขมาทั้งชีวิต ผู้เข้าใจถึงหลักการคณิตและอดนอนเพราะเล่นเกม",
      },
      detailedDescription: {
        en: "A mathematician who has dedicated his life to numbers, often foregoing sleep in his quest to understand everything in mathematics. He also enjoys gaming late into the night (well, more often than not...).\n\nCurrently, he's on board the ISV Andøya Expedition, where he applies mathematical principles to analyze various risks within the vessel.",
        th: "นักคณิตศาสตร์ผู้ใช้ชีวิตกับตัวเลขมาทั้งชีวิต มักจะอดหลับอดนอนเพราะพยายามจะเรียนรู้เพื่อเข้าใจทุกสิ่งอย่างในวิชาคณิตศาสตร์และมีเล่นเกมตอนกลางคืนบ้าง (ไม่บ้างหรอก ส่วนใหญ่เลยแหละ...)\n\nปัจจุบัน เขาได้ขึ้นมาอยู่บนยาน ISV Andøya Expedition เพื่อวิเคราะห์ความเสี่ยงต่าง ๆ ภายในยานโดยใช้หลักการทางคณิตศาสตร์",
      },
      birthday: {
        en: "2nd July",
        th: "2 กรกฎาคม",
      },
      fanmark: "🧮",
      specialize: {
        en: [
          "Mathematics",
          "Actuary",
          "Finance",
          "Statistics",
        ],
        th: [
          "คณิตศาสตร์",
          "คณิตศาสตร์ประกันภัย",
          "ไฟแนนซ์",
          "สถิติ",
        ],
      },
      socials: { youtube: "https://www.youtube.com/@ArithmosCh", twitter: "https://x.com/arithmosch", twitch: "https://twitch.tv/arithmosch", mail: "", github: "" },
      quote: { en: "Numbers never lie.", th: "ตัวเลขไม่เคยโกหกใคร" },
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
            <p
              className={`text-lg text-gray-600 max-w-2xl mx-auto whitespace-pre-wrap ${
                language === "th" ? "font-kanit" : "font-mono"
              }`}
            >
              {t.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 py-0"
                onClick={() => handleMemberClick(member)}
              >
                <div className="relative w-full select-none pointer-events-none">
                  <Image
                    src={member.avatar || "/img/placeholder.png"}
                    alt={member.name}
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
                      {member.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`
                        text-orange-600 border-orange-600 font-mono
                        whitespace-pre-line break-words
                        max-w-full block
                        text-xs sm:text-sm
                        px-2 py-1
                        overflow-hidden text-ellipsis
                      `}
                      style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}
                    >
                      {member.department[language]}
                    </Badge>
                  </div>

                  <p
                    className={`text-sm text-gray-600 mb-4 font-mono text-left ${
                      language === "th" ? "font-kanit" : "font-mono"
                    }`}
                  >
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
                  alt={selectedMember.name}
                  width={180}
                  height={180}
                  className="rounded-lg object-cover mb-4 shadow-lg select-none pointer-events-none"
                  draggable={false}
                  onContextMenu={e => e.preventDefault()}
                />
                <h3 className="text-lg font-bold text-gray-900 font-mono">
                  {selectedMember.name}
                </h3>
                <Badge
                  variant="outline"
                  className={`text-orange-400 border-orange-400 font-mono bg-black whitespace-nowrap mb-2`}
                >
                  {selectedMember.department[language]}
                </Badge>
                {/* Quote Section */}
                {selectedMember.quote && selectedMember.quote[language] && (
                  <div
                    className={`italic text-center text-gray-800 bg-orange-100 rounded px-4 py-2 mb-3 ${
                      language === "th" ? "font-kanit" : "font-mono"
                    }`}
                  >
                    “{selectedMember.quote[language]}”
                  </div>
                )}
                <h4
                  className={`text-sm font-semibold text-gray-700 mb-2 font-mono`}
                >
                  Social Links
                </h4>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:bg-red-500 hover:text-white hover:border-red-600 font-mono`}
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
                    className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:bg-black hover:text-white hover:border-black font-mono`}
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
                        className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:bg-purple-600 hover:text-white hover:border-orange-600 font-mono`}
                        onClick={() =>
                          window.open(selectedMember.socials.twitch, "_blank")
                        }
                      >
                        <Twitch className="w-4 h-4" />
                        Twitch
                      </Button>
                    )}
                  {selectedMember.socials.mail &&
                    selectedMember.socials.mail.trim() !== "" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:bg-orange-500 hover:text-white hover:border-orange-600 font-mono`}
                        onClick={() =>
                          window.open(`mailto:${selectedMember.socials.mail}`, "_blank")
                        }
                      >
                        <Mail className="w-4 h-4" />
                        E-Mail
                      </Button>
                    )}
                  {selectedMember.socials.github &&
                    selectedMember.socials.github.trim() !== "" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:bg-orange-500 hover:text-white hover:border-orange-600 font-mono`}
                        onClick={() =>
                          window.open(`mailto:${selectedMember.socials.github}`, "_blank")
                        }
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </Button>
                    )}
                </div>
              </div>

              {/* Right Section: Black background, white text */}
              <div className="md:col-span-2 bg-black text-white py-10 px-4 md:px-10 flex flex-col rounded-b-lg md:rounded-b-none md:rounded-r-lg">
                <div className="flex justify-center items-center mb-4">
                  <Image
                    src={selectedMember.logo || "/img/placeholder.png"}
                    alt={selectedMember.name}
                    width={200}
                    height={200}
                    className="w-auto h-auto object-cover select-none pointer-events-none"
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                  />
                </div>
                <div className="mb-6">
                  <h4
                    className={`bg-orange-400 rounded-lg text-center text-lg font-bold text-white mb-3 font-mono`}
                  >
                    Description
                  </h4>
                  <p
                    className={`text-gray-200 leading-relaxed text-left whitespace-pre-wrap ${
                      language === "th" ? "font-kanit" : "font-mono"
                    }`}
                  >
                    {selectedMember.detailedDescription?.[language] ||
                      selectedMember.description[language]}
                  </p>
                </div>
                {/* Specialize */}
                {selectedMember.specialize && (
                  <div className="pb-5">
                    <h4
                      className={`bg-orange-400 rounded-lg text-center text-lg font-bold text-white mb-3 font-mono`}
                    >
                      Specialize
                    </h4>
                    <ul className="space-y-2">
                      {selectedMember.specialize[language].map(
                        (achievement, index) => (
                          <li
                            key={index}
                            className={`flex items-center gap-2 text-gray-200 ${
                              language === "th" ? "font-kanit" : "font-mono"
                            }`}
                          >
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            {achievement}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                <div className="flex gap-6 mb-6">
                  {/* Birthday Section */}
                  {selectedMember.birthday &&
                    selectedMember.birthday[language] && (
                      <div className="flex-1">
                        <h4
                          className={`bg-orange-400 rounded-lg text-center text-lg font-bold text-white mb-3 font-mono`}
                        >
                          Birthday
                        </h4>
                        {selectedMember.birthday[language] === "N/A" ? (
                          <>
                            <Button
                              className={`w-full bg-orange-500 text-white hover:bg-orange-600 ${
                                language === "th" ? "font-kanit" : "font-mono"
                              }`}
                              onClick={() => setIsSpoilerDialogOpen(true)}
                            >
                              Spoiler Alert
                            </Button>
                            <Dialog
                              open={isSpoilerDialogOpen}
                              onOpenChange={setIsSpoilerDialogOpen}
                            >
                              <DialogContent className="max-w-xs text-center">
                                <div
                                  className={`text-lg mb-4 ${
                                    language === "th"
                                      ? "font-kanit"
                                      : "font-mono"
                                  }`}
                                >
                                  Paid with your cell to unlock 🔒
                                </div>
                                <Button
                                  className={`mt-2 bg-orange-500 text-white hover:bg-orange-600 ${
                                    language === "th"
                                      ? "font-kanit"
                                      : "font-mono"
                                  }`}
                                  onClick={() => setIsSpoilerDialogOpen(false)}
                                >
                                  Close
                                </Button>
                              </DialogContent>
                            </Dialog>
                          </>
                        ) : (
                          <p
                            className={`text-gray-200 leading-relaxed text-center ${
                              language === "th" ? "font-kanit" : "font-mono"
                            }`}
                          >
                            {selectedMember.birthday[language]}
                          </p>
                        )}
                      </div>
                    )}
                  {/* Fanmark Section */}
                  <div className="flex-1">
                    <h4
                      className={`bg-orange-400 rounded-lg text-center text-lg font-bold text-white mb-3 font-mono`}
                    >
                      Fanmark
                    </h4>
                    <p
                      className={`text-gray-200 leading-relaxed text-center ${
                        language === "th" ? "font-kanit" : "font-mono"
                      }`}
                    >
                      {selectedMember.fanmark}
                    </p>
                  </div>
                </div>
                {/* Area of Interest Section */}
                <div className="mb-6">
                  <h4 className="bg-orange-400 rounded-lg text-center text-lg font-bold text-white mb-3 font-mono">
                    Area of Interest
                  </h4>
                  <ul className="space-y-2">
                    {selectedMember.AOI[language].map(
                      (AOI, index) => (
                        <li
                          key={index}
                          className={`flex items-center gap-2 ${
                            language === "th" ? "font-kanit" : "font-mono"
                          } text-gray-200`}
                        >
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          {AOI}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
              href="https://discord.gg/yK6bxAFx7F"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsDiscordHovered(true)}
              onMouseLeave={() => setIsDiscordHovered(false)}
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