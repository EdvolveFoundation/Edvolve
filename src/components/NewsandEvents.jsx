"use client";

import Image from "next/image";
import { CalendarDays, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";





const events = [
    {
        day: "01",
        month: "Education",
        title: "Learning & Education Solutions",
        location: "Community Programs",
        date: "Education Access & Development",
        endDate: "Ongoing Impact Initiative",
        image: "/about1.jpeg",
    },
    {
        day: "02",
        month: "Human Capital",
        title: "Skills Development & Empowerment",
        location: "Capacity Building",
        date: "Training, Mentorship & Support",
        endDate: "Continuous Growth Program",
        image: "/about4.jpeg",
    },
    {
        day: "03",
        month: "Social Change",
        title: "Community Transformation Projects",
        location: "National Development",
        date: "Advocacy & Social Action",
        endDate: "Sustainable Impact Program",
        image: "/agro1.jpeg",
    },
];

export default function NewsandEvents() {
    const sectionRef = useRef(null);

    const isInView = useInView(sectionRef, {
        amount: 0.2,
    });

    return (
        <section
            ref={sectionRef}
            className=" text-white pt-38 overflow-hidden"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="grid gap-16 lg:grid-cols-[320px_1fr]">

                    {/* LEFT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, y: 120 }}
                        animate={
                            isInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 120 }
                        }
                        transition={{ duration: 0.8 }}
                    >
                        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#b6a933]">
                            Our Programs
                        </p>

                        <h2 className="text-5xl md:text-6xl font-serif leading-tight">
                            Our Initiatives
                        </h2>
                    </motion.div>

                    {/* RIGHT SIDE */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            animate={
                                isInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 80 }
                            }
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-14 flex flex-col justify-between gap-8 lg:flex-row"
                        >
                            <p className="max-w-xl text-gray-400 leading-8 text-lg">
                                Discover Edvolve Foundation’s initiatives focused on education,
                                human capital development, and social change. We listen to
                                communities, develop solutions, and create lasting impact through
                                collaboration and innovation.
                            </p>

                            <button className="group flex items-center gap-2 text-white hover:text-[#c5a53d] transition">
                                Explore Programs
                                <ArrowRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:translate-x-2"
                                />
                            </button>
                        </motion.div>

                        {/* EVENTS LIST */}
                        <div className="space-y-8">
                            {events.map((event, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 120 }}
                                    animate={
                                        isInView
                                            ? { opacity: 1, y: 0 }
                                            : { opacity: 0, y: 120 }
                                    }
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.15,
                                    }}
                                    className="
                    group
                    grid
                    md:grid-cols-[80px_150px_1fr_120px]
                    gap-6
                    items-center
                    border-b
                    border-white/10
                    pb-8
                    transition-all
                    duration-500
                    hover:bg-white/5
                    hover:px-6
                    rounded-xl
                  "
                                >
                                    {/* DATE */}
                                    <div>
                                        <h3 className="text-5xl font-serif text-white group-hover:text-[#c4b534] transition">
                                            {event.day}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            {event.month}
                                        </p>
                                    </div>

                                    {/* IMAGE */}
                                    <div className="relative h-28 w-full md:w-36 overflow-hidden rounded-lg">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* CONTENT */}
                                    <div>
                                        <h3 className="mb-3 text-2xl md:text-3xl font-serif group-hover:text-[#d8bf34] transition">
                                            {event.title}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <span className="font-medium text-white">
                                                {event.location}
                                            </span>

                                            <div className="flex items-center gap-2 text-gray-400">
                                                <CalendarDays size={14} className="text-[#ddc331]" />
                                                <span>
                                                    {event.date} — {event.endDate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}