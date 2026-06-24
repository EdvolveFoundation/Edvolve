"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  Sprout,
  Leaf,
  Users,
  TrendingUp,
  Globe2,
  Handshake,
  BarChart3,
  Tractor,
} from "lucide-react";



const objectives = [

{
icon:Leaf,
title:"Climate-Smart Agriculture",
text:
"Promoting sustainable farming practices that improve soil health, water management, productivity and climate resilience while reducing agricultural risks."
},


{
icon:Users,
title:"Youth & Women Inclusion",
text:
"Creating opportunities for young people and women to participate meaningfully in agriculture, agribusiness and value-chain development."
},


{
icon:TrendingUp,
title:"Economic Empowerment",
text:
"Strengthening farmers' capacity for non-oil export readiness, value addition, market access and sustainable agricultural enterprise."
},


];





const impacts=[

{
number:"983",
label:"Farmers Reached"
},

{
number:"560",
label:"Farmers Trained in Climate-Smart Agriculture"
},


{
number:"613",
label:"Youth & Women Engaged"
},


{
number:"15",
label:"Institutional Partnerships"
},


];





export default function agrodev(){


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

src="/agro2.png"

alt="Agrodev Initiative"

fill

className="object-cover"

/>



<div className="
absolute
inset-0
bg-black/60
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
text-yellow-700
mb-6
text-sm
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

Agrodev Initiative

<br/>

Agriculture:
The New Oil

</h1>



<p className="
text-lg
md:text-xl
leading-9
text-gray-200
">

Shaping the future of sustainable agriculture and food systems
through climate-smart farming, economic inclusion and
agricultural innovation.

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


<Sprout

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

Building Sustainable Food Systems

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

The Agrodev Initiative was created to position agriculture as a
key driver for climate resilience, non-oil export growth and
economic inclusion.

</p>



<p className="
mt-6
text-gray-600
text-lg
leading-9
">

Through collaboration with farmers, government institutions,
private organisations and development partners, Agrodev creates
pathways for farmers to access knowledge, opportunities,
markets and support systems.

</p>


</div>


</section>









{/* OBJECTIVES */}



<section className="
py-28
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


{
objectives.map((item,index)=>{


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









{/* APPROACH */}



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


<p className="
uppercase
tracking-[4px]
text-yellow-300
mb-5
">

Our Methodology

</p>


<h2 className="
text-5xl
font-serif
mb-8
">

Research.
Training.
Collaboration.

</h2>



<p className="
text-gray-300
text-lg
leading-9
">

Our approach combines data-driven research, community
participation, contextualised training and stakeholder
engagement.

</p>



<ul className="
mt-8
space-y-5
text-gray-300
">


<li>
✓ Climate-smart capacity building and training
</li>


<li>
✓ Farmer engagement and inclusion
</li>


<li>
✓ Access to information and institutional support
</li>


<li>
✓ Partnerships with government and private sector organisations
</li>


</ul>


</div>






<div className="
relative
h-[500px]
rounded-[40px]
overflow-hidden
">


<Image

src="/agro3.jpg"

alt="Farmers"

fill

className="object-cover"

/>


</div>


</div>


</section>









{/* ACTIVITIES */}



<section className="
py-28
bg-white
">


<div className="
max-w-7xl
mx-auto
px-6
">


<h2 className="
text-center
text-5xl
font-serif
mb-16
">

Program Activities

</h2>




<div className="
grid
md:grid-cols-2
gap-10
">


<div className="
relative
h-[450px]
rounded-3xl
overflow-hidden
">


<Image

src="/agro2.png"

alt="Agricultural training"

fill

className="object-cover"

/>


</div>




<div>


<h3 className="
text-4xl
font-serif
mb-6
">

Capacity Building & Farmer Development

</h3>


<p className="
text-gray-600
text-lg
leading-9
">

The initiative provides training on climate-smart agriculture,
export readiness, agribusiness development and sustainable
production methods.

</p>



<p className="
mt-6
text-gray-600
text-lg
leading-9
">

Through exhibitions, stakeholder engagements and farmer
platforms, Agrodev connects farmers with opportunities,
institutions, financial services and market systems.

</p>


</div>


</div>


</div>


</section>









{/* IMPACT NUMBERS */}



<section className="
py-24
bg-yellow-700
text-white
">


<div className="
max-w-7xl
mx-auto
px-6
grid
md:grid-cols-4
gap-8
text-center
">


{
impacts.map((item,index)=>(


<div key={index}>


<h3 className="
text-5xl
font-serif
mb-3
">

{item.number}

</h3>


<p className="
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

Growing The Future Of Agriculture

</h2>



<p className="
text-gray-600
text-lg
leading-9
">

Moving forward, Agrodev will continue expanding localized
engagement models, strengthening market access systems,
supporting youth climate-smart agriculture champions and
introducing digital tools that improve agricultural productivity.

</p>


</div>


</section>









{/* PARTNERS */}



<section className="
bg-white
py-24
">


<div className="
max-w-5xl
mx-auto
px-6
text-center
">


<Handshake

size={45}

className="
mx-auto
text-yellow-700
mb-6
"

/>



<h2 className="
text-4xl
font-serif
mb-6
">

Building Agricultural Ecosystems Through Partnership

</h2>



<p className="
text-gray-600
leading-8
">

Agrodev collaborates with farmer associations, government
agencies, financial institutions, regulatory bodies, academic
institutions and private sector organisations to create scalable
solutions for sustainable agricultural development.

</p>


</div>


</section>



</main>

)

}