"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Target,
  GraduationCap,
  Users,
  Lightbulb,
  Globe2,
  HeartHandshake,
} from "lucide-react";


const focusAreas = [
  {
    icon: GraduationCap,
    title: "Education Transformation",
    text:
      "Creating learning opportunities that equip individuals with knowledge, confidence, and practical skills to succeed beyond traditional academic systems.",
  },

  {
    icon: Users,
    title: "Human Capital Development",
    text:
      "Supporting people to discover their abilities, develop their talents, and become valuable contributors to their communities.",
  },

  {
    icon: Lightbulb,
    title: "Innovation & Solutions",
    text:
      "Developing creative approaches that address social challenges and create sustainable solutions for individuals and communities.",
  },

  {
    icon: Globe2,
    title: "Social Change Action",
    text:
      "Working with communities and partners to promote inclusion, empowerment, and meaningful development across society.",
  },
];


export default function VisionMission() {

  return (

    <section className="bg-[#f8f7f4] py-28 overflow-hidden">


      <div className="max-w-7xl mx-auto px-6">


        {/* HEADER */}

        <motion.div

        initial={{
          opacity:0,
          y:50
        }}

        whileInView={{
          opacity:1,
          y:0
        }}

        viewport={{
          once:true
        }}

        transition={{
          duration:.8
        }}

        className="text-center max-w-4xl mx-auto mb-20"

        >

          <p className="
          uppercase
          tracking-[5px]
          text-sm
          text-yellow-700
          mb-5
          ">
            Our Foundation
          </p>


          <h1 className="
          text-5xl
          md:text-7xl
          font-serif
          text-gray-900
          leading-tight
          ">
            Building People.
            <br/>
            Transforming Communities.
          </h1>


          <p className="
          mt-8
          text-gray-600
          text-lg
          leading-8
          ">
            Edvolve Foundation exists to discover potential, create
            opportunities, and facilitate solutions that transform lives
            through education, human capital development, and social change
            action.
          </p>


        </motion.div>






        {/* VISION MISSION */}


        <div className="
        grid
        lg:grid-cols-2
        gap-10
        mb-24
        ">


          {/* VISION */}


          <motion.div

          initial={{
            opacity:0,
            x:-80
          }}

          whileInView={{
            opacity:1,
            x:0
          }}

          viewport={{
            once:true
          }}

          transition={{
            duration:.8
          }}

          className="
          bg-white
          rounded-[40px]
          p-10
          md:p-14
          border
          border-gray-100
          shadow-sm
          "

          >


            <div className="
            w-20
            h-20
            rounded-3xl
            bg-green-50
            flex
            items-center
            justify-center
            mb-8
            ">

              <Eye
              size={40}
              className="text-yellow-700"
              />

            </div>



            <h2 className="
            text-4xl
            md:text-5xl
            font-serif
            mb-7
            ">
              Our Vision
            </h2>



            <p className="
            text-gray-600
            text-lg
            leading-9
            ">
              To build a community where ordinary people in extraordinary
              circumstances can discover their potential, overcome barriers,
              and transform into extraordinary individuals who positively
              influence their families, communities, and society.
            </p>



            <p className="
            mt-6
            text-gray-600
            text-lg
            leading-9
            ">
              We envision a world where every individual has access to the
              opportunities, resources, and support systems required to
              unlock their abilities and contribute meaningfully to human
              progress.
            </p>


          </motion.div>








          {/* MISSION */}


          <motion.div

          initial={{
            opacity:0,
            x:80
          }}

          whileInView={{
            opacity:1,
            x:0
          }}

          viewport={{
            once:true
          }}

          transition={{
            duration:.8
          }}

          className="
          bg-[#07130d]
          text-white
          rounded-[40px]
          p-10
          md:p-14
          "

          >


            <div className="
            w-20
            h-20
            rounded-3xl
            bg-white/10
            flex
            items-center
            justify-center
            mb-8
            ">


              <Target
              size={40}
              />

            </div>




            <h2 className="
            text-4xl
            md:text-5xl
            font-serif
            mb-7
            ">
              Our Mission
            </h2>



            <p className="
            text-gray-300
            text-lg
            leading-9
            ">
              Our mission is to improve the world by helping people improve
              themselves, live according to their dreams, and transform their
              aspirations into reality.
            </p>



            <p className="
            mt-6
            text-gray-300
            text-lg
            leading-9
            ">
              Through education, empowerment programs, partnerships,
              research, and community-driven initiatives, we provide
              individuals with the skills, knowledge, and opportunities
              required to solve problems and create sustainable impact.
            </p>



          </motion.div>


        </div>







        {/* BELIEF SECTION */}


        <div className="
        bg-white
        rounded-[40px]
        p-10
        md:p-16
        mb-24
        text-center
        ">


          <HeartHandshake
          size={45}
          className="mx-auto text-yellow-700 mb-6"
          />


          <h2 className="
          text-4xl
          font-serif
          mb-6
          ">
            What We Believe
          </h2>


          <p className="
          max-w-4xl
          mx-auto
          text-gray-600
          text-lg
          leading-9
          ">
            We believe every person carries unique potential waiting to be
            discovered. With the right environment, guidance, education,
            and opportunities, individuals can overcome limitations and
            become agents of positive change.
          </p>


        </div>







        {/* FOCUS AREAS */}


        <div>


          <div className="text-center mb-14">

            <p className="
            uppercase
            tracking-[4px]
            text-sm
            text-yellow-700
            mb-4
            ">
              Our Approach
            </p>


            <h2 className="
            text-5xl
            font-serif
            ">
              Areas We Create Impact
            </h2>

          </div>




          <div className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          ">


          {focusAreas.map((item,index)=>{

            const Icon=item.icon;


            return (

              <motion.div

              key={index}

              whileHover={{
                y:-10
              }}

              className="
              bg-white
              rounded-3xl
              p-8
              border
              border-gray-100
              transition
              "

              >

                <Icon
                size={35}
                className="text-yellow-700 mb-6"
                />


                <h3 className="
                text-2xl
                font-serif
                mb-4
                ">
                  {item.title}
                </h3>


                <p className="
                text-gray-600
                leading-7
                ">
                  {item.text}
                </p>


              </motion.div>

            )

          })}


          </div>


        </div>



      </div>


    </section>

  );

}