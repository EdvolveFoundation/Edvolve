"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import StatsSection from "./StatsSection";
import NewsandEvents from "./NewsandEvents";

const testimonials = [
  {
    quote:
      "Edvolve Foundation's innovative approach to education is truly transformative, equipping individuals with practical skills and knowledge that create lasting social change.",
    name: "Miss. Ekele Chiamaka Happiness",
    role: "Civil Service Representative",
    image: "/test1.jpeg",
  },
  {
    quote:
      "I got a free spot at the NAMSMEAC Exhibition which exposed my business to a new set of customers and boosted my sales significantly.",
    name: "Mr. Henry Nwaedo",
    role: "Business Owner",
    image: "/test2.jpeg",
  },
  {
    quote:
      "Edvolve has awakened us to what we have neglected, resulting in our suffering. Their programs inspire positive change.",
    name: "Ejiogu Michael",
    role: "Radio Presenter",
    image: "/test3.jpeg",
  },
  {
    quote:
      "The mentorship and entrepreneurship programs helped me gain confidence and practical skills for my career journey.",
    name: "John Doe",
    role: "Program Participant",
    image: "/test4.jpeg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function TestimonialSection() {
  return (
    <motion.section
      className="bg-[#252525] py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >

      {/* STATS */}
      <StatsSection />

      <div className="container mx-auto px-6">

        {/* HEADER */}
        <div className="max-w-2xl mx-auto text-center mb-16">

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            What People Say
          </motion.h2>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="w-16 h-1 bg-amber-500 mx-auto mt-4 mb-6"
          />

          <motion.p
            variants={fadeUp}
            custom={3}
            className="text-gray-50 text-lg"
          >
            Hear from participants, partners and community members whose lives
            have been impacted through our programs.
          </motion.p>
        </div>

        {/* SWIPER */}
        <motion.div
          variants={scaleIn}
          className="testimonial-wrapper"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            loop={true}
            speed={800}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            spaceBetween={30}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="bg-white rounded-lg p-8 h-[300px] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  {/* QUOTE */}
                  <p className="text-gray-600 leading-8 text-lg">
                    {item.quote}
                  </p>

                  {/* USER */}
                  <div className="flex items-center gap-4 mt-6">

                    <div className="relative w-16 h-16 border-2 border-yellow-600 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="font-bold text-lg text-gray-900">
                        {item.name}
                      </h4>

                      <p className="text-xs text-yellow-500">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* GLOBAL SWIPER STYLES */}
      <style jsx global>{`
        .testimonial-swiper {
          padding-bottom: 60px;
        }

        .testimonial-swiper .swiper-slide {
          transition: all 0.5s ease;
          opacity: 0.6;
          transform: scale(0.92);
        }

        .testimonial-swiper .swiper-slide-active,
        .testimonial-swiper .swiper-slide-next,
        .testimonial-swiper .swiper-slide-prev {
          opacity: 1;
          transform: scale(1);
        }

        .testimonial-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
        }

        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #f59e0b;
        }
      `}</style>

      <NewsandEvents />
    </motion.section>
  );
}