"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Education & Learning Solutions",
    category: "OUR IMPACT",
    image: "/ab2.jpg",
  },
  {
    title: "Human Capital Development",
    category: "OUR IMPACT",
    image: "/pic8.png",
  },
  {
    title: "Community Empowerment Initiatives",
    category: "OUR IMPACT",
    image: "/pic3.jpg",
  },
  {
    title: "Social Change & Advocacy",
    category: "OUR IMPACT",
    image: "/pic4.jpg",
  },
  {
    title: "Partnerships For Sustainable Development",
    category: "OUR IMPACT",
    image: "/pic5.jpg",
  },
];

export default function PortfolioGallery() {
  const [active, setActive] = useState(0);

  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.2,
  });

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#f7f3ef] py-16 md:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 80,
                }
          }
          transition={{
            duration: 0.8,
          }}
          className="mb-12 md:mb-16"
        >
          <p className="uppercase tracking-[4px] text-sm text-[#d4c749] mb-4">
            Our Initiatives
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl leading-tight">
            Creating Lasting Social Impact
          </h2>
        </motion.div>

        {/* MOBILE & TABLET SLIDER */}
        <div className="lg:hidden">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-[450px] sm:h-[500px] overflow-hidden rounded-2xl">
                  <Image
                    src={items[active].image}
                    alt={items[active].title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <p className="uppercase tracking-[4px] text-xs text-[#d4c749] mb-3">
                      {items[active].category}
                    </p>

                    <h3 className="text-2xl sm:text-3xl font-semibold leading-tight">
                      {items[active].title}
                    </h3>

                    <Link href="/gallery">
                      <button className="mt-5 flex items-center gap-2">
                        Discover More
                        <ArrowUpRight size={18} />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Previous */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next */}
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === index
                    ? "w-8 bg-[#b38a55]"
                    : "w-2 bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP EXPANDING GALLERY */}
        <div className="hidden lg:flex gap-5 items-start">
          {items.map((item, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={index}
                onMouseEnter={() => setActive(index)}
                initial={{
                  opacity: 0,
                  y: 120,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {
                        opacity: 0,
                        y: 120,
                      }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                }}
                className={`
                  group cursor-pointer
                  transition-all duration-700
                  ease-[cubic-bezier(.22,1,.36,1)]
                  ${isActive ? "w-[420px]" : "w-[170px]"}
                `}
              >
                {/* Image */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className={`
                    relative overflow-hidden
                    transition-all duration-700
                    ease-[cubic-bezier(.22,1,.36,1)]
                    ${isActive ? "h-[320px]" : "h-[520px]"}
                  `}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`
                      object-cover
                      transition-all duration-700
                      ${isActive ? "scale-105" : "scale-100"}
                    `}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </motion.div>

                {/* Content */}
                <div
                  className={`
                    overflow-hidden
                    transition-all duration-700
                    ease-[cubic-bezier(.22,1,.36,1)]
                    ${
                      isActive
                        ? "max-h-[250px] opacity-100 mt-6"
                        : "max-h-0 opacity-0 mt-0"
                    }
                  `}
                >
                  <p className="uppercase tracking-[4px] text-xs text-[#b38a55] mb-4">
                    {item.category}
                  </p>

                  <h3 className="text-3xl text-[#1f1717] leading-tight">
                    {item.title}
                  </h3>

                  <Link href="/gallery">
                    <button className="mt-7 flex items-center gap-2 text-[#1f1717] group/btn cursor-pointer">
                      Discover More

                      <ArrowUpRight
                        size={18}
                        className="
                          transition-transform duration-500
                          group-hover/btn:translate-x-1
                          group-hover/btn:-translate-y-1
                        "
                      />
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}