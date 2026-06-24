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
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center py-16 group"
            >
              {/* Animated Background Number */}
              <span className="absolute text-[3rem] md:text-[6rem] font-serif text-white/10 leading-none select-none">
                <CountUp value={stat.number} isInView={inView} />
              </span>

              {/* Label */}
              <h3 className="relative z-10 text-white text-xl md:text-2xl font-serif transition-all duration-500 group-hover:text-[#c2b439]">
                {stat.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}