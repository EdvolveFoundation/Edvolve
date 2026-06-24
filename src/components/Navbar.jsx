"use client";


import { useState, useEffect } from "react"
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaSearch,
    FaShoppingCart,
    FaUsers
} from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { MdWifiCalling3 } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { AiOutlineMail } from "react-icons/ai";



const aboutLinks = [

    {
        name: "About Edvolve",
        path: "/aboutPage",
        image: "/pic9.png",
    },
    {
        name: "Our History",
        path: "/historyPage",
        image: "/about1.jpeg",
    },

    {
        name: "Vision & Mission",
        path: "/visionMission",
        image: "/about2.jpeg",
    },

    {
        name: "Our Approach",
        path: "/ourApproach",
        image: "/about3.jpeg",
    },
    {
        name: "Management Team",
        path: "/managementTeamPage",
        image: "/about4.jpeg",
    },

    {
        name: "Reports & Publications",
        path: "/ReportsPublications",
        image: "/about4.jpeg",
    },
];


const programLinks = [
    {
        name: "Education & Empowerment",
        path: "/educationEmpowerment",
        image: "/edu1.jpeg",
    },
    {
        name: "Agrodev Initiative",
        path: "/agrodev",
        image: "/edu5.png",
    },
    {
        name: "Entrepreneurship & Skills Development",
        path: "/entrepreneurshipSkills",
        image: "/edu3.jpeg",
    },
    {
        name: "Rural Educational Advancement Program",
        path: "/ruralEducational",
        image: "/edu4.jpeg",
    },

    {
        name: "MSME Development",
        path: "/MSMEDevelopment",
        image: "/edu2.jpeg",
    },
];


