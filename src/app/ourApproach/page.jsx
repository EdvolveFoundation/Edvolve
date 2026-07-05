"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Handshake,
  SlidersHorizontal,
  HeartHandshake,
  Users,
  Lightbulb,
  GraduationCap,
  Network,
} from "lucide-react";


const approachSteps = [
  {
    icon: Search,
    title: "Discover",
    text:
      "We discover challenges and opportunities by collecting reliable information, listening to communities and understanding the realities affecting people's lives.",
  },

  {
    icon: Handshake,
    title: "Facilitate",
    text:
      "We connect people, institutions, resource centres and stakeholders to create pathways that support meaningful development solutions.",
  },

  {
    icon: SlidersHorizontal,
    title: "Streamline",
    text:
      "We refine ideas, research findings and community needs into structured strategies, programs and methodologies that create measurable impact.",
  },

  {
    icon: HeartHandshake,
    title: "Support",
    text:
      "We provide the knowledge, partnerships and resources needed to empower individuals and communities to achieve sustainable growth.",
  },
];


export default function OurApproach(){


return (

<main className="bg-[#f8f7f4] text-gray-900">


{/* HERO */}

<section className="
relative
py-28
overflow-hidden
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


<motion.div

initial={{
opacity:0,
x:-60
}}

animate={{
opacity:1,
x:0
}}

transition={{
duration:.8
}}

>


<p className="
uppercase
tracking-[5px]
text-sm
text-yellow-700
mb-6
">
Our Approach
</p>


<h1 className="
text-5xl
md:text-7xl
font-serif
leading-tight
mb-8
">

Discover.
<br/>
Facilitate.
<br/>
Transform.

</h1>


<p className="
text-lg
text-gray-600
leading-9
">

Our approach is centered around people, research,
collaboration and sustainable solutions. We combine
evidence-based knowledge with community engagement
to develop programs that respond to real challenges.

</p>


</motion.div>





<motion.div

initial={{
opacity:0,
scale:.9
}}

animate={{
opacity:1,
scale:1
}}

transition={{
duration:.8
}}

className="
relative
h-[550px]
rounded-[40px]
overflow-hidden
"

>


<Image

src="/pic10.png"

alt="Edvolve Foundation approach"

fill

className="
object-cover
"

/>


</motion.div>



</div>


</section>









{/* FOUR PILLARS */}


<section className="
bg-white
py-24
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
Our Development Approach
</h2>


<p className="
mt-5
text-gray-600
text-lg
">
A people-centred process for creating sustainable impact.
</p>


</div>





<div className="
grid
md:grid-cols-2
lg:grid-cols-4
gap-8
">


{
approachSteps.map((item,index)=>{

const Icon=item.icon;


return (

<motion.div

key={index}

whileHover={{
y:-10
}}

className="
bg-[#f8f7f4]
rounded-3xl
p-8
"

>


<Icon

size={42}

className="
text-yellow-700
mb-6
"

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


</motion.div>


)

})

}


</div>


</div>


</section>









{/* RESEARCH SECTION */}


<section className="
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


<div className="
relative
h-[500px]
rounded-[40px]
overflow-hidden
">


<Image

src="/pic8.png"

alt="Research and development"

fill

className="
object-cover
"

/>


</div>





<div>


<Search

size={45}

className="
text-yellow-700
mb-6
"

/>


<h2 className="
text-5xl
font-serif
mb-7
">

Research Driven.
Evidence Based.

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

We are data-driven and evidence-based in our collection
of information and findings. Our dedicated research
approach helps us identify challenges, understand
community realities and develop effective methodologies.

</p>



<p className="
mt-6
text-gray-600
text-lg
leading-9
">

Communication is central to our work. It enables us to
identify and formulate development programs by
consulting with people, understanding their needs,
attitudes and traditional knowledge.

</p>



</div>


</div>


</section>









{/* COMMUNITY CONNECTION */}


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


<Users

size={45}

className="mb-6"

/>


<h2 className="
text-5xl
font-serif
mb-7
">

Building Communities Of Shared Purpose

</h2>



<p className="
text-gray-300
text-lg
leading-9
">

The need for better ways of enhancing human capital
development and social change cannot be overstated.

By connecting with people, encouraging honest feedback
and building communities of shared purpose, we create
spaces where individuals recognise important issues,
find common ground and participate in creating solutions.

</p>


</div>





<div className="
relative
h-[450px]
rounded-[35px]
overflow-hidden
">


<Image

src="/ab3.jpg"

alt="Community engagement"

fill

className="
object-cover
"

/>


</div>



</div>


</section>









{/* HUMAN CAPITAL */}


<section className="
py-28
bg-white
">


<div className="
max-w-7xl
mx-auto
px-6
">


<div className="
grid
md:grid-cols-3
gap-8
">


<div className="
p-8
bg-[#f8f7f4]
rounded-3xl
">


<GraduationCap
size={40}
className="text-green-700 mb-6"
/>


<h3 className="
text-3xl
font-serif
mb-5
">

Human Capital Development

</h3>


<p className="
text-gray-600
leading-8
">

We promote education, training and motivation to help
citizens develop their fullest potential and participate
meaningfully in national development.

</p>


</div>





<div className="
p-8
bg-[#f8f7f4]
rounded-3xl
">


<Lightbulb
size={40}
className="text-yellow-700 mb-6"
/>


<h3 className="
text-3xl
font-serif
mb-5
">

Innovation & Creativity

</h3>


<p className="
text-gray-600
leading-8
">

Through talent management systems, we encourage new
ideas, improved methods, creativity and continuous
learning.

</p>


</div>





<div className="
p-8
bg-[#f8f7f4]
rounded-3xl
">


<Network

size={40}

className="text-yellow-700 mb-6"

/>


<h3 className="
text-3xl
font-serif
mb-5
">

Strategic Partnerships

</h3>


<p className="
text-gray-600
leading-8
">

We create structured partnerships between public
institutions and private organizations to develop scalable
solutions and improve coordination.

</p>


</div>



</div>


</div>


</section>









{/* FINAL */}


<section className="
py-24
">


<div className="
max-w-5xl
mx-auto
px-6
text-center
">


<h2 className="
text-5xl
font-serif
mb-8
">

Together We Create Sustainable Solutions

</h2>


<p className="
text-gray-600
text-lg
leading-9
">

The complexity of developing a nation&apos;s human capital
requires collaboration. Through strong networks,
partnerships and teamwork, Edvolve Foundation builds
programs that empower people, strengthen communities
and contribute to national development.

</p>


</div>


</section>



</main>

)

}
