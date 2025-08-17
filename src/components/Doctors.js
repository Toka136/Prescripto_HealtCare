import { useEffect, useState } from "react";
import 'swiper/css'; // basic styles
import 'swiper/css/navigation';
import { motion, useTime, useTransform } from "framer-motion"
import'./Doctors.css'
import {  useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Doctors()
{
  const time =useTime();
      const [top_ten,set_top_ten]=useState([]);
  const rotate=useTransform(time,[0,3000],[0,360],
    {
      clamp:false,
    }
  );
  const rotateBG=useTransform(rotate,(r)=>
  {
    return `conic-gradient( from ${r}deg, #01497c, #89C2D9, #2A6F97, #A9D6E5, #01497c)`
  })
   let state =useSelector(state=>state.Reducers.doctors);
    useEffect(()=>
     {
          if(state)
           set_top_ten(state.slice(0,10))
        // eslint-disable-next-line react-hooks/exhaustive-deps
     },[state])
    
const navigate=useNavigate();
 function handle_docInfo(doc)
      {
        navigate(`/doctor/${doc}`)
      }
    return(
        <div className="doctors">
          <h2>Top Doctors to Book</h2>
          <p>Simply browse through our extensive list of trusted doctors.</p>
          {/* <h1>state</h1> */}
          
          <div className="doctors_images">
            {
              top_ten.length>0&&top_ten.map((s)=>
              {
                return<div  onClick={(()=>handle_docInfo(s.id))}>
                  <motion.div
              //  {... doc_animate(s.delay)}
                className="doctor">
                  <div className="img_parent">
                  <img src={s.avatar} alt=""/></div>
                 <div>
                   <p>available</p>
                  <h3>{s.name}</h3>
                  <p>{s.specialist}</p>
                 </div>
                </motion.div>
                <motion.div className="animate"
                style={{background:rotateBG,}}></motion.div>
                
                </div>
              })
            }
            </div>
            <div className="button_parent">
                  <NavLink to={'/alldoctors'}>see more</NavLink>
                </div>
        </div>
    )
}
export default Doctors;