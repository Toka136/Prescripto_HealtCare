import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoctor, editDoctor} from "../store-api/slices/Doctors-slice";
import './Doctor.css'
import { edituser } from "../store-api/slices/Users-slice";
import { ToastContainer, toast } from 'react-toastify';

function Doctor()
{
    const notify = () => toast.success("Book Appointment success");
    const notifyd = () => toast.success("Doctor Delted success");
    const notify1 = () => toast.warning("please select time");
    const notify2 = () => toast.warning("please login first");
    const state=useSelector((state)=>state.Reducers.doctors);
    const dispatch=useDispatch();
    const param=useParams();
    const [doc,set_doc]=useState();
    const [S_day,set_S_day]=useState("Fri");
    const [S_time,set_S_time]=useState("");
    const [username,setusername]=useState("nouser");
    const [admin_flag,setu_admin_flag]=useState(false);
    const users=useSelector(state=>state.Reducers.Users);
       
    let x=0;
    const days_name=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const getdays=()=>
    {
         let days=[];
        for(let i=0;i<7;i++)
        {
            
            let date=new Date();
            date.setDate(date.getDate()+i);
            if(i===0)
                x=date.getDate();
            days.push(
                {
                    "dayname":days_name[date.getDate()-x],
                    "daynum":date.getDate()
                }
            )
        }
        console.log("days")
        return days;
    }
    const daysList = getdays();
    
    useEffect(()=>
    {
        if(state)
        {
            let temp=state.find((d)=>parseInt(d.id)===parseInt(param.doc_id))
            if(temp)
                set_doc(temp)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state])
          useEffect(()=>
          {
              const i=localStorage.getItem("id");
              if(i>0)
              {
                 
                
                  setu_admin_flag(false);
                  const u=users.find((x)=>parseInt(x.id)===parseInt(parseInt(i)));
                  
                  if(u){
                    console.log(u)
                  setusername(u);
                }
              }
              else
              {
                  const t=localStorage.getItem("admin");
               
                  if(t==="true")
                  { 
                       setu_admin_flag(true);
                   
                  }
              }
             // eslint-disable-next-line react-hooks/exhaustive-deps 
          },[])
    function book_appoint(day,time)
    {
        if(username!=="nouser")
        {
            if(S_time.length<=1)
            {
                  notify1()}
          else{
            let temp=[...username.doc_slots];
            console.log("temp=>",temp)
            temp.push({"doc_id":doc.id,"day":day,"time":time});
            let u={
                ...username,
                "doc_slots":temp
            }
            dispatch(edituser(u));
                //   window.location.reload(true);

             let temp_doc=spec_times.filter((s)=>s.toLowerCase()!==time.toLowerCase());
             console.log("temp_doc=>",temp_doc)
             let temp2=doc.Book_slots.filter((s)=>s.day.toLowerCase()!==day.toLowerCase());
             temp2.push({"day":day,"time":temp_doc})

             let d={
                ...doc,
                "Book_slots":temp2
             }
             dispatch(editDoctor(d))
             notify();
            //  console.log("tmam")
          }
        }
        else
        {
            notify2();
        }
    }
    const [spec_times,set_spec_times]=useState([]);
    useEffect(()=>
    {
        console.log("S_day=>",S_day)
        if(doc){
            console.log("doc.Book_slots=>",doc.Book_slots)
            console.log("doc.specialist=>",doc.specialist)
          let x=doc.Book_slots.find((f)=>f.day.toLowerCase()===S_day.toLowerCase());
        console.log("x=>",x);
        if(x)
         set_spec_times([...x.time]);
        else 
             set_spec_times([])
        }
    },[S_day,doc])
    const navigate =useNavigate();
      function delete_doc(doc_id)
      {
       
        dispatch(deleteDoctor(doc_id))
        notifyd()
        setTimeout(() => {
             navigate('/alldoctors')
        }, 2000);
       
      }
    return(
        <>
        {doc&&
        <div className="doctor">
            <div className="doc_inf">
                <div className="dimg_parent">
                <img src={doc.avatar} alt=""/></div>
                <div className="info">
                    <h1>{doc.name}</h1>
                    <p>{doc.specialist}</p>
                    <span>about</span>
                    <p>{doc.description}</p>
                    <p>Appointment fee:{doc.Apointmentfee}$</p>
                </div>
            </div>
            <div className="bookslots">
                <h3>Booking slots</h3>
                <div className="days">
                    {daysList&&daysList.map((d)=>
                    {
                        return <div onClick ={(()=>set_S_day(d.dayname))}className={S_day===d.dayname&&"actived"} key={d.daynum}>
                            <span>{d.dayname}</span>
                            <span>{d.daynum}</span>
                        </div>
                    })}</div>
                    <div className="times">
                    {spec_times.length>0?
                    spec_times.map((b)=>
                    {
                        return <span onClick={(()=>set_S_time(b))} className={S_time===b&&"actived"}>{b}</span>
                    })
                     :
                     <p className="m-t-10px text-primary fs-1">No Available Times</p>
                    }
                    </div>
                    <div className="bbutton_parent">
                        {!admin_flag? <button onClick={(()=>{
                            book_appoint(S_day,S_time);
                           })}>book Appointment</button>:
                            <button className="btn btn-danger mb-10 z-3" onClick={(()=>delete_doc(doc.id))}>Delete</button>
                  }
                      
                         <ToastContainer />
                    </div>
                       {/* {!check_flag?<Alert severity="warning">please login first</Alert>:null}
                       {!check_flag2?<Alert severity="warning">please select time</Alert>:null}
                       {!check_flag3?<Alert severity="success">Book Appointment successfully</Alert>:null} */}
                
            </div>
        </div>}</>
    )
}
export default Doctor;