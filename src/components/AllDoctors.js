import { useTime, useTransform ,motion} from "framer-motion";
import { speciality_data } from "./data";
import {  useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './Alldoctors.css'
import { useNavigate, useParams } from "react-router-dom";
function AllDoctors()
{
  const param=useParams();
       let state =useSelector(state=>state.Reducers.doctors);
       const[docs,setdocs]=useState([]);
       const[active,setactive]=useState("");
      const navigate=useNavigate();
    
        useEffect(()=>
        {
            if(state)
                setdocs(state);
        },[state])
 function handle_docs(spec_name)
 {
    if(state)
    {
        let temp=state.filter((x)=>x.specialist===spec_name);
        setdocs(temp);
    }
 }
 useEffect(()=>
{
  if(param.spec&&state){
    console.log("param.spec=>",param.spec)
    const t=speciality_data.find((s)=>parseInt(s.id)===parseInt(param.spec))
    setactive(t.name)
    handle_docs(t.name)
  }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[state,param])
    const time =useTime();
  const rotate=useTransform(time,[0,3000],[0,360],
    {
      clamp:false,
    }
  );
  const rotateBG=useTransform(rotate,(r)=>
  {
    return `conic-gradient( from ${r}deg, #01497c, #89C2D9, #2A6F97, #A9D6E5, #01497c)`
  })
   const [screen,setscreen]=useState(false);
      useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
    
          setscreen(width < 950);
        };
    
        handleResize(); 
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
     function handle_docInfo(doc)
      {
        navigate(`/doctor/${doc}`)
      }
   
    return(
        <div className="alldoctors">
            <p>Browse through the doctors specialist.</p>
            <div className="doc_spec">
                <div>
                  {!screen? <ul>
                        {speciality_data.map((s)=>
                        {
                            return <li className={active===s.name&&"activeli"} onClick={(()=>{
                              handle_docs(s.name);
                              setactive(s.name)})}>
                                <span href="">{s.name}</span>
                            </li>
                        })}
                    </ul>: <select value={active}  onChange={
                      ((e)=>{handle_docs(e.target.value); setactive(e.target.value)})}>
                      {speciality_data.map((s)=>
                        {
                            return <option value ={s.name}className={active===s.name&&"activeli"} onClick={(()=>{
                             
                              setactive(s.name)})}>
                                <span>{s.name}</span>
                            </option>
                        })}
                    </select>}
                   
                   
                    </div>
            <div className="doctors_images">
            {
              docs.length>0&&docs.map((s)=>
              {
                return<div onClick={(()=>handle_docInfo(s.id))} >
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
                
            </div>
        </div>
    )
}
export default AllDoctors;