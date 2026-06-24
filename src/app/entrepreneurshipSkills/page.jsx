"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  GraduationCap,
  Users,
  Wallet,
  Lightbulb,
  TrendingUp,
  Handshake,
  ArrowRight
} from "lucide-react";


const focusAreas = [

{
icon: GraduationCap,
title:"Skills Development & Training",
text:
"Equipping young people with practical skills, professional knowledge and confidence needed to participate successfully in today's economy."
},


{
icon: BriefcaseBusiness,
title:"Entrepreneurship Development",
text:
"Supporting aspiring entrepreneurs with business knowledge, startup guidance and resources needed to create sustainable businesses."
},


{
icon: Users,
title:"Mentorship & Career Support",
text:
"Connecting young people with experienced professionals and mentors who provide guidance, direction and industry knowledge."
},


{
icon: Wallet,
title:"Financial Empowerment",
text:
"Creating pathways for entrepreneurs to access financial opportunities, business support and resources for growth."
}

];



const impacts = [

{
number:"300+",
title:"Youth Empowered",
text:"Young people trained with practical entrepreneurial skills."
},

{
number:"600+",
title:"MSMEs Supported",
text:"Small businesses strengthened through capacity development."
},

{
number:"20",
title:"Partner Organisations",
text:"Strategic collaborations supporting enterprise development."
}

];




export default function entrepreneurshipSkills(){


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

src="/ent1.png"

alt="Entrepreneurship and skills development"

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
text-yellow-300
mb-6
">

Our Initiative

</p>



<h1 className="
text-5xl
md:text-7xl
font-serif
leading-tight
mb-8
">

Entrepreneurship
<br/>
& Skills Development

</h1>



<p className="
text-lg
md:text-xl
leading-9
text-gray-200
">

Building a generation of skilled, confident and innovative
entrepreneurs equipped to create opportunities, solve problems
and contribute to economic development.

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


<Lightbulb

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

Turning Skills Into Opportunities

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

Edvolve Foundation believes that sustainable development
requires people who possess practical skills, entrepreneurial
mindsets and the confidence to create solutions.

</p>



<p className="
mt-6
text-gray-600
text-lg
leading-9
">

Through our Entrepreneurship and Skills Development Program,
we bridge the gap between learning and economic opportunity by
providing young people with training, mentorship and support
systems that help them build sustainable careers and businesses.

</p>


</div>


</section>









{/* IMAGE SECTION */}

<section className="py-24">


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

src="/pic6.jpg"

alt="Young entrepreneurs"

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

Our Approach

</p>



<h2 className="
text-5xl
font-serif
mb-7
">

Creating Self-Reliant Individuals

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

We focus on developing talents, improving employability,
encouraging innovation and helping individuals discover
opportunities where their skills can create economic value.

</p>



<p className="
mt-6
text-gray-600
text-lg
leading-9
">

Our approach combines practical training, mentorship,
business support and access to networks that enable young
people to move from ideas to sustainable ventures.

</p>


</div>


</div>


</section>









{/* FOCUS CARDS */}

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

Program Pillars

</h2>


<p className="
text-gray-600
mt-5
text-lg
">

Building capacity, confidence and economic independence.

</p>


</div>




<div className="
grid
md:grid-cols-2
gap-8
">


{
focusAreas.map((item,index)=>{


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









{/* BUSINESS DEVELOPMENT */}

<section className="
py-28
">


<div className="
max-w-7xl
mx-auto
px-6
grid
lg:grid-cols-2
gap-12
">


<div
className="
bg-[#07130d]
text-white
rounded-[40px]
p-12
"
>


<TrendingUp
size={45}
className="mb-6"
/>


<h2 className="
text-4xl
font-serif
mb-6
">

Supporting Business Growth

</h2>


<p className="
text-gray-300
leading-9
text-lg
">

We provide entrepreneurs with knowledge in business
planning, financial management, career development,
technology skills and other areas required for business
success.

</p>


</div>





<div
className="
bg-white
rounded-[40px]
p-12
border
"
>


<Handshake
size={45}
className="text-yellow-700 mb-6"
/>



<h2 className="
text-4xl
font-serif
mb-6
">

Building Entrepreneurial Networks

</h2>


<p className="
text-gray-600
leading-9
text-lg
">

Through partnerships and mentorship networks, we connect
entrepreneurs to opportunities, resources and communities
that support growth.

</p>


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
impacts.map((item,index)=>(


<div key={index}>


<h3 className="
text-5xl
font-serif
mb-4
">

{item.number}

</h3>


<h4 className="
text-2xl
font-serif
mb-3
">

{item.title}

</h4>


<p className="
text-yellow-100
">

{item.text}

</p>


</div>


))

}


</div>


</section>









{/* CTA */}

<section className="py-28">


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

Empowering People To Create The Future

</h2>


<p className="
text-gray-600
text-lg
leading-9
">

Edvolve Foundation continues to invest in human capital by
equipping young people with skills, knowledge and opportunities
that enable them to become creators, innovators and contributors
to national development.

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

Join Our Program

<ArrowRight size={18}/>

</button>


</div>


</section>


</main>

)

}