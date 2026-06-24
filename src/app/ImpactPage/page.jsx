"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  Users,
  GraduationCap,
  Sprout,
  BriefcaseBusiness,
  HeartHandshake,
  Globe2,
  TrendingUp,
  Target,
  ArrowRight
} from "lucide-react";



const impacts = [

{
icon:GraduationCap,
number:"645+",
title:"Students Reached",
text:
"Through the Rural Educational Advancement Program, we support improved learning outcomes and inclusive education in underserved communities."
},


{
icon:Sprout,
number:"2,600+",
title:"Farmers Trained",
text:
"Through Agrodev, farmers receive agricultural training focused on enterprise development, sustainability and climate-smart practices."
},


{
icon:BriefcaseBusiness,
number:"600+",
title:"MSMEs Empowered",
text:
"We support entrepreneurs and small businesses with training, mentorship, networking and growth opportunities."
},


{
icon:Users,
number:"300+",
title:"Youth Empowered",
text:
"Youth have received practical skills training, entrepreneurship support and mentorship opportunities."
}

];




const areas=[

{
title:"Education & Human Capital",
description:
"We develop people through education, skills development, mentorship and capacity building programs that prepare individuals for meaningful participation in society."
},


{
title:"Economic Opportunity",
description:
"We create pathways for entrepreneurship, agriculture and enterprise development that help people become self-reliant and economically empowered."
},


{
title:"Social Change & Advocacy",
description:
"We amplify community voices, promote inclusion, support human rights and advocate for policies that improve people's lives."
},


{
title:"Sustainable Development",
description:
"We support solutions around climate action, food security, environmental awareness and resilient communities."
}

];





export default function ImpactPage(){


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

src="/pic2.jpg"

alt="Edvolve impact"

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
y:60
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

Our Impact

</p>



<h1 className="
text-5xl
md:text-7xl
font-serif
leading-tight
mb-8
">

Creating Change.
<br/>
Transforming Lives.

</h1>



<p className="
text-lg
md:text-xl
leading-9
text-gray-200
">

At Edvolve Foundation, our impact is measured by the people
we empower, communities we support and sustainable solutions
we develop through education, innovation and social change.

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


<Target

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

Building A Future Where Everyone Can Thrive

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

Our work focuses on discovering potential, facilitating
solutions, streamlining opportunities and supporting people
and communities to create lasting change.

</p>



<p className="
mt-6
text-gray-600
text-lg
leading-9
">

Through strategic partnerships and community-driven programs,
we address challenges in education, economic empowerment,
agriculture, governance and social development.

</p>


</div>


</section>









{/* IMPACT STATISTICS */}



<section className="
py-24
">


<div className="
max-w-7xl
mx-auto
px-6
grid
md:grid-cols-2
lg:grid-cols-4
gap-8
">


{

impacts.map((item,index)=>{


const Icon=item.icon;


return(

<motion.div

key={index}

whileHover={{
y:-10
}}

className="
bg-white
rounded-3xl
p-10
shadow-sm
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
text-5xl
font-serif
mb-3
">

{item.number}

</h3>



<h4 className="
text-2xl
font-serif
mb-4
">

{item.title}

</h4>



<p className="
text-gray-600
leading-7
">

{item.text}

</p>


</motion.div>


)


})

}


</div>


</section>









{/* VISUAL IMPACT */}



<section className="
bg-white
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
h-[550px]
rounded-[40px]
overflow-hidden
">


<Image

src="/ab8.png"

alt="Community impact"

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

Impact Through Collaboration

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

We believe sustainable change requires collaboration.
By working with communities, government institutions,
private organisations and development partners, we create
solutions that respond to real needs.

</p>



<p className="
mt-6
text-gray-600
text-lg
leading-9
">

Our partnerships enable us to test, improve and expand
solutions that create meaningful social and economic impact.

</p>


</div>


</div>


</section>









{/* IMPACT AREAS */}



<section className="
bg-[#07130d]
text-white
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

Areas Of Impact

</h2>


</div>





<div className="
grid
md:grid-cols-2
gap-8
">


{

areas.map((item,index)=>(


<div

key={index}

className="
border
border-white/10
rounded-3xl
p-10
hover:bg-white/5
transition
"

>


<h3 className="
text-3xl
font-serif
mb-5
">

{item.title}

</h3>



<p className="
text-gray-300
leading-8
">

{item.description}

</p>


</div>


))


}


</div>


</div>


</section>









{/* FUTURE IMPACT */}



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

Scaling Impact For The Future

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

Edvolve Foundation continues to build innovative programs
that strengthen communities, empower individuals and create
sustainable pathways for national development.

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

Join Our Mission

<ArrowRight size={18}/>

</button>


</div>


</section>



</main>

)

}