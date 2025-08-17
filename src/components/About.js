import { useState } from 'react';
import'./About.css'
import { AnimatePresence, motion } from "framer-motion"
function About()
{
    const [hovered, setHovered] = useState(false);
    const [hovered2, setHovered2] = useState(false);
    const [hovered3, setHovered3] = useState(false);
    return(
        <div className="about">
            <motion.h1
             initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1.2,duration:.6}}
            viewport={{ once: true }}>about <span>us</span></motion.h1>
             
            <motion.div
            initial={{y:"100%",opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{delay:1.4,duration:.6}}
             className='img_txt'>
                 
                <img src='/about_image-MG9zrc7b.png' alt=''/>
                <div>
                   
                    <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
                    <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
                    <span>Our Vision</span>
                    <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
                </div>
            </motion.div>
            <motion.h2
             initial={{y:"100%",opacity:0}}
            whileInView={{y:0,opacity:1}}
            transition={{delay:1.4,duration:.6}}
             viewport={{ once: true }}><span>WHY</span> CHOOSE US</motion.h2>
           
            <motion.div
            initial={{y:"100%",opacity:0}}
            whileInView={{y:0,opacity:1}}
            transition={{delay:1.4,duration:.6}}
             className='reasons'>
                 <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ backgroundColor: "#fff" }}
      animate={{
        backgroundColor: hovered ? "#004BFF" : "#fff",
      }}
      transition={{ duration: 0.4 }}
      
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: hovered ? 5: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #00c6ff, #0072ff)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      />

      <AnimatePresence mode="wait">
        {hovered ?
        (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className='animi_div'
          >
            <h3>EFFICIENCY</h3>
            <p>
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </motion.div>
        ):<div className='animi_div'>
            <h1>1</h1></div>
        }
      </AnimatePresence>
    </motion.div>
                
                   <motion.div
      onHoverStart={() => setHovered2(true)}
      onHoverEnd={() => setHovered2(false)}
      initial={{ backgroundColor: "#fff" }}
      animate={{
        backgroundColor: hovered2 ? "#004BFF" : "#fff",
      }}
      transition={{ duration: 0.4 }}
      
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: hovered2 ? 5: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #00c6ff, #0072ff)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      />

      <AnimatePresence mode="wait">
        {hovered2 ?
        (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className='animi_div'
          >
            <h3>CONVENIENCE:</h3>
                    <p>Access to a network of trusted healthcare professionals in your area.</p>
          </motion.div>
        ):<div className='animi_div'>
            <h1>2</h1></div>
        }
      </AnimatePresence>
    </motion.div>

                     <motion.div
      onHoverStart={() => setHovered3(true)}
      onHoverEnd={() => setHovered3(false)}
      initial={{ backgroundColor: "#fff" }}
      animate={{
        backgroundColor: hovered3 ? "#004BFF" : "#fff",
      }}
      transition={{ duration: 0.4 }}
      
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: hovered3 ? 5: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #00c6ff, #0072ff)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      />

      <AnimatePresence mode="wait">
        {hovered3 ?
        (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className='animi_div'
          >
               <h3>PERSONALIZATION:</h3>
                    <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </motion.div>
        ):<div className='animi_div'>
            <h1>3</h1></div>
        }
      </AnimatePresence>
    </motion.div>
               
            </motion.div>
        </div>
    )
}
export default About;