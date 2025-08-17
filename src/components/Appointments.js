import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import'./Appoint.css'
import { edituser } from "../store-api/slices/Users-slice";
import { editDoctor } from "../store-api/slices/Doctors-slice";
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion"

function Appointments()
{
    const users=useSelector(state=>state.Reducers.Users);
    const doctors=useSelector(state=>state.Reducers.doctors);
    const[user,setuser]=useState();
    const[docs,setdoc]=useState([]);
    
  useEffect(() => {
  let id = localStorage.getItem("id");
  let u = users.find((f) => parseInt(f.id) === parseInt(id));
  console.log("effect");

  if (u) {
    let tempDocs = [];
    for (let slot of u.doc_slots) {
      let d = doctors.find((f) => parseInt(f.id) === parseInt(slot.doc_id));
      if (d) {
        tempDocs.push({ doctor: d, time: slot.time, day: slot.day });
      }
    }
    console.log("docs=>", tempDocs);
    setdoc(tempDocs);   // instead of docs.push
    setuser(u);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    const dispatch=useDispatch();
    function delet_appoint(appoint)
    {
        let temp=docs.filter((f)=>parseInt(f.doctor.id)!==parseInt(appoint.doctor.id)||f.day!==appoint.day||f.time!==appoint.time)
         notify1()
         setTimeout(()=>
        {
setdoc(temp)
        },3000)
          
        let utemp={
            ...user,
            "doc_slots":temp
        }
        dispatch(edituser(utemp))
        let x=appoint.doctor.Book_slots.find((f)=>f.day===appoint.day)
        console.log("x=>",x)
       let r= [...x.time]
       r.push(appoint.time)
        console.log("appoint.doctor.Book_slots=>",appoint.doctor.Book_slots)
         let y=appoint.doctor.Book_slots.filter((f)=>f.day.toLowerCase()!==x.day.toLowerCase())
         y.push({"day":x.day,"time":r})
         let dtemp={...appoint.doctor,"Book_slots":y}
        
         dispatch(editDoctor(dtemp))
    }
    const notify = () => toast.info("Feature is Disabled in Demo");
    const notify1 = () => toast.success("Appointment Cancelled");
    return(
        <div className="appintments">
            <div className="appoint_cont">
                <h4>My appointments</h4>
                
                {docs.length>0?
                docs.map((d)=>
                {
                    return<motion.div 
                     initial={{opacity:0,
            x:"-100%"
        }}
        animate={{opacity:1,
            x:0
        }}
          transition={{delay:1.5,duration:.7}}
          className="appointment">
                        <div className="doc_img">
                            <div className="imgdoc_parent">
                          <img src={d.doctor.avatar} alt=""/>
                          </div>
                          <div className="doct_info">
                            <h4>{d.doctor.name}</h4>
                            <p>{d.doctor.specialist}</p>
                            <h5>address</h5>
                            <p>{d.doctor.address}</p>
                            <p><span>Date & Time : </span>{d.day} | {d.time}</p>
                          </div>
                        </div>
                        <div className="pay">
                            <button onClick={notify}>pay online</button>
                             <button onClick={(()=>delet_appoint(d))}>cancel appointment</button>
                             <ToastContainer />
                           
                        </div>
                      {/* {!check_flag?<Alert severity="info">Feature is Disabled in Demo</Alert>:null} */}
                        
                    </motion.div>
                }):
                <p>No Appointments !</p>
            }
            </div>
        </div>
    )
}
export default Appointments