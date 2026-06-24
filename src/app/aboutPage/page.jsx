"use client";

import { motion } from "framer-motion";
import {
    Users,
    BookOpen,
    Lightbulb,
    Globe2,
    HeartHandshake,
    Building2,
    Target,
    Scale,
    Leaf,
} from "lucide-react";


const partnerships = [
    "National Development",
    "Governance",
    "Cultural Development",
    "Human Rights",
    "Climate Change",
    "Environmental Concerns",
];


export default function AboutPage() {

    return (

        <main className="bg-[#f8f7f4] text-gray-900">


            {/* HERO SECTION */}

            <section className="py-28">

                <div className="max-w-7xl mx-auto px-6">

                    <motion.div

                        initial={{
                            opacity: 0,
                            y: 50
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            duration: .8
                        }}

                        className="max-w-5xl"

                    >

                        <p className="
            uppercase
            tracking-[5px]
            text-sm
            text-yellow-700
            mb-6
            ">
                            About Edvolve Foundation
                        </p>


                        <h1 className="
            text-5xl
            md:text-7xl
            font-serif
            leading-tight
            mb-8
            ">
                            Creating Solutions.
                            <br />
                            Transforming Lives.
                        </h1>



                        <p className="
            text-xl
            text-gray-600
            leading-9
            ">
                            Edvolve Foundation discovers, streamlines, supports and
                            facilitates solutions that transform lives through Education,
                            Human Capital Development and Social Change Action.
                        </p>


                    </motion.div>


                </div>

            </section>







            {/* ABOUT FOUNDATION */}


            <section className="bg-white py-24">


                <div className="max-w-7xl mx-auto px-6">


                    <div className="
          grid
          lg:grid-cols-2
          gap-14
          ">


                        <motion.div

                            initial={{
                                opacity: 0,
                                x: -60
                            }}

                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}

                            viewport={{
                                once: true
                            }}

                            className="space-y-6"

                        >

                            <p className="
              uppercase
              tracking-[4px]
              text-sm
              text-yellow-700
              ">
                                Who We Are
                            </p>


                            <h2 className="
              text-5xl
              font-serif
              leading-tight
              ">
                                Building People.
                                Transforming Communities.
                            </h2>



                            <p className="
              text-gray-600
              text-lg
              leading-9
              ">
                                Edvolve Foundation discovers, streamlines, supports and
                                facilitates solutions that transform lives through Education,
                                Human Capital Development and Social Change Action.
                            </p>


                            <p className="
              text-gray-600
              text-lg
              leading-9
              ">
                                We believe that every person has the potential to create
                                meaningful impact when provided with the right knowledge,
                                opportunities and support systems.
                            </p>


                        </motion.div>






                        <motion.div

                            initial={{
                                opacity: 0,
                                x: 60
                            }}

                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}

                            viewport={{
                                once: true
                            }}

                            className="
            bg-[#07130d]
            text-white
            rounded-[40px]
            p-10
            md:p-14
            "

                        >


                            <HeartHandshake
                                size={45}
                                className="mb-8"
                            />


                            <h3 className="
              text-4xl
              font-serif
              mb-6
              ">
                                Our Belief
                            </h3>


                            <p className="
              text-gray-300
              leading-8
              text-lg
              ">
                                We are creating a community where ordinary people can do
                                extraordinary things. We believe empowerment begins when
                                individuals discover their abilities and receive the support
                                required to transform their potential into reality.
                            </p>


                        </motion.div>


                    </div>


                </div>


            </section>








            {/* OUR APPROACH */}


            <section className="py-24">


                <div className="max-w-7xl mx-auto px-6">


                    <div className="text-center mb-16">


                        <p className="
            uppercase
            tracking-[4px]
            text-sm
            text-yellow-700
            ">
                            Our Approach
                        </p>


                        <h2 className="
            text-5xl
            font-serif
            mt-4
            ">
                            Listening First.
                            Creating Solutions.
                        </h2>


                    </div>





                    <div className="
          bg-white
          rounded-[40px]
          p-10
          md:p-16
          ">


                        <p className="
            text-gray-600
            text-lg
            leading-9
            ">
                            We start by listening to local people, understanding what their
                            challenges are and identifying what solutions best meet their
                            needs.
                        </p>



                        <p className="
            mt-6
            text-gray-600
            text-lg
            leading-9
            ">
                            We then bring these findings to our Learning Lab and Resource
                            Centre where ideas are developed, sharpened, tested, executed,
                            monitored and improved through feedback and impact responses.
                        </p>



                        <p className="
            mt-6
            text-gray-600
            text-lg
            leading-9
            ">
                            Our strategies and methodologies continue to evolve as we learn
                            from communities, partners and changing social realities.
                        </p>


                    </div>


                </div>


            </section>








            {/* PARTNERSHIP SECTION */}


            <section className="bg-white py-24">


                <div className="max-w-7xl mx-auto px-6">


                    <div className="
          grid
          lg:grid-cols-2
          gap-14
          items-center
          ">


                        <div>


                            <Building2
                                size={45}
                                className="text-yellow-700 mb-6"
                            />


                            <h2 className="
              text-5xl
              font-serif
              mb-6
              ">
                                Partnerships For Greater Impact
                            </h2>


                            <p className="
              text-gray-600
              text-lg
              leading-9
              ">
                                Today, our partners include over 15 stakeholder
                                organisations focused on various fields of national
                                development, governance, cultural development, human
                                rights, climate change and other social and environmental
                                concerns.
                            </p>


                        </div>




                        <div className="
            grid
            grid-cols-2
            gap-5
            ">


                            {partnerships.map((item, index) => (

                                <div
                                    key={index}
                                    className="
              bg-[#f8f7f4]
              rounded-2xl
              p-6
              text-center
              "
                                >

                                    <Globe2
                                        size={25}
                                        className="mx-auto mb-3 text-yellow-700"
                                    />

                                    <p className="text-sm font-medium">
                                        {item}
                                    </p>


                                </div>

                            ))}


                        </div>


                    </div>


                </div>


            </section>



            {/* INTERMEDIARY ROLE */}

            <section className="py-24">

                <div className="max-w-7xl mx-auto px-6">


                    <div className="
          grid
          lg:grid-cols-2
          gap-10
          ">


                        <motion.div

                            initial={{
                                opacity: 0,
                                y: 50
                            }}

                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}

                            viewport={{
                                once: true
                            }}

                            className="
            bg-[#07130d]
            text-white
            rounded-[40px]
            p-10
            md:p-14
            "

                        >

                            <Users
                                size={45}
                                className="mb-7"
                            />


                            <h2 className="
              text-4xl
              font-serif
              mb-6
              ">
                                Creating Access Through Inclusion
                            </h2>


                            <p className="
              text-gray-300
              leading-9
              text-lg
              ">
                                We work with our partners as intermediaries, providing a
                                one-stop-shop service where individuals and local businesses,
                                especially underserved communities and those in rural areas,
                                can access services and participate in mainstream industries.
                            </p>


                            <p className="
              mt-6
              text-gray-300
              leading-9
              text-lg
              ">
                                Our intermediary role promotes inclusion, equality and social
                                justice by connecting people with opportunities, resources,
                                institutions and development support.
                            </p>


                        </motion.div>






                        <motion.div

                            initial={{
                                opacity: 0,
                                y: 50
                            }}

                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}

                            viewport={{
                                once: true
                            }}

                            className="
            bg-white
            rounded-[40px]
            p-10
            md:p-14
            border
            border-gray-100
            "

                        >


                            <Lightbulb
                                size={45}
                                className="text-yellow-700 mb-7"
                            />


                            <h2 className="
              text-4xl
              font-serif
              mb-6
              ">
                                Raising Change Makers
                            </h2>


                            <p className="
              text-gray-600
              leading-9
              text-lg
              ">
                                Our platform is designed to raise change makers, build an
                                informed society, give a voice to the voiceless, enhance
                                creativity, promote inclusivity and advance equity.
                            </p>


                            <p className="
              mt-6
              text-gray-600
              leading-9
              text-lg
              ">
                                Our community focuses on advancing education, promoting civic
                                engagement and building a sustainable future where individuals
                                and communities can thrive.
                            </p>


                        </motion.div>


                    </div>


                </div>


            </section>








            {/* OBJECTIVES */}

            <section className="bg-white py-28">


                <div className="max-w-7xl mx-auto px-6">


                    <div className="text-center mb-16">


                        <p className="
            uppercase
            tracking-[5px]
            text-sm
            text-yellow-700
            ">
                            Our Objectives
                        </p>


                        <h2 className="
            text-5xl
            font-serif
            mt-5
            ">
                            Areas Driving Our Impact
                        </h2>


                    </div>





                    <div className="space-y-10">



                        {/* OBJECTIVE ONE */}


                        <div className="
            bg-[#f8f7f4]
            rounded-[35px]
            p-10
            md:p-14
            ">


                            <div className="flex gap-5 items-center mb-6">


                                <BookOpen
                                    className="text-yellow-700"
                                    size={40}
                                />


                                <h3 className="
                text-3xl
                md:text-4xl
                font-serif
                ">
                                    Advancing Education and Human Capital Development
                                </h3>


                            </div>



                            <p className="
              text-gray-600
              text-lg
              leading-9
              ">
                                We expand access to quality education, lifelong learning,
                                and skills development to enhance workforce readiness,
                                leadership, and self-reliance.
                            </p>


                            <p className="
              mt-5
              text-gray-600
              text-lg
              leading-9
              ">
                                We foster innovation, research and ethical values that drive
                                individual growth and societal progress. Through our programs,
                                we prepare people with the knowledge, confidence and practical
                                skills required to solve problems and create opportunities.
                            </p>


                        </div>






                        {/* OBJECTIVE TWO */}


                        <div className="
            bg-[#07130d]
            text-white
            rounded-[35px]
            p-10
            md:p-14
            ">


                            <div className="flex gap-5 items-center mb-6">


                                <Scale
                                    size={40}
                                />


                                <h3 className="
                text-3xl
                md:text-4xl
                font-serif
                ">
                                    Driving Social Change and Good Governance
                                </h3>


                            </div>



                            <p className="
              text-gray-300
              text-lg
              leading-9
              ">
                                We promote civic engagement, social justice and human rights
                                while strengthening governance through transparency,
                                accountability and institutional collaboration.
                            </p>



                            <p className="
              mt-5
              text-gray-300
              text-lg
              leading-9
              ">
                                We champion cultural identity, creativity and national unity
                                to foster equitable and inclusive communities where everyone
                                has the opportunity to participate and contribute.
                            </p>


                        </div>







                        {/* OBJECTIVE THREE */}


                        <div className="
            bg-[#f8f7f4]
            rounded-[35px]
            p-10
            md:p-14
            ">


                            <div className="flex gap-5 items-center mb-6">


                                <Leaf
                                    size={40}
                                    className="text-yellow-700"
                                />


                                <h3 className="
                text-3xl
                md:text-4xl
                font-serif
                ">
                                    Building A Sustainable Future
                                </h3>


                            </div>



                            <p className="
              text-gray-600
              text-lg
              leading-9
              ">
                                We advocate for policies and initiatives that promote
                                environmental sustainability, economic empowerment and social
                                wellbeing.
                            </p>



                            <p className="
              mt-5
              text-gray-600
              text-lg
              leading-9
              ">
                                We support education, security, healthcare, food security,
                                energy transition and climate action to build resilient,
                                thriving and informed societies.
                            </p>


                        </div>



                    </div>


                </div>


            </section>









            {/* INITIATIVES */}


            <section className="py-28">


                <div className="max-w-7xl mx-auto px-6">


                    <div className="text-center mb-16">


                        <p className="
            uppercase
            tracking-[5px]
            text-sm
            text-green-700
            ">
                            Our Initiatives
                        </p>


                        <h2 className="
            text-5xl
            font-serif
            mt-5
            ">
                            Programs Creating Change
                        </h2>


                    </div>





                    <div className="
          grid
          md:grid-cols-2
          gap-8
          ">




                        <InitiativeCard

                            title="Education and Empowerment"

                            text="
            We bridge the gap between academic learning and the employment
            market by preparing students for real-life challenges outside
            the school environment. We help people discover their passion,
            develop confidence, build skills and make informed decisions
            towards their ambitions.

            Through mentorship programs, we connect students, creatives and
            business owners with experienced mentors so they can avoid years
            of trial and error while pursuing their goals.

            We also promote educational development reforms and support
            teachers through our train-the-trainers initiatives.
            "

                        />





                        <InitiativeCard

                            title="Social Change and Advocacy"

                            text="
            We carry out social change actions in human rights and support
            policies that improve people's lives.

            We promote the interests of rural communities whose voices are
            rarely heard by giving them representation and creating platforms
            for participation.

            Our advocacy strategies help transform policies and services that
            affect displaced and underserved people at community and national
            levels.

            We advocate for accountability, support government programs,
            and educate citizens about opportunities available for development.
            "

                        />





                        <InitiativeCard

                            title="Service Delivery and Reforms"

                            text="
            We engage community leaders, stakeholders, agencies and policy
            makers to develop better programs and discussions that improve
            services.

            We serve as intermediaries between institutions and the people
            they serve to promote equity and access, especially for underserved
            and underbanked communities.

            We also provide consulting and training services to undergraduates,
            institutions, corporate organisations and community leaders.
            "

                        />






                        <InitiativeCard

                            title="Economic Security and Opportunity"

                            text="
            In a world where millions face poverty, hunger and unemployment,
            Edvolve Foundation recognises the importance of empowering people
            through sustainable and equitable opportunities.

            We focus on human capital development to enable individuals to
            become self-reliant.

            We support entrepreneurship, MSME development, economic transition,
            agricultural advancement and energy solutions that contribute to
            national development.
            "

                        />


                    </div>


                </div>


            </section>








            {/* FINAL SECTION */}


            <section className="
      bg-[#07130d]
      text-white
      py-28
      ">


                <div className="
        max-w-5xl
        mx-auto
        px-6
        text-center
        ">


                    <Target
                        size={50}
                        className="mx-auto mb-8"
                    />


                    <h2 className="
          text-5xl
          md:text-6xl
          font-serif
          mb-8
          ">
                        Creating A Sustainable Future Together
                    </h2>


                    <p className="
          text-gray-300
          text-lg
          leading-9
          ">
                        Edvolve Foundation continues to develop programs and partnerships
                        that empower people, strengthen communities and create sustainable
                        solutions across education, social development, climate action,
                        economic opportunity and human advancement.
                    </p>


                    <p className="
          mt-6
          text-gray-300
          text-lg
          leading-9
          ">
                        Together with our partners, volunteers and communities, we are
                        building a society where ordinary people are empowered to achieve
                        extraordinary things.
                    </p>


                </div>


            </section>


        </main>

    );
}





function InitiativeCard({ title, text }) {

    return (

        <div className="
bg-white
rounded-[35px]
p-10
border
border-gray-100
shadow-sm
">


            <h3 className="
text-3xl
font-serif
mb-6
">
                {title}
            </h3>


            <p className="
text-gray-600
leading-8
whitespace-pre-line
">
                {text}
            </p>


        </div>

    )

}