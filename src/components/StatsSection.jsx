"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    number: 2600,
    label: "Farmers Trained"
  },
  {
    number: 950,
    label: "Graduates Empowered"
  },
  {
    number: 600,
    label: "MSMEs Supported"
  },
  {
    number: 645,
    label: "Students Reached"
  },
];

function CountUp({ value, isInView }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const controls = animate(count, isInView ? value : 0, {
      duration: 2,
      ease: "easeOut",
    });

    return controls.stop;
  }, [isInView, value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function StatsSection() {
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: false, // animate every time scroll in/out
  });

  return (
    <section ref={ref} className=" py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center text-center py-10 md:py-16 px-3 group"
            >
              {/* Animated Background Number */}
              <span className="absolute text-[2.8rem] sm:text-[3.5rem] md:text-[6rem] font-serif text-white/10 leading-none select-none">
                <CountUp value={stat.number} isInView={inView} />
              </span>

              {/* Label */}
              <h3 className="relative z-10 text-center text-sm sm:text-base md:text-2xl text-white/60 font-serif leading-snug transition-all duration-500 group-hover:text-[#c2b439]">
                {stat.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}