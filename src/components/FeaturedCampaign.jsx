"use client";

import Image from "next/image";
import { Play, Goal, HandCoins } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const progressVariant = {
  hidden: { width: 0 },
  visible: (progress) => ({
    width: `${progress}%`,
    transition: { duration: 1.2, ease: "easeOut" },
  }),
};

export default function FeaturedCampaign() {
  const progress = 75;
  const [showVideo, setShowVideo] = useState(false);



  return (
    <section className="relative overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div className="relative min-h-[600px]">

        <Image
          src="/edu6.jpeg"
          alt="Edvolve Foundation Initiative"
          fill
          className="object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 container mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <motion.div
              className="max-w-xl text-white"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >

              {/* Badge */}
              <motion.span
                variants={fadeUp}
                custom={1}
                className="inline-block bg-[#b9a443] text-white px-5 py-2 rounded-md font-medium mb-6"
              >
                Featured Initiative
              </motion.span>

              {/* Title */}
              <motion.h2
                variants={fadeUp}
                custom={2}
                className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Empowering Communities Through Sustainable Development
              </motion.h2>

              {/* Paragraph */}
              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-lg text-white/80 leading-8 mb-12"
              >
                Edvolve Foundation discovers, supports and facilitates solutions
                that transform lives through education, human capital development,
                agriculture, entrepreneurship and social change.
              </motion.p>

              {/* PROGRESS */}
              <div className="mb-10 relative h-3 bg-white/20 rounded-full overflow-hidden">

                <motion.div
                  className="h-full bg-[#b9a443] rounded-full"
                  custom={progress}
                  variants={progressVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.4 }}
                />

                {/* Bubble */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ left: `calc(${progress}% - 18px)` }}
                >

                </motion.div>
              </div>

              {/* STATS */}
              <motion.div
                className="flex flex-wrap gap-8 text-xl font-semibold mb-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >

                <motion.div variants={fadeUp} custom={4} className="flex items-center gap-2">
                  <Goal className="w-5 h-5 text-[#b9a443]" />
                  Impact: Community Development
                </motion.div>

                <motion.div variants={fadeUp} custom={5} className="flex items-center gap-2">
                  <HandCoins className="w-5 h-5 text-[#b9a443]" />
                  Focus: Sustainable Solutions
                </motion.div>

              </motion.div>

              {/* BUTTON */}
              <motion.button
                variants={fadeUp}
                custom={6}
                className="bg-[#b9a443] hover:bg-[#8f7f36] transition px-8 py-4 rounded-md font-semibold"
              >
                Explore Programs
              </motion.button>

            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={scaleIn}
            >

              <div className="relative overflow-hidden rounded-lg shadow-2xl">

                <Image
                  src="/about1.jpeg"
                  alt="Edvolve community project"
                  width={700}
                  height={500}
                  className="w-full h-auto object-cover"
                />

                {/* PLAY BUTTON */}
                <motion.button
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm bg-white/10 hover:scale-110 transition">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </span>
                </motion.button>

              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {showVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white text-3xl"
            >
              ✕
            </button>

            <video
              className="w-full rounded-lg"
              controls
              autoPlay
            >
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}