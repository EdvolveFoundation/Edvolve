"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  Award,
} from "lucide-react";

export default function ManagementTeamPage() {
  const [staffMembers, setStaffMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadStaff() {
      try {
        const response = await fetch("/api/staff", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load staff.");
        }

        const data = await response.json();

        if (isMounted) {
          setStaffMembers(data.staff || []);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadStaff();

    return () => {
      isMounted = false;
    };
  }, []);

  const { boardOfTrustees, managementTeam } = useMemo(() => {
    return {
      boardOfTrustees: staffMembers.filter(
        (member) => member.category === "board"
      ),
      managementTeam: staffMembers.filter(
        (member) => member.category !== "board"
      ),
    };
  }, [staffMembers]);

  const featuredTrustee =
    boardOfTrustees.find((member) => member.featured) ||
    boardOfTrustees[0];
  const otherTrustees = featuredTrustee
    ? boardOfTrustees.filter(
        (member) => member._id !== featuredTrustee._id
      )
    : [];



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

          {isLoading && (
            <p className="mb-10 text-center text-gray-500">
              Loading team members...
            </p>
          )}

          {loadError && (
            <p className="mb-10 text-center text-red-600">
              {loadError}
            </p>
          )}

          {featuredTrustee && (
            <div className="max-w-4xl mx-auto mb-20">
              <motion.div
                whileHover={{ y: -12 }}
                className="bg-white overflow-hidden shadow-xl"
              >
                <div className="grid lg:grid-cols-2">

                  <div className="relative h-[500px]">
                    <Image
                      src={featuredTrustee.image || "/logo.png"}
                      alt={featuredTrustee.fullName}
                      fill
                      unoptimized={Boolean(featuredTrustee.image?.startsWith("http"))}
                      className="object-cover"
                    />
                  </div>

                  <div className="p-10 flex flex-col justify-center">
                    <p className="uppercase tracking-widest text-sm text-[#8a6a72] mb-3">
                      {featuredTrustee.role}
                    </p>

                    <h3 className="font-serif text-4xl mb-4">
                      {featuredTrustee.fullName}
                    </h3>

                    {featuredTrustee.bio && (
                      <p className="text-gray-600 leading-8">
                        {featuredTrustee.bio}
                      </p>
                    )}
                  </div>

                </div>
              </motion.div>
            </div>
          )}

          {/* OTHER TRUSTEES */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
            {otherTrustees.map((member) => (
              <motion.div
                key={member.fullName}
                whileHover={{ y: -12 }}
                className="group"
              >
                <div className="bg-white overflow-hidden shadow-xl">

                  <div className="relative h-[280px] overflow-hidden">
                    <Image
                      src={member.image || "/logo.png"}
                      alt={member.fullName}
                      fill
                      unoptimized={Boolean(member.image?.startsWith("http"))}
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


                  </div>

                </div>
              </motion.div>
            ))}

            {!boardOfTrustees.length && !isLoading && (
              <div className="rounded-2xl bg-white p-8 text-center text-gray-500 xl:col-span-4">
                No board members have been added yet.
              </div>
            )}
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
              Professionals driving Edvolve Foundation&apos;s mission forward.
            </p>
          </div>





          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
            {managementTeam.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -12 }}
                className="group"
              >
                <div className="bg-white overflow-hidden shadow-xl">

                  <div className="relative h-[280px] overflow-hidden">
                    <Image
                      src={member.image || "/logo.png"}
                      alt={member.fullName}
                      fill
                      unoptimized={Boolean(member.image?.startsWith("http"))}
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

                    
                  </div>

                </div>
              </motion.div>
            ))}

            {!managementTeam.length && !isLoading && (
              <div className="rounded-2xl bg-white p-8 text-center text-gray-500 xl:col-span-4">
                No management team members have been added yet.
              </div>
            )}
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
