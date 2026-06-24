"use client";

import { ChevronDown } from "lucide-react";

export default function BlogHero() {
    return (
        <section className="bg-[#f7f8f5] py-32 text-center">


            {/* HERO */}

            <div className="text-center">


                <p className="
                    uppercase
                    tracking-[6px]
                    text-sm
                    text-yellow-700
                    mb-5
                ">
                    Edvolve Knowledge Hub
                </p>



                <h1 className="
                    
                    text-[#1d1820]
                    text-5xl
                    md:text-7xl
                    mb-8
                    leading-tight
                ">
                    Insights, Ideas & Stories
                    <br/>
                    For Social Transformation
                </h1>



                <p className="
                    max-w-3xl
                    mx-auto
                    text-gray-600
                    text-lg
                    leading-8
                    mb-10
                    px-6
                ">
                    Explore research, community stories, development insights
                    and impact-driven conversations focused on education,
                    entrepreneurship, agriculture, human capital development
                    and social change.
                </p>



                <ChevronDown 
                    className="
                        mx-auto
                        text-yellow-700
                        animate-bounce
                    " 
                    size={28} 
                />


            </div>


        </section>
    );
}