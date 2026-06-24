"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  Briefcase,
  Star,
  Award,
} from "lucide-react";


const boardOfTrustees = [
  {
    fullName: "Prof. Vincent A. Asuru, MNAE, MNIM, KSM, KSS, JP.",
    role: "Chairman, Board of Trustees",
    image: "/test15.png",
    bio: "Prof. Vincent Asuru is a Professor of Educational Measurement and Evaluation at Ignatius Ajuru University of Education, Port Harcourt.",
  },

  {
    fullName: "Victor Chimenum Owhorji",
    role: "ED/Board Secretary",
    image: "/test9.png",
    bio: "Victor Owhorji is a community organiser, social innovator, change advocate, and serves as Executive Director of Edvolve Foundation",
  },
  {
    fullName: "Goodness Stephen Owhorji",
    role: "Board Member",
    image: "/test16.png",
    bio: "Goodness Owhorji is a purpose-driven professional with expertise in business development, administration, project coordination, and community development. ",
  },
  {
    fullName: "Anietie Happiness Johnson",
    role: "Board Member",
    image: "/test14.png",
    bio: "Anietie Happiness Johnson is a data analysis expert with an engineering background and experience in sales, performance management, and virtual administration.",
  },

  {
    fullName: "Chukwuma Banigo Wabara",
    role: "Board Member",
    image: "/test8.png",
    bio: "Chukwuma Banigo Wabara is an IT enthusiast and seasoned business development professional with decades of experience. ",
  },
];

const managementTeam = [
  {
    fullName: "Eugenia Igwe",
    role: " Director of Programs",
    image: "/test11.PNG",
    bio: " Program Director at Edvolve, where she leads the design, coordination, and implementation of programmes that advance education transformation, institutional growth, and human capital development.",
  },

  {
    fullName: "Sandra Omosigho",
    role: "Director of Operations",
    image: "/test13.png",
    bio: "She holds a First-Class degree in Microbiology, a Master's degree in Public Health Biotechnology, and is currently pursuing an MBA.",
  },

  {
    fullName: "Partnership Lead",
    role: "Stakeholder Engagement",
    image: "/test12.jpg",
    bio: "Manages strategic partnerships and collaborations.",
  },

];

export default function ManagementTeamPage() {

  return (

    <main className="bg-[#f8f7f4] text-gray-900">


      {/* HERO SECTION */}

      <section className="relative py-32 overflow-hidden">


        {/* BACKGROUND LAYER */}

        <div className="absolute inset-0">

          <Image
            src="/edu1.jpeg"
            alt="Management Team"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

        </div>





        {/* HERO CONTENT */}

        <div className="relative max-w-5xl mx-auto px-6 text-center text-white">


          <motion.div

            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}

          >

            <Users size={50} className="mx-auto mb-6" />

            <h1 className="text-5xl md:text-7xl font-serif mb-6">
              Our Management Team
            </h1>

            <p className="text-lg md:text-xl text-gray-200 leading-9">
              A dedicated group of leaders, researchers, strategists, and development experts
              committed to transforming lives through education, human capital development,
              and social change action.
            </p>

          </motion.div>


        </div>

      </section>








      {/* LEADERSHIP STATEMENT */}

      <section className="py-24 bg-white">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <Shield size={45} className="mx-auto text-yellow-700 mb-6" />

          <h2 className="text-4xl md:text-5xl font-serif mb-8">
            Leadership Built on Purpose
          </h2>

          <p className="text-gray-600 text-lg leading-9">
            Our management team is guided by a shared commitment to impact-driven leadership,
            accountability, transparency, and collaboration. We believe that effective leadership
            is rooted in service — serving communities, empowering people, and building sustainable systems
            for long-term development.
          </p>

        </div>

      </section>





      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif mb-4">
              Board of Trustees
            </h2>

            <p className="text-gray-600 text-lg">
              Providing strategic oversight, governance and long-term direction.
            </p>
          </div>

          {/* CHAIRMAN */}
          <div className="max-w-4xl mx-auto mb-20">
            <motion.div
              whileHover={{ y: -12 }}
              className="bg-white overflow-hidden shadow-xl"
            >
              <div className="grid lg:grid-cols-2">

                <div className="relative h-[500px]">
                  <Image
                    src={boardOfTrustees[0].image}
                    alt={boardOfTrustees[0].fullName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-10 flex flex-col justify-center">
                  <p className="uppercase tracking-widest text-sm text-[#8a6a72] mb-3">
                    {boardOfTrustees[0].role}
                  </p>

                  <h3 className="font-serif text-4xl mb-4">
                    {boardOfTrustees[0].fullName}
                  </h3>

                  <p className="text-gray-600 leading-8">
                    {boardOfTrustees[0].bio}
                  </p>
                </div>

              </div>
            </motion.div>
          </div>

          {/* OTHER TRUSTEES */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
            {boardOfTrustees.slice(1).map((member) => (
              <motion.div
                key={member.fullName}
                whileHover={{ y: -12 }}
                className="group"
              >
                <div className="bg-white overflow-hidden shadow-xl">

                  <div className="relative h-[450px] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <p className="uppercase text-[11px] text-[#8a6a72]">
                      {member.role}
                    </p>

                    <h3 className="font-serif text-2xl mt-2">
                      {member.fullName}
                    </h3>

                    <p className="text-[#5b4f50] mt-4 text-sm leading-7">
                      {member.bio}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <div className="max-w-4xl mx-auto py-12">
        <div className="h-px bg-gradient-to-r from-transparent via-[#b9a443] to-transparent" />
      </div>
      {/* TEAM GRID */}

      <section className="py-28">

        <div className="max-w-7xl mx-auto px-6">


          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif mb-4">
              Management Team
            </h2>

            <p className="text-gray-600 text-lg">
              Professionals driving Edvolve Foundation's mission forward.
            </p>
          </div>





          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
            {managementTeam.map((member) => (
              <motion.div
                key={member._id}
                whileHover={{ y: -12 }}
                className="group"
              >
                <div className="bg-white overflow-hidden shadow-xl">

                  <div className="relative h-[520px] overflow-hidden">
                    <Image
                      src={member.image || "/default.jpg"}
                      alt={member.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-8">
                    <p className="uppercase text-[11px] text-[#8a6a72]">
                      {member.role}
                    </p>

                    <h3 className="font-serif text-3xl">
                      {member.fullName}
                    </h3>

                    <p className="text-[#5b4f50] mt-4">
                      {member.bio}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </section>








      {/* VALUES SECTION */}

      <section className="bg-[#07130d] text-white py-28">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <Award size={50} className="mx-auto mb-6" />

          <h2 className="text-5xl font-serif mb-8">
            Guided by Excellence & Integrity
          </h2>

          <p className="text-gray-300 text-lg leading-9">
            Our leadership culture is built on integrity, excellence, accountability,
            innovation, and a deep commitment to community impact. Every decision we make
            is guided by the goal of building sustainable systems that empower people
            and strengthen society.
          </p>

        </div>

      </section>

    </main>
  );
}