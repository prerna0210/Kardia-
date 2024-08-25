
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const data = [
  {
    id: "1",
    url: "https://images.ctfassets.net/eexbcii1ci83/3AGUUtHuXuzHKu1O5PFKhh/b76f6b4e18105209f858886462de28f0/Cardiovascular_disease_3.png",
    heading: "Know more about Heart Diseases",
    para: "Studies have proven that there's a higher risk of death in elderly people caused by heart diseases.",
    lnk: "https://www.who.int/health-topics/cardiovascular-diseases#tab=tab_1"
  },
  {
    id: "2",
    url: "https://www.rwjbh.org/images/services/heart-vascular/Inherited-Cardiovascular-Disease-Hypertrophic-cardiomyopathy.jpg",
    heading: "Test if you have Heart Disease or not",
    para: "87% Accurate!!",
    lnk: ""
  },
  {
    id: "3",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs_89eKVW8p6EWhjDN6TULe5CyLCxJJCiE1g&s",
    heading: "Consult with a Specialist",
    para: "Get professional advice and guidance from leading cardiologists.",
    lnk: ""
  },
]


const Indexpage = () => {


  return (
    <div className="grid grid-cols-5 gap-4 md:grid-cols-8  lg:grid-cols-3   my-3 mx-9  px-10 py-10  ">

      {
        data.map((item) => (
          <Card key={item.id}
          
            url={item.url} 
            
            heading={item.heading} 
            para={item.para}
             link={item.lnk} />

        ))
      }



    </div>
  )
}

export default Indexpage