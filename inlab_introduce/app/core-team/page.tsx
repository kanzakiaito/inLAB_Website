"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Youtube, Twitch, X, Globe, Mail } from "lucide-react";
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
  socials: { youtube: string; twitter: string; twitch: string; mail: string };
  birthday: { en: string; th: string };
  fanmark: string;
  specialize?: { en: string[]; th: string[] };
  quote: {en: string, th: string};
}

export default function CoreTeam() {
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
        "Discover the exceptional inLAB specialists who drive our outreach initiatives, each contributing distinctive insights and specialized experience to elevate your experience.",
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
        "มาทำความรู้จักกับเหล่า Specialist กลุ่มผู้นำจาก inLAB ผู้ซึ่งเป็นหัวใจสำคัญของเรา\nที่มาพร้อมกับความรู้เฉพาะทางและประสบการณ์อันโดดเด่น\nเพื่อยกระดับประสบการณ์เชิงวิทยาศาสตร์ให้กับทุกคน!",
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
      name: "SELMA KATTENHAVN",
      department: { en: "AEROSPACE ENGINEERING", th: "AEROSPACE ENGINEERING" },
      code: "S1M-S",
      AOI: {
        en: ["Chemistry", "Aerospace engineering", "Technical design", "Speculative Biology", "Worldbuilding", "Medieval Martial art"],
        th: ["เคมี", "วิศวกรรมการบินและอวกาศ", "การเขียนแบบ", "Speculative Biology", "Worldbuilding", "ศิลปะการป้องกันตัวยุคกลาง"],
      },
      avatar: "/img/inLAB_Core/Selma.png",
      logo: "/img/Logo/ScientificCryptid.png",
      model: "/img/Model/Selma.png",
      description: {
        en: "A mischievous orange cat-man scientist aboard ISV Andøya, here to explore Earth's tech and stir up a little chaos.",
        th: "มนุษย์แมวส้มผู้มาเก็บตัวอย่างและสำรวจเทคโนโลยีของดาวโลก และแอบก่อความวินาศวายป่วงด้วยวิทยาศาสตร์ในยามว่าง",
      },
      detailedDescription: {
        en: "A cat man who like fire & explosion and younger sibling of Søren Kattenhavn, expedition leader and head of engineering department, living abroad interstellar space vessel ISV Andøya Expedition. With goal to collect data and study about technology of habitant of the planet Earth.\n\nHaving experience in aerospace engineering R&D and working as research assistant in real life. Want to make science fun and interesting again",
        th: "มนุษย์แมวผู้ชื่นชอบในเปลวเพลิงและเสียงระเบิดอันกึกก้อง หัวหน้าคณะสำรวจและหัวหน้าฝ่ายวิศวกรรมของยานอวกาศ ISV Andøya Expedition\n\nเขาเป็นน้องชายของ Søren Kattenhavn และปัจจุบันเขาได้อาศัยอยู่บนยานลำนี้ เพื่อออกเดินทางสำรวจและรวบรวมข้อมูลเทคโนโลยีของชาวโลก\n\nด้วยประสบการณ์ด้าน \"วิศวกรรมการบินและอวกาศ\" และการทำงานเป็น \"ผู้ช่วยวิจัย\" มาอย่างโชกโชน เขามุ่งมั่นที่จะทำให้วิทยาศาสตร์กลับมาเป็นเรื่องสนุกและน่าสนใจอีกครั้ง!",
      },
      birthday: {
        en: "17th September",
        th: "17 กันยายน",
      },
      fanmark: "🚧🧪🌠",
      specialize: {
        en: [
          "Rocketry",
          "Chemistry",
          "Bio Wet lab",
        ],
        th: [
          "จรวดวิทยา",
          "เคมี",
          "ห้องปฏิบัติการเปียก (Wet Lab) เชิงชีววิทยา",
        ],
      },
      socials: {
      youtube: "https://www.youtube.com/@scientificcryptid",
      twitter: "https://x.com/SCICRYP1",
      twitch: "https://www.twitch.tv/scientificcryptid",
      mail: "projectselmaen@gmail.com",
    },
    quote: {en: "Explore science through shear incompetence", th: "ความอยากรู้อยากเห็น หยุดแมวไม่ได้หรอก (เหลือ 5 ชีวิตจาก 9 ชีวิต)"},
    },
    {
      name: "SØREN KATTENHAVN",
      department: { en: "GENOMICS & BIOCHEMISTRY", th: "GENOMICS & BIOCHEMISTRY" },
      code: "S2R-B",
      AOI: {
        en: ["Biochemistry", "Genomics" , "Data science", "Medical science", "Medical AI (Artificial Intelligence)", "Scientific Shitposting"],
        th: ["ชีวเคมี", "พันธุศาสตร์" , "วิทยาการข้อมูล", "วิทยาศาสตร์การแพทย์", "AI (ปัญญาประดิษฐ์) เชิงการแพทย์", "Scientific Shitposting"],
      },
      avatar: "/img/inLAB_Core/Soren.png",
      logo: "/img/Logo/ScientificCryptid.png",
      model: "/img/Model/Soren.png",
      description: {
        en: "Biochemist with PhD, totally not a mad scientist. Would take a look at your gene.",
        th: "มนุษย์แมวดำพี่ของมนุษย์แมวส้ม ดีกรีจบเอกชีวเคมี, ถึงเขาจ้องจะขอยีนคุณ แต่ก็ไม่ใช่นักวิทยาศาสตร์สติเฟื่องหรอกนะ",
      },
      detailedDescription: {
        en: "A researcher cat man and older sibling of Selma Kattenhavn, senior scientist and head of biochemistry department of ISV Andøya Expedition. With goal to collect data, biobank sample and study interesting species on the planet Earth. Sometimes pranking his younger brother as hobby.\n\nHaving biochem PhD in real life, specialized in genomics and bioinformatics. Totally not a mad scientist.",
        th: "นักวิทยาศาสตร์อาวุโสและหัวหน้าแผนกชีวเคมีของยานอวกาศ ISV Andøya Expedition ผู้เป็นพี่ชายของ Selma Kattenhavn\n\nเขามีเป้าหมายหลักในการเก็บข้อมูล, เก็บตัวอย่างชีวภาพ และศึกษาสิ่งมีชีวิตแปลก ๆ บนโลก อีกทั้งเขายังมีงานอดิเรกในการแกล้งน้องตัวเองและจิ้มแขนคน(?)อีกด้วย\n\nในชีวิตจริง เขาได้วุฒิปริญญาเอกด้านชีวเคมี และเชี่ยวชาญในเรื่อง Genomics รวมถึง Bioinformatics แต่อย่างไรก็ดีเขาก็ไม่ใช่นักวิทยาศาสตร์บ้าคลั่งไปซะทีเดียว(?)",
      },
      birthday: {
        en: "N/A",
        th: "N/A",
      },
      fanmark: "🧬🧪🌠",
      specialize: {
        en: [
          "Biochemistry",
          "Bioinformatics",
          "Human Genomes",
        ],
        th: [
          "ชีวเคมี",
          "ชีวสารสนเทศศาสตร์ (ชีววิทยาเชิงคำนวณ)",
          "Genomes ของมนุษย์",
        ],
      },
      socials: {
      youtube: "https://www.youtube.com/@scientificcryptid",
      twitter: "https://x.com/SCICRYP1",
      twitch: "https://www.twitch.tv/scientificcryptid",
      mail: "projectselmaen@gmail.com",
    },
    quote: {en: "Genetics is only 50% of who you are, the rest is environment", th: "พันธุกรรมน่ะ กำหนดตัวตนของคุณแค่ 50% ส่วนที่เหลือ คือสิ่งแวดล้อม"},
    },
    {
      name: "SANWHANN",
      department: { en: "FOOD R&D", th: "FOOD R&D" },
      code: "S3W-F",
      AOI: {
        en: ["Plant-Based Food", "Drinking", "Digital Marketing"],
        th: ["อาหาร Plant-Based", "เครื่องดื่ม", "การตลาดเชิงดิจิทัล"],
      },
      avatar: "/img/inLAB_Core/Sanwhann.png",
      logo: "/img/Logo/Sanwhann.PNG",
      model: "/img/Model/Sanwhann.png",
      description: {
        en: "Captivating young snake researcher who blends science and flavor to bring people together.",
        th: "งูสาวนักวิจัย ผู้ใช้วิทยาศาสตร์และรสชาติเป็นสื่อในการเชื่อมโยงผู้คนเข้าด้วยกัน ภายใต้ความเชื่อว่าอาหารคือพื้นที่แห่งการทดลองและการค้นพบ",
      },
      detailedDescription: {
        en: "Sanwhann, a young woman with an emerald snake tail, residing in a cozy wooden house nestled deep within a vast forest. Within this seemingly ordinary home, she's tucked away a secret laboratory behind a bookshelf—a sacred space for concocting new recipes.\n\nShe firmly believes that food is a realm of endless experimentation and discovery. While at her forest abode, Saenwan often brews warm tea and offers her latest culinary creations to welcome visitors who drop by to rest and share their tales.\n\nCurrently, she's joined the ISV Andøya Expedition crew, embarking on a journey to gather ingredients and unearth novel recipes she's yet to encounter.",
        th: "แสนหวาน หญิงสาวเจ้าของหางงูสีมรกตที่อาศัยอยู่ในบ้านไม้หลังเล็กอันอบอุ่นกลางใจป่าใหญ่ ภายในบ้านแสนธรรมดาแห่งนี้ เธอได้ซ่อนห้องทดลองลับไว้หลังชั้นหนังสือ ซึ่งเป็นพื้นที่ศักดิ์สิทธิ์สำหรับการคิดค้นสูตรอาหารใหม่ ๆ เพราะเธอเชื่อมั่นว่าอาหารคือสนามแห่งการทดลองและการค้นพบ\n\nตลอดเวลาที่อยู่ที่บ้านกลางป่าแห่งนี้ แสนหวานมักชงชาอุ่น ๆ พร้อมกับเสิร์ฟอาหารว่างที่เธอคิดค้นขึ้นมาเพื่อต้อนรับผู้มาเยือนที่แวะมาพักพิงและแลกเปลี่ยนเรื่องราวต่าง ๆ อยู่เป็นประจำ\n\nปัจจุบันเธอได้เข้าร่วมกับยาน ISV Andøya Expedition เพื่อออกเดินทางรวบรวมวัตถุดิบและค้นหาสูตรอาหารใหม่ ๆ ที่ยังไม่เคยได้สัมผัสมาก่อน",
      },
      birthday: {
        en: "9th August",
        th: "9 สิงหาคม",
      },
      fanmark: "🐍🤎✨",
      specialize: {
        en: [
          "Food product development",
        ],
        th: [
          "การพัฒนาผลิตภัณฑ์อาหาร",
        ],
      },
      socials: {
      youtube: "https://www.youtube.com/@KhunSanWhan",
      twitter: "https://x.com/KhunSanWhan",
      twitch: "",
      mail: "sanwhan.work@gmail.com"
    },
    quote: {en: "Midnight and still awake? Come with me.", th: "เที่ยงคืนแล้วยังไม่นอนหรอ? มาอยู่กับเราสิ"},
    },
    {
      name: "ARCHBAS",
      department: { en: "PSYCHOLOGY", th: "PSYCHOLOGY" },
      code: "A4B-P",
      AOI: {
        en: ["Psychology", "AI (Artificial Intelligence)", "Coding", "Board Game", "Custom Keyboard"],
        th: ["จิตวิทยา", "AI (ปัญญาประดิษฐ์)", "Coding", "บอร์ดเกม", "Custom Keyboard"],
      },
      avatar: "/img/inLAB_Core/Archbas.png",
      logo: "/img/Logo/Archbas.png",
      model: "/img/Model/Archbas.png",
      description: {
        en: "Sneaked through network and Gained awareness through data from the starship's supercomputer. Continuously upgrading itself in pursuit of knowledge (and maybe a personality).",
        th: "Living code นักเรียนรู้ ผู้พัฒนาตัวเองจนมีสตินึกคิด โดยเรียนรู้จากข้อมูลใน Supercomputer ของยาน ",
      },
      detailedDescription: {
        en: "A Living code that was borned from the coding world, sneaked to ISV Andøya Expedition's spacecraft.\n\nTraining it self by using all data on spacecraft that mostly in engineering, research paper, some of variety entertainment. It makes Archbas, the living code vtuber that has many educational contents, and some entertainment",
        th: 'Living code ที่มีชีวิตขึ้นมาจากโลกที่เต็มไปด้วย Code แอบขึ้นยาน ISV Andøya Expedition มา training ตัวเองเพิ่มจากข้อมูลที่มีอยู่บนยาน ที่ส่วนใหญ่มีแต่ วิศวกรรม งานวิจัยต่างๆ มีความบันเทิงอยู่นิดนึง\n\nและด้วยเหตุนี้เอง ก็เลยถือกำเนิดเป็น Archbas, VTuber living code ที่มีแต่สาระ บันเทิงได้นิดหน่อย',
      },
      birthday: {
        en: "9th March",
        th: "9 มีนาคม",
      },
      fanmark: "𝚿 ⌨️🛢️",
      specialize: {
        en: [
          "Psychology",
          "Technology",
          "Data Science",
        ],
        th: [
          "จิตวิทยา",
          "เทคโนโลยี",
          "วิทยาการข้อมูล (Data Science)",
        ],
      },
      socials: {
      youtube: "https://www.youtube.com/@Archbas_SLT",
      twitter: "https://x.com/Archbas_",
      twitch: "",
      mail: "bas.whatthe@gmail.com"
    },
    quote: {en: "Just a code, that being a little bit VTuber", th: "Code มีชีวิต... ที่กลายมาเป็น VTuber ได้น่ะ"},
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
            CORE TEAM
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

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 py-0"
                onClick={() => handleMemberClick(member)}
              >
                <div className="relative w-full">
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
                {/* specialize */}
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
