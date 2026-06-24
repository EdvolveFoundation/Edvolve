"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Sprout, Lightbulb, Users, Globe2 } from "lucide-react";

const milestones = [
  {
    year: "2021",
    title: "Academic Transformation Initiative",
    icon: GraduationCap,
    text:
      "Edvolve Foundation approached Ken Saro-Wiwa Polytechnic, Rivers State, Nigeria to integrate our programs and courses into the school system. Using the institution's facilities, we began equipping students with practical knowledge, skills, and tools needed for real-world challenges.",
  },

  {
    year: "2022",
    title: "Agrodev Sustainable Development Program",
    icon: Sprout,
    text:
      "We launched Agrodev to promote sustainable solutions for national development through agricultural advancement, economic transition, diversification, and the export of non-oil products.",
  },

  {
    year: "2023",
    title: "Skills Development & Rural Education Advancement",
    icon: Lightbulb,
    text:
      "We created the Skill Development and Entrepreneurship Program alongside the Rural Educational Advancement Program (REAP) to encourage inclusion, talent development, entrepreneurship, and improved educational opportunities.",
  },

  {
    year: "2024",
    title: "Supporting SMEs & Community Development",
    icon: Users,
    text:
      "Edvolve Foundation curated and facilitated NAMSMEAC, a conference and exhibition designed to support and promote women and youth-owned SMEs in the FCT. We continued developing programs addressing climate concerns, child education, MSME growth, health support, and other social challenges.",
  },
];


export default function HistoryPage() {
  return (
    <main className="bg-[#f8f7f4] text-gray-900">


      {/* HERO */}

      <section className="py-28">

        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{
              opacity:0,
              y:50
            }}
            animate={{
              opacity:1,
              y:0
            }}
            transition={{
              duration:0.8
            }}
            className="max-w-4xl"
          >

            <p className="
            uppercase
            tracking-[5px]
            text-sm
            text-yellow-700
            mb-6
            ">
              Our Journey
            </p>


            <h1 className="
            text-5xl
            md:text-7xl
            font-serif
            leading-tight
            mb-8
            ">
              The History Behind
              <br/>
              Edvolve Foundation
            </h1>


            <p className="
            text-lg
            md:text-xl
            text-gray-600
            leading-9
            ">
              From a student empowerment initiative to a national development
              organization, Edvolve Foundation continues to create solutions
              that transform lives through education, human capital development,
              and social change action.
            </p>

          </motion.div>

        </div>

      </section>




      {/* STORY */}

      <section className="bg-white py-24">

        <div className="max-w-5xl mx-auto px-6">


          <div className="
          grid
          md:grid-cols-2
          gap-12
          items-center
          ">


            <div>

              <BookOpen 
                size={50}
                className="text-yellow-700 mb-6"
              />

              <h2 className="
              text-4xl
              font-serif
              mb-6
              ">
                Where It All Began
              </h2>


              <p className="
              text-gray-600
              leading-8
              ">
                Edvolve Foundation grew out of the Students Life Class
                Program, an initiative created to help undergraduates
                discover, understand, and maximize their potential.
                Through this experience, we identified a major challenge:
                many students graduate without clarity, purpose, or the
                confidence needed to navigate life beyond academics.
              </p>

            </div>



            <div className="
            bg-[#f4f1ea]
            rounded-3xl
            p-10
            ">

              <Globe2 
              className="text-yellow-700 mb-5"
              size={45}
              />


              <p className="
              text-gray-700
              leading-8
              ">
                We believe education should go beyond earning certificates.
                It should prepare individuals to solve problems, create value,
                and contribute meaningfully to society.
              </p>

            </div>


          </div>


        </div>

      </section>





      {/* TIMELINE */}

      <section className="py-28">

        <div className="max-w-6xl mx-auto px-6">


          <div className="text-center mb-16">

            <p className="
            uppercase
            tracking-[4px]
            text-sm
            text-yellow-700
            mb-4
            ">
              Our Milestones
            </p>


            <h2 className="
            text-5xl
            font-serif
            ">
              Growing Through Impact
            </h2>

          </div>




          <div className="space-y-12">


          {milestones.map((item,index)=>{

            const Icon=item.icon;


            return (

              <motion.div
              key={index}

              initial={{
                opacity:0,
                y:40
              }}

              whileInView={{
                opacity:1,
                y:0
              }}

              viewport={{
                once:true
              }}

              transition={{
                duration:.7,
                delay:index*.1
              }}

              className="
              grid
              md:grid-cols-[150px_1fr]
              gap-8
              "
              >


                <div className="
                text-5xl
                font-serif
                text-yellow-700
                ">
                  {item.year}
                </div>


                <div className="
                bg-white
                rounded-3xl
                p-8
                shadow-sm
                border
                border-gray-100
                ">


                  <Icon 
                  size={35}
                  className="text-yellow-700 mb-5"
                  />


                  <h3 className="
                  text-3xl
                  font-serif
                  mb-4
                  ">
                    {item.title}
                  </h3>


                  <p className="
                  text-gray-600
                  leading-8
                  ">
                    {item.text}
                  </p>


                </div>


              </motion.div>

            )

          })}


          </div>


        </div>

      </section>





      {/* CLOSING */}

      <section className="
      bg-[#07130d]
      text-white
      py-24
      ">


        <div className="
        max-w-4xl
        mx-auto
        px-6
        text-center
        ">


          <h2 className="
          text-4xl
          md:text-5xl
          font-serif
          mb-6
          ">
            Building A Future Of Possibility
          </h2>


          <p className="
          text-gray-300
          leading-8
          text-lg
          ">
            With a dedicated team, passionate volunteers, and committed
            partners, Edvolve Foundation continues to develop innovative
            programs across education, climate action, entrepreneurship,
            healthcare, and community development.
          </p>


        </div>


      </section>



    </main>
  );
}