import { NavLink } from 'react-router-dom';
import './Mainimg.css'
import { motion } from "framer-motion"

function Mainimg()
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
        className='mainimg'>
            <div className='cont'>
            <div className="main_info">
                <h3>
                    Book Appointment
                    With Trusted Doctors
                </h3>
                <div className="txt_photo">
                    <img src="./imgs.png" alt=''/>
                    <p>Simply browse through our extensive list of trusted doctors, <p> schedule your appointment hassle-free.</p></p>
                      
                </div>
               <div className='link_parent'>
                 <NavLink to={'/alldoctors'}>book appointment</NavLink>
               </div>
            </div>
            <div
             className="main_img">
                <img src="./mainimg.png" alt=''/>
            </div>
            </div>
        </motion.div>
    )
}
export default Mainimg;