"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const partners = [
  { name: "SMEDAN", logo: "/sedan.jpeg" },
  { name: "All Farmers Association of Nigeria", logo: "/farmers.jpeg" },
  { name: "Global Women Network", logo: "/gwn.jpeg" },
  { name: "SERVICOM", logo: "/servicom.jpeg" },
  { name: "VNC", logo: "/vcn.jpeg" },
  { name: "NTA", logo: "/nta.jpeg" },
  { name: "ACC", logo: "/acc.jpeg" },
  { name: "NYSC", logo: "/nysc.jpeg" },
  { name: "CAC", logo: "/cac.jpeg" },
  { name: "FMWA", logo: "/fmwa.jpeg" },
  { name: "RAW", logo: "/raw.jpeg" },
  { name: "Civil Service", logo: "/civilservice.jpeg" },
  { name: "AMAC", logo: "/amac.jpeg" },
  { name: "CODE", logo: "/code.jpeg" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Partners() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerSlide = 5;
  const totalSlides = Math.ceil(partners.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  const getSlideItems = (slideIndex) => {
    const start = slideIndex * itemsPerSlide;
    const slideItems = partners.slice(start, start + itemsPerSlide);

    while (slideItems.length < itemsPerSlide) {
      slideItems.push(partners[slideItems.length]);
    }

    return slideItems;
  };

  // AUTO SLIDE
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      className="py-24  bg-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <motion.span
            variants={fadeUp}
            custom={1}
            className="inline-block text-yellow-700 font-semibold uppercase tracking-widest text-sm mb-4"
          >
            Our Network
          </motion.span>

          <motion.h2
            variants={fadeUp}
            custom={2}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Partners & Collaborators
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={3}
            className="text-gray-600 text-lg leading-8"
          >
            Edvolve Foundation works with stakeholder organisations that share
            our commitment to education, empowerment, social change,
            advocacy, economic opportunity and sustainable development.
          </motion.p>
        </div>

        {/* SLIDER */}
        <motion.div
          className="relative"
          variants={scaleIn}
        >

          {/* GLOW */}
          <div className="absolute inset-0 flex justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[120px] rounded-full" />
          </div>

          {/* LEFT BUTTON */}
          <button
            onClick={prevSlide}
            className="absolute -left-3 md:-left-8 top-25 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center hover:scale-110 hover:bg-[#D4AF37] hover:text-black transition"
          >
            <ChevronLeft size={20} />
          </button>

          {/* SLIDER */}
          <div className="overflow-hidden mx-16">
            <div
              className="flex transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="min-w-full h-70 pt-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
                >
                  {getSlideItems(slideIndex).map((partner, index) => (
                    <motion.div
                      key={`${partner.name}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: false, amount: 0.3 }}
                      className="group h-40 rounded-3xl bg-gradient-to-br from-white to-[#faf7ef] border border-[#D4AF37]/20 shadow-lg flex items-center justify-center p-6 hover:-translate-y-2 hover:shadow-2xl hover:border-[#D4AF37] transition"
                    >
                      <div className="relative w-[140px] h-[90px] flex items-center justify-center">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain transition group-hover:scale-105"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* INDICATORS */}
          <div className="flex justify-center mt-10">
            <div className="flex items-center gap-3">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-500 rounded-full ${
                    currentIndex === index
                      ? "w-12 h-2 bg-[#D4AF37]"
                      : "w-2 h-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={nextSlide}
            className="absolute -right-3 md:-right-8 top-25 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center hover:scale-110 hover:bg-[#D4AF37] hover:text-black transition"
          >
            <ChevronRight size={20} />
          </button>

        </motion.div>
      </div>
    </motion.section>
  );
}