export default function Navbar() {
    const [aboutOpen, setAboutOpen] = useState(false)
    const [programOpen, setProgramOpen] = useState(false)


    const [activeAbout, setActiveAbout] = useState(0)
    const [activeProgram, setActiveProgram] = useState(0)
    const [searchOpen, setSearchOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false)
    const [isSticky, setIsSticky] = useState(false)
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
    const [navLoaded, setNavLoaded] = useState(false);

    useEffect(() => {
        setNavLoaded(true);
    }, []);



    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleClose = () => {
        setIsClosing(true);

        setTimeout(() => {
            setSearchOpen(false);
            setIsClosing(false);
        }, 700); // same duration as animation
    };


    const [activeService, setActiveService] = useState(0);
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            router.push(`/search?q=${search}`);


        }
    };

    const handleMobileNav = (path) => {
        setMenuOpen(false);

        setTimeout(() => {
            router.push(path);
        }, 300); // match menu transition duration
    };


    // Sticky on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className="sticky top-0 z-50">

            {/* ================= SEARCH OVERLAY ================= */}
            <div
                className={`
    fixed top-0 left-0 w-full h-[420px]
    bg-[#232d45] z-[10000]
    transition-transform duration-700 ease-in-out
    ${searchOpen && !isClosing
                        ? "translate-y-0"
                        : "-translate-y-full"
                    }
  `}
            >
                <button
                    onClick={handleClose}
                    className={`
    absolute top-8 right-8 text-white z-50 md:text-2xl
          text-lg
    transition-transform duration-700
    ${isClosing ? "rotate-180" : "rotate-0"}
  `}
                >
                    <X size={34} strokeWidth={1.5} />
                </button>


                <div className="max-w-5xl mx-auto pt-40 px-6">
                    <div className="relative border-b border-white/20">
                        <input
                            type="text"
                            placeholder="Type words and hit enter"
                            className="
          w-full
          bg-transparent
          text-white
          md:text-4xl
          text-xl
          pb-6
          outline-none
          placeholder:text-white/70
        "
                        />

                        <FaSearch
                            className="
          absolute
          right-0
          top-1/2
          -translate-y-1/2
          text-white
          md:text-2xl
          text-xl
        "
                        />
                    </div>
                </div>
            </div>
            {/* ================= MOBILE MENU ================= */}
            <div
                className={`fixed top-0 right-0  left-0 py-12 bg-gray-50 z-50 shadow-lg transform transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button onClick={() => setMenuOpen(false)} className="text-3xl">×</button>
                </div>

                <ul className="flex flex-col gap-4 my-6 p-6 text-lg font-semibold">

                    <li onClick={() => handleMobileNav('/')} className="cursor-pointer">
                        Home
                    </li>

                    {/* ABOUT */}
                    <li>
                        <div
                            onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                            className="flex justify-between items-center cursor-pointer"
                        >
                            About us
                            <span>{mobileAboutOpen ? "−" : "+"}</span>
                        </div>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${mobileAboutOpen ? "max-h-96 mt-2" : "max-h-0"
                                }`}
                        >
                            <ul className="pl-4 text-gray-600 text-sm flex flex-col gap-2">
                                <li onClick={() => handleMobileNav('/aboutPage')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    About Edvolve
                                </li>

                                <li onClick={() => handleMobileNav('/visionMission')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Vision & Mission
                                </li>

                                <li onClick={() => handleMobileNav('/historyPage')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Our History
                                </li>

                                <li onClick={() => handleMobileNav('/ourApproach')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Our Approach
                                </li>

                                <li onClick={() => handleMobileNav('/managementTeamPage')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Management Team
                                </li>

                                <li onClick={() => handleMobileNav('/ReportsPublications')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Reports & Publications
                                </li>


                            </ul>
                        </div>
                    </li>

                    {/* SERVICES */}
                    <li>
                        <div
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className="flex justify-between items-center cursor-pointer"
                        >
                            Our Programs
                            <span>{mobileServicesOpen ? "−" : "+"}</span>
                        </div>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${mobileServicesOpen ? "max-h-60 mt-2" : "max-h-0"
                                }`}
                        >
                            <ul className="pl-4 text-gray-600 text-sm flex flex-col gap-2">
                                <li onClick={() => handleMobileNav('/educationEmpowerment')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Education & Empowerment
                                </li>

                                <li onClick={() => handleMobileNav('/agrodev')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Agrodev Initiative
                                </li>

                                <li onClick={() => handleMobileNav('/entrepreneurshipSkills')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Entrepreneurship & Skills Development
                                </li>

                                <li onClick={() => handleMobileNav('/ruralEducational')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    Rural Educational Advancement Program
                                </li>



                                <li onClick={() => handleMobileNav('/MSMEDevelopment')} className="px-4 cursor-pointer hover:bg-blue-100">
                                    MSME Development
                                </li>


                            </ul>
                        </div>
                    </li>

                    <li onClick={() => handleMobileNav("/ImpactPage")} className="hover:text-purple-400 cursor-pointer">
                        Impact
                    </li>

                    <li onClick={() => handleMobileNav("/blog")} className="hover:text-purple-400 cursor-pointer">
                        Blogs
                    </li>

                    <li onClick={() => handleMobileNav("/ContactPage")} className="hover:text-purple-400 cursor-pointer">
                        Contact
                    </li>
                </ul>

                <div className="flex flex-col items-start pl-4 pb-4 gap-3">

                    <button
                        onClick={() => handleMobileNav("/RegisterPage")}
                        className="px-5 py-2 border-3 border-[#6e693d] font-semibold cursor-pointer text-xm md:text-sm xl:text-lg text-[#85783e] rounded-full hover:bg-[#232d45] hover:text-white transition"
                    >
                        Get Involve
                    </button>

                </div>
            </div>

            {/* BACKDROP */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40"
                />
            )}

            {/* ================= TOP BAR ================= */}
            <div className="bg-[#303030] text-gray-50 flex items-center justify-between">
                <div className="mx-12 flex gap-8 items-center py-3 text-lg lg:text-sm">
                    <span className="flex items-center gap-2">
                        <AiOutlineMail /> <span className="hidden lg:block">info@edvolvefoundation.org</span>
                    </span>

                    <span className="flex items-center gap-2">
                        <MdWifiCalling3 />  <span className="hidden lg:block">+2349012345678</span>
                    </span>

                    <span className="flex items-center gap-2">
                        <IoLocationOutline />  <span className="hidden lg:block">Lekki, Lagos, Nigeria</span>
                    </span>


                </div>


                {/* social medai */}

                <div className=" flex gap-6 items-center mr-12 py-3 text-sm lg:text-sm">
                    <span className="flex items-center gap-2">
                        <FaFacebookF />

                    </span>

                    <span className="flex items-center gap-2">
                        <FaXTwitter />
                    </span>

                    <span className="flex items-center gap-2">
                        <FaLinkedin />
                    </span>

                    <span className="flex items-center gap-2">
                        <FaInstagram />
                    </span>


                </div>
            </div>

            {/* ================= MAIN NAV ================= */}
            <nav
                className={`bg-white text-gray-600 py-2.5 flex justify-between items-center shadow-xl ${isSticky ? "fixed top-0 right-0 left-0 z-50" : ""
                    }`}
            >
                <div className={`w-full  mx-auto flex items-center justify-between -ml-5 pt-5 md:pt-0 px-12 md:px-6 lg:px-10
                    
                     transition-all duration-1000 ease-out
    ${navLoaded
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-16 opacity-0"
                    }
                    
                    `}>

                    {/* LOGO */}
                    <img
                        onClick={() => router.push("/")}
                        className="w-20 md:w-23 cursor-pointer"
                        src="/logo.png"
                        alt="logo"
                    />

                    {/* DESKTOP NAV */}
                    <ul className="hidden lg:flex gap-10 font-serif items-center md:base xl:text-xl font-bold text-gray-700">

                        <li onClick={() => router.push("/")} className="hover:text-purple-400 cursor-pointer">
                            Home
                        </li>

                        <li
                            className="relative"
                            onMouseEnter={() => setAboutOpen(true)}
                            onMouseLeave={() => setAboutOpen(false)}
                        >
                            <div className="flex items-center gap-1 cursor-pointer hover:text-[#572649]">
                                About us
                                <FiChevronDown
                                    className={`transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </div>

                            {/* DROPDOWN */}
                            <div
                                className={`absolute top-full left-0 z-50 pt-6 transition-all duration-300 ${aboutOpen
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-4 pointer-events-none"
                                    }`}
                            >
                                <div className="w-[760px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex">

                                    {/* LEFT MENU */}
                                    <ul className="w-[58%] py-4">
                                        {aboutLinks.map((item, index) => (
                                            <li
                                                key={item.name}
                                                onMouseEnter={() => setActiveAbout(index)}
                                                onClick={() => {
                                                    router.push(item.path);
                                                    setAboutOpen(false);
                                                }}
                                                className={`px-7 py-5 cursor-pointer transition-all duration-300 border-b border-gray-100 last:border-none hover:bg-[#b8a555] hover:text-[#f0efed] hover:pl-10 ${activeService === index
                                                    ? "bg-[#e2dec8] text-[#9b854a] pl-10"
                                                    : ""
                                                    }`}
                                            >
                                                <h4 className="font-medium">{item.name}</h4>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* RIGHT IMAGE */}
                                    <div className="relative w-[42%] min-h-[300px] overflow-hidden">
                                        <Image
                                            src={aboutLinks[activeAbout].image}
                                            alt={aboutLinks[activeAbout].name}
                                            fill
                                            className="object-cover transition-all duration-700"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                        <div className="absolute bottom-6 left-6 text-white">

                                            <h3 className="text-2xl font-semibold">
                                                {aboutLinks[activeService].name}
                                            </h3>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </li>

                        {/* SERVICES DROPDOWN (RESTORED) */}
                        <li
                            className="relative"
                            onMouseEnter={() => setProgramOpen(true)}
                            onMouseLeave={() => setProgramOpen(false)}
                        >
                            <div className="flex items-center gap-1 cursor-pointer hover:text-[#572649]">
                                Our Programs
                                <FiChevronDown
                                    className={`transition-transform duration-300 ${programOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </div>

                            {/* DROPDOWN */}
                            <div
                                className={`absolute top-full left-0 z-50 pt-6 transition-all duration-300 ${programOpen
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-4 pointer-events-none"
                                    }`}
                            >
                                <div className="w-[760px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex">

                                    {/* LEFT MENU */}
                                    <ul className="w-[58%] py-4">
                                        {programLinks.map((item, index) => (
                                            <li
                                                key={item.name}
                                                onMouseEnter={() => setActiveProgram(index)}
                                                onClick={() => {
                                                    router.push(item.path);
                                                    setProgramOpen(false);
                                                }}
                                                className={`px-7 py-5 cursor-pointer transition-all duration-300 border-b border-gray-100 last:border-none hover:bg-[#b8a555] hover:text-[#f0efed] hover:pl-10 ${activeService === index
                                                    ? "bg-[#e2dec8] text-[#9b854a] pl-10"
                                                    : ""
                                                    }`}
                                            >
                                                <h4 className="font-medium">{item.name}</h4>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* RIGHT IMAGE */}
                                    <div className="relative w-[42%] min-h-[360px] overflow-hidden">
                                        <Image
                                            src={programLinks[activeProgram].image}
                                            alt={programLinks[activeProgram].name}
                                            fill
                                            className="object-cover transition-all duration-700"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                        <div className="absolute bottom-6 left-6 text-white">
                                            <p className="text-xs uppercase tracking-[4px] mb-2">
                                                Edvolve Foundation
                                            </p>
                                            <h3 className="text-2xl font-semibold">
                                                {programLinks[activeService].name}
                                            </h3>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </li>

                        <li onClick={() => router.push("/ImpactPage")} className="hover:text-amber-600 cursor-pointer">
                            Impact
                        </li>

                        <li onClick={() => router.push("/blog")} className="hover:text-amber-600 cursor-pointer">
                            Blogs
                        </li>

                        <li onClick={() => router.push("/ContactPage")} className="hover:text-amber-600 cursor-pointer">
                            Contact
                        </li>

                    </ul>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-4 lg:gap-6">

                        {/* SEARCH */}
                        <FaSearch
                            onClick={() => setSearchOpen(true)}
                            className="cursor-pointer text-lg md:text-xl"
                        />

                        {/* CTA BUTTONS */}
                        <div className="hidden md:flex items-center gap-3">

                            <button
                                onClick={() => router.push("/RegisterPage")}
                                className="px-5 py-2 border-3 border-[#182124] font-semibold cursor-pointer text-xm md:text-sm xl:text-lg text-[#8a7a35] rounded-full hover:bg-[#232d45] hover:text-white transition"
                            >
                                Get Involve
                            </button>


                        </div>

                        {/* MOBILE MENU */}
                        <div
                            onClick={() => setMenuOpen(true)}
                            className="lg:hidden cursor-pointer -mr-8 text-2xl"
                        >
                            ☰
                        </div>

                    </div>

                </div>
            </nav>

        </header>
    )
}