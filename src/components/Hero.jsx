"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const heroImages = [
  { src: "/pic1.jpg", alt: "Education Program" },
  { src: "/pic2.jpg", alt: "Farmer Training" },
  { src: "/pic6.jpg", alt: "Women Empowerment" },
  { src: "/pic4.jpg", alt: "Community Development" },
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

export default function Hero() {
  return (
    <section className="relative overflow-x-hidden bg-white min-h-screen pb-12">

      {/* MAP BACKGROUND */}
      <div className="absolute right-0 top-70 w-[600px] h-[600px] opacity-10">
        <Image src="/map.png" alt="Nigeria map" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-6 py-16 lg:px-12">

        {/* TEXT BLOCK */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1 className="leading-none">
            <motion.span
              variants={fadeUp}
              custom={1}
              className="block text-5xl md:text-6xl lg:text-8xl font-light text-gray-700"
            >
              Empowering Change,
            </motion.span>

            <motion.span
              variants={fadeUp}
              custom={2}
              className="flex items-center gap-4 text-5xl md:text-6xl lg:text-8xl font-bold text-gray-900 mt-2"
            >
              <div className="h-1 w-14 bg-yellow-700" />
              Inspiring Hope
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={3}
            className="mt-8 max-w-2xl text-sm text-gray-600"
          >
            We transform lives through education, human capital development,
            civic engagement, entrepreneurship, and sustainable community
            development across Nigeria.
          </motion.p>
        </motion.div>

       {/* MOBILE IMAGE */}
<motion.div
  variants={scaleIn}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  className="lg:hidden mt-10 flex justify-center"
>
  <div className="relative w-[300px] h-[360px]">
    
    {/* Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 blur-3xl rounded-full" />

    {/* Decorative Circle */}
    <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-600/10 rounded-full border border-blue-500/20" />

    {/* Main Image Card */}
    <div className="relative h-full overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-white">
      <Image
        src="/edu1.jpeg"
        alt="Education"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <p className="text-sm font-medium text-blue-300">
          Empowering Education
        </p>
        <h3 className="text-xl font-bold">
          Building Future Leaders
        </h3>
      </div>
    </div>
  </div>
</motion.div>

        {/* DESKTOP GALLERY */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="hidden lg:flex mt-12 justify-center"
        >
          <div className="hero-gallery flex gap-4">
            {heroImages.map((image, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="hero-card relative w-[180px] h-[240px]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-xl"
                  priority={index === 0}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}