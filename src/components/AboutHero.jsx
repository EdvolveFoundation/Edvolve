"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
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

const zoomIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function AboutHero() {
  return (
    <section className="bg-[#303030] overflow-hidden pt-32 md:pt-40 lg:pt-52 pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* LEFT SIDE */}
          <motion.div
            className="relative flex justify-center lg:justify-start w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Gold Ring */}
            <motion.div
              variants={zoomIn}
              className="
                absolute
                w-[260px] h-[260px]
                sm:w-[320px] sm:h-[320px]
                md:w-[400px] md:h-[400px]
                lg:w-[430px] lg:h-[430px]
                border-2 border-[#b9a443]
                rounded-full
                top-4 md:top-5
                left-1/2 -translate-x-1/2
                lg:left-10 lg:translate-x-0
              "
            />

            {/* Main Image */}
            <motion.div
              variants={zoomIn}
              className="
                relative
                w-[280px] h-[280px]
                sm:w-[340px] sm:h-[340px]
                md:w-[420px] md:h-[420px]
                lg:w-[450px] lg:h-[450px]
                rounded-full
                overflow-hidden
              "
            >
              <Image
                src="/ab1.jpg"
                alt="Edvolve Foundation"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Small Image */}
            <motion.div
              variants={zoomIn}
              className="
                absolute
                bottom-0
                left-4
                sm:left-8
                lg:left-10
                w-[90px] h-[90px]
                sm:w-[120px] sm:h-[120px]
                md:w-[150px] md:h-[150px]
                lg:w-[170px] lg:h-[170px]
                rounded-full
                overflow-hidden
                border-4 border-white
                shadow-lg
              "
            >
              <Image
                src="/edu1.jpeg"
                alt="Community Impact"
                fill
                className="object-cover"
              />
            </motion.div>

         
          
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            className="text-center lg:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.span
              variants={fadeUp}
              custom={1}
              className="text-[#d8be4c] font-medium uppercase tracking-wider text-sm sm:text-base"
            >
              Welcome to Edvolve Foundation
            </motion.span>

            <motion.h2
              variants={fadeUp}
              custom={2}
              className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-bold
                text-gray-50
                mt-3
                leading-tight
              "
            >
              Empowering Change,
              <br />
              Inspiring Impact
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-gray-50 mt-6 leading-7 md:leading-8 max-w-2xl mx-auto lg:mx-0"
            >
              Edvolve Foundation discovers, supports and facilitates solutions
              that transform lives through education, human capital development
              and social change.
            </motion.p>

            {/* Highlight Box */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="bg-gray-100 border-l-4 border-[#b9a443] p-5 rounded-md mt-8"
            >
              <p className="text-gray-700">
                We are creating a community where ordinary people do
                extraordinary things through education, civic engagement and
                sustainable development.
              </p>
            </motion.div>

            <motion.button
              variants={fadeUp}
              custom={5}
              className="mt-10 bg-[#b9a443] hover:bg-[#948232] cursor-pointer text-white px-8 py-4 rounded-md font-semibold transition"
            >
              Discover More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}