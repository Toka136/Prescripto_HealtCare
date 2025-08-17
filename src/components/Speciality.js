import { speciality_data } from "./data";
import { motion } from "framer-motion"
import './Special.css'
import { useNavigate } from "react-router-dom";
function Speciality()
{
  const spec_animate = (delay1) => {
  return {
    initial: {
      x: "-20%",
      opacity: 0,
    },
    whileInView: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: delay1,
      },
    },
  };
};
const navigate=useNavigate();
  function handle_spec(s)
  {
    navigate(`/alldoctors/${s}`)
  }
    return(
        <div className="speciality">
            <div className="cont_special">
                <h2>Find by Speciality</h2>
                <p>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
                <div className="speciality_imgs">
                {speciality_data.map((s)=>
                {
                    return <motion.div onClick={(()=>handle_spec(s.id))}
                    {...spec_animate(s.delay)}
                     key={s.id}>
                        <img src={s.image} alt=""/>
                        <p>{s.name}</p>
                    </motion.div>
                })}
                </div>
            </div>
        </div>
    )
}
export default Speciality;