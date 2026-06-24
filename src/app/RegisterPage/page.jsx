"use client";

import React, { useState } from "react";
import {
  Users,
  Handshake,
  HeartHandshake,
  GraduationCap,
} from "lucide-react";

const roles = [
  "Mentee",
  "Mentor",
  "Volunteer",
  "Partner"
];


const opportunities = [
  {
    title: "Volunteer",
    icon: <Users size={40} />,
    description:
      "Support educational and community development projects."
  },
  {
    title: "Mentor",
    icon: <GraduationCap size={40} />,
    description:
      "Guide students, entrepreneurs and future leaders."
  },
  {
    title: "Partner",
    icon: <Handshake size={40} />,
    description:
      "Collaborate with us to drive sustainable impact."
  },
  {
    title: "Supporter",
    icon: <HeartHandshake size={40} />,
    description:
      "Help us scale programs that transform lives."
  }
];


export default function RegisterPage() {

  const [selectedRole, setSelectedRole] = useState("Mentee");


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <main>


      {/* HERO */}

      <section className="relative h-[75vh]">

        <img
          src="/pic9.png"
          alt="Get Involved"
          className="absolute inset-0 h-full w-full object-cover"
        />


        <div className="absolute inset-0 bg-black/60" />


        <div className="relative z-10 flex h-full items-center justify-center">

          <div className="max-w-4xl px-6 text-center text-white">

            <h1 className="mb-6 text-5xl font-serif md:text-7xl">
              Get Involved
            </h1>


            <p className="text-lg md:text-2xl leading-relaxed">
              Join a growing community of changemakers,
              volunteers, mentors, and partners working
              together to advance education, empowerment,
              and social transformation.
            </p>

          </div>

        </div>

      </section>




      {/* OPPORTUNITIES */}

      <section className="bg-[#f8f5f1] py-24">

        <div className="mx-auto max-w-7xl px-6">


          <div className="text-center mb-14">

            <h2 className="text-4xl font-serif text-[#231b1c]">
              Ways To Get Involved
            </h2>


            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Whether you want to volunteer your time,
              mentor young leaders, become a partner, or
              support our initiatives, there is a place
              for you.
            </p>

          </div>



          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {opportunities.map((item) => (

              <div
                key={item.title}
                className="
                                rounded-2xl
                                bg-white
                                p-8
                                shadow-sm
                                transition
                                hover:-translate-y-2
                                hover:shadow-xl
                                "
              >

                <div className="mb-5 text-[#cca63c]">
                  {item.icon}
                </div>


                <h3 className="mb-3 text-xl font-bold">
                  {item.title}
                </h3>


                <p className="text-gray-600">
                  {item.description}
                </p>


              </div>

            ))}

          </div>


        </div>

      </section>


      {/* FORM */}

      <section className="bg-white py-24 px-6">


        <div className="
                    mx-auto
                    max-w-5xl
                    rounded-3xl
                    p-8
                    shadow-xl
                    md:p-12
                ">


          <h2 className="mb-3 text-center text-4xl font-serif">
            Join Our Community
          </h2>


          <p className="mb-10 text-center text-gray-600">
            Complete the form below and become part of our mission.
          </p>




          <div className="mb-10 flex flex-wrap justify-center gap-4">


            {roles.map((role) => (

              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`
                                    rounded-full px-6 py-3 transition
                                    ${selectedRole === role
                    ?
                    "bg-[#cca63c] text-white"
                    :
                    "border"
                  }
                                `}
              >

                {role}

              </button>

            ))}


          </div>




          <form className="grid gap-6 md:grid-cols-2">


            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="rounded-lg border p-4"
            />



            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="rounded-lg border p-4"
            />



            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-lg border p-4"
            />



            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="rounded-lg border p-4"
            />



            <textarea
              name="message"
              placeholder="Tell us more..."
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="
                            rounded-lg
                            border
                            p-4
                            md:col-span-2
                            "
            />



            <button
              type="button"
              className="
                            md:col-span-2
                            bg-[#cca63c]
                            text-white
                            py-4
                            uppercase
                            tracking-[3px]
                            hover:bg-[#9c764f]
                            transition
                            "
            >

              Register as {selectedRole}

            </button>


          </form>


        </div>


      </section>





      {/* CTA */}

      <section className="bg-[#231b1c] py-24 text-center text-white">


        <h2 className="text-4xl font-serif">
          Together We Can Create Lasting Change
        </h2>


        <p className="
                    mx-auto
                    mt-6
                    max-w-2xl
                    text-gray-300
                ">
          Your skills, experience, and passion can help
          transform lives and strengthen communities.
        </p>


      </section>


    </main>
  );
}