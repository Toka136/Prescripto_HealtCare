import {  motion } from "framer-motion"

function Contact()
{
    return(
         <div className="about">
            <motion.h1
             initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1.2,duration:.6}}
            viewport={{ once: true }}>CONTACT US <span>us</span></motion.h1>
             
            <motion.div
            initial={{y:"100%",opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{delay:1.4,duration:.6}}
             className='img_txt'>
                 
                <img src='/contact_image-IJu_19v_.png' alt=''/>
                <div>
                   <span>OUR OFFICE</span>
                    <p>00000 Willms Station Suite 000, Washington, USA.</p>
                    <p>Tel: (000) 000-0000 Email: greatstackdev@gmail.com</p>
                    <span>CAREERS AT PRESCRIPTO</span>
                    <p>Learn more about our teams and job openings.</p>
                </div>
            </motion.div>
        </div>
    )
}
export  default Contact;