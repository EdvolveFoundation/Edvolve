"use client"


import {
  GraduationCap,
  Megaphone,
  BriefcaseBusiness,
  Leaf,
} from "lucide-react";

export default function FeatureBar() {
  const features = [
    {
      icon: GraduationCap,
      title: "Education & Human Capital",
      desc: "Skills development and workforce readiness",
    },
    {
      icon: Megaphone,
      title: "Social Change",
      desc: "Advocacy, governance and civic engagement",
    },
    {
      icon: BriefcaseBusiness,
      title: "Economic Opportunity",
      desc: "MSME growth and entrepreneurship",
    },
    {
      icon: Leaf,
      title: "Sustainable Future",
      desc: "Climate action and resilient communities",
    },
  ];

  return (
    <section className="relative z-30 px-4 lg:px-8 -mb-23">
      <div className="max-w-7xl mx-auto">

        <div className="bg-[#171717] rounded-[40px] shadow-2xl overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">

            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon
                      size={22}
                      className="text-[#b9a443]"
                    />

                    <span className="text-[#b9a443] text-xs uppercase tracking-[3px]">
                      Focus Area
                    </span>
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}

            {/* CTA */}
            <div className="flex items-center justify-center p-6">
              <button className="bg-[#b9a443] hover:bg-[#928239] transition text-black font-semibold px-10 py-4 rounded-full w-full lg:w-auto">
                Explore Programs
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}