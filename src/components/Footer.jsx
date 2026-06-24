"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";

const galleryImages = [
  "/about1.jpeg",
  "/about2.jpeg",
  "/about3.jpeg",
  "/about4.jpeg",
  "/edu1.jpeg",
  "/edu2.jpeg",
  "/edu3.jpeg",
  "/edu4.jpeg",
  "/edu5.png",
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
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

export default function Footer() {
  return (
    <motion.footer
      className="bg-[#242323] text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* MAIN FOOTER */}
      <div className="container mx-auto px-6 py-20">
        <motion.div className="grid gap-12 lg:grid-cols-4">

          {/* ABOUT */}
          <motion.div variants={fadeUp} custom={1}>
            <div className="rounded-md p-4 inline-block mb-6">
              <Image
                src="/logo.png"
                alt="Logo"
                width={180}
                height={80}
                className="object-contain"
              />
            </div>

            <p className="text-gray-300 leading-8">
              Edvolve Foundation is committed to transforming lives through
              education, human capital development, advocacy, and social change
              initiatives.
            </p>
          </motion.div>

          {/* GALLERY */}
          <motion.div variants={fadeUp} custom={2}>
            <h3 className="text-xl font-semibold mb-6">Gallery</h3>

            <div className="grid grid-cols-3 gap-3">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="relative h-20 w-full overflow-hidden rounded"
                >
                  <Image
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div variants={fadeUp} custom={3}>
            <h3 className="text-xl font-semibold mb-6">Our Pages</h3>

            <ul className="space-y-4">
              {["About Us", "Gallery", "Projects", "Programs", "Blog", "Contact"].map(
                (item, index) => (
                  <motion.li
                    key={item}
                    variants={fadeUp}
                    custom={index}
                    className="border-b border-white/10 pb-3"
                  >
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-yellow-500 transition"
                    >
                      {item}
                    </Link>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div variants={fadeUp} custom={4}>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>

            <div className="space-y-6">

              {[
                {
                  icon: HiOutlineLocationMarker,
                  text: "Plot 24, Abuja FCT, Nigeria",
                },
                {
                  icon: HiOutlineMail,
                  text: "info@edvolvefoundation.org",
                },
                {
                  icon: HiOutlinePhone,
                  text: "+234 816 377 0808",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4"
                  variants={fadeUp}
                  custom={index}
                >
                  <div className="h-12 w-12 rounded-full bg-yellow-700 flex items-center justify-center shrink-0">
                    <item.icon size={22} />
                  </div>
                  <p className="text-gray-300">{item.text}</p>
                </motion.div>
              ))}

            </div>

            {/* SOCIAL ICONS */}
            <motion.div
              className="border-t border-white/10 mt-8 pt-8 flex gap-3"
              variants={fadeUp}
              custom={5}
            >
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn].map(
                (Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="h-10 w-10 rounded-full bg-yellow-700 flex items-center justify-center hover:bg-yellow-700 transition"
                  >
                    <Icon size={16} />
                  </motion.a>
                )
              )}
            </motion.div>
          </motion.div>

        </motion.div>
      </div>

      {/* BOTTOM BAR */}
      <motion.div
        className="border-t border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Edvolve Foundation. All Rights Reserved.
          </p>
        </div>
      </motion.div>
    </motion.footer>
  );
}