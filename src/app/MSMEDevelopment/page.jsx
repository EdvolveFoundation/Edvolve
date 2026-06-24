"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  BriefcaseBusiness,
  Users,
  TrendingUp,
  GraduationCap,
  Handshake,
  Lightbulb,
  BarChart3,
  Globe2,
  ArrowRight
} from "lucide-react";



const pillars = [

{
icon: GraduationCap,
title:"Entrepreneurship Training",
text:
"We provide practical business education that equips entrepreneurs with the knowledge and skills required to start, manage and grow sustainable enterprises."
},


{
icon: BriefcaseBusiness,
title:"Business Growth Support",
text:
"We support MSMEs with tools, resources and guidance that strengthen business operations, improve productivity and create pathways for expansion."
},


{
icon: Users,
title:"Women & Youth Enterprise Development",
text:
"We promote inclusion by supporting women and youth-owned businesses with opportunities, mentorship and access to business networks."
},


{
icon: Lightbulb,
title:"Innovation & Skills Development",
text:
"We encourage creativity, innovation and adoption of modern business practices that enable entrepreneurs to compete in evolving markets."
}

];




const impact = [

{
number:"950+",
label:"Certified Graduate Trainees"
},

{
number:"600",
label:"MSMEs Empowered"
},

{
number:"20",
label:"Partner Organisations"
}

];




export default function MSMEDevelopment(){


return (

<main className="bg-[#f8f7f4] text-gray-900">





{/* HERO */}


<section className="
relative
h-[750px]
flex
items-center
overflow-hidden
">


<Image

src="/agro1.png"

alt="MSME Development"

fill

className="object-cover"

/>



<div className="
absolute
inset-0
bg-black/65
"/>




<div className="
relative
max-w-7xl
mx-auto
px-6
text-white
">


<motion.div

initial={{
opacity:0,
y:70
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.8
}}

className="max-w-4xl"

>


<p className="
uppercase
tracking-[5px]
text-sm
text-yellow-300
mb-6
">

Economic Security & Opportunity

</p>



<h1 className="
text-5xl
md:text-7xl
font-serif
leading-tight
mb-8
">

MSME
<br/>
Development Initiative

</h1>



<p className="
text-lg
md:text-xl
leading-9
text-gray-200
">

Empowering entrepreneurs, strengthening small businesses,
and creating opportunities for sustainable economic growth
through skills, mentorship and strategic support.

</p>


</motion.div>


</div>


</section>









{/* INTRODUCTION */}



<section className="
bg-white
py-28
">


<div className="
max-w-6xl
mx-auto
px-6
text-center
">


<BriefcaseBusiness

size={55}

className="
mx-auto
text-yellow-700
mb-7
"

/>



<h2 className="
text-5xl
font-serif
mb-8
">

Building Stronger Businesses.
Creating Economic Opportunities.

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

Micro, Small and Medium Enterprises are essential drivers of
employment, innovation and economic development. Edvolve
Foundation supports entrepreneurs by providing access to
knowledge, networks, mentorship and opportunities that help
businesses grow.

</p>



<p className="
mt-6
text-gray-600
text-lg
leading-9
">

Through our MSME development initiatives, we help individuals
transform ideas into sustainable businesses while promoting
financial inclusion and economic empowerment.

</p>


</div>


</section>









{/* IMAGE SECTION */}



<section className="
py-24
">


<div className="
max-w-7xl
mx-auto
px-6
grid
lg:grid-cols-2
gap-14
items-center
">



<div className="
relative
h-[550px]
rounded-[40px]
overflow-hidden
">


<Image

src="/ab7.png"

alt="Business owners"

fill

className="object-cover"

/>


</div>






<div>


<p className="
uppercase
tracking-[4px]
text-sm
text-yellow-700
mb-5
">

Our Purpose

</p>



<h2 className="
text-5xl
font-serif
mb-7
">

Helping Entrepreneurs Build Sustainable Futures

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

Many entrepreneurs struggle with limited access to knowledge,
resources, markets and professional networks. Our programs are
designed to close these gaps by providing practical support
that enables businesses to survive and grow.

</p>



<p className="
mt-6
text-gray-600
text-lg
leading-9
">

We believe empowered entrepreneurs create jobs, strengthen
communities and contribute significantly to national development.

</p>


</div>


</div>


</section>









{/* PROGRAM PILLARS */}



<section className="
bg-white
py-28
">


<div className="
max-w-7xl
mx-auto
px-6
">


<div className="
text-center
mb-16
">


<h2 className="
text-5xl
font-serif
">

Our MSME Support Areas

</h2>


<p className="
text-gray-600
text-lg
mt-5
">

Providing entrepreneurs with the tools required for growth.

</p>


</div>





<div className="
grid
md:grid-cols-2
gap-8
">


{

pillars.map((item,index)=>{


const Icon=item.icon;


return(

<motion.div

key={index}

whileHover={{
y:-10
}}

className="
bg-[#f8f7f4]
rounded-3xl
p-10
"


>


<Icon

size={45}

className="
text-yellow-700
mb-6
"

/>



<h3 className="
text-3xl
font-serif
mb-5
">

{item.title}

</h3>



<p className="
text-gray-600
leading-8
">

{item.text}

</p>


</motion.div>


)


})

}


</div>


</div>


</section>









{/* NAMSMEAC */}



<section className="
bg-[#07130d]
text-white
py-28
">


<div className="
max-w-7xl
mx-auto
px-6
grid
lg:grid-cols-2
gap-14
items-center
">



<div>


<Handshake

size={50}

className="mb-6"

/>



<h2 className="
text-5xl
font-serif
mb-8
">

National MSME Accelerator Conference

</h2>



<p className="
text-gray-300
text-lg
leading-9
">

The National MSME Accelerator Conference was created to
support and promote women and youth-owned businesses by
providing platforms for learning, networking, exhibitions and
business growth opportunities.

</p>



<p className="
mt-6
text-gray-300
text-lg
leading-9
">

The conference provides comprehensive training and mentorship
covering business planning, financial management, agriculture,
real estate, technology skills and career development.

</p>


</div>






<div className="
relative
h-[450px]
rounded-[40px]
overflow-hidden
">


<Image

src="/ent1.png"

alt="MSME training"

fill

className="object-cover"

/>


</div>


</div>


</section>









{/* IMPACT */}



<section className="
bg-yellow-700
text-white
py-24
">


<div className="
max-w-7xl
mx-auto
px-6
grid
md:grid-cols-3
gap-10
text-center
">


{

impact.map((item,index)=>(


<div key={index}>


<h3 className="
text-6xl
font-serif
mb-4
">

{item.number}

</h3>


<p className="
text-xl
text-green-100
">

{item.label}

</p>


</div>


))

}


</div>


</section>









{/* FUTURE */}



<section className="
py-28
">


<div className="
max-w-5xl
mx-auto
px-6
text-center
">


<Globe2

size={50}

className="
mx-auto
text-yellow-700
mb-6
"

/>



<h2 className="
text-5xl
font-serif
mb-8
">

Growing A Stronger Enterprise Ecosystem

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

Edvolve Foundation continues to build partnerships that
connect entrepreneurs with opportunities, resources and
support systems required to create resilient businesses and
contribute to economic development.

</p>


<button className="
mt-10
bg-yellow-700
text-white
px-8
py-4
rounded-full
inline-flex
items-center
gap-3
">

Partner With Us

<ArrowRight size={18}/>

</button>


</div>


</section>



</main>

)

}