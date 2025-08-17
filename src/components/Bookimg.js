import { motion } from "framer-motion"
import { NavLink } from "react-router-dom"

function Bookimg()
{
    return(
         <motion.div
        initial={{opacity:0,
            x:"-100%"
        }}
        animate={{opacity:1,
            x:0
        }}
        transition={{delay:2,duration:.7}}
        className='mainimg book'>
            <div className='cont'>
            <div className="main_info">
                <h3>
                   Book Appointment
                 With 100+ Trusted Doctors
                </h3>
                
               <div className='link_parent'>
                 <NavLink to={'/login/user'}>create account</NavLink>
               </div>
            </div>
            <div
             className="main_img" >
                <img src="./appointment_img-DzbZlMsi.png" alt="" />
            </div>
            </div>
        </motion.div>
    )
}
export default Bookimg