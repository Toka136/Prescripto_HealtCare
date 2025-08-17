import {  useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { edituser } from "../store-api/slices/Users-slice";
import'./Profile.css'
import { motion } from "framer-motion"

function Profile()
{
    const[user,set_user]=useState();
    const[edit,set_edit]=useState(false);
    const[img_url,set_img_url]=useState();
    const[img_urlT,set_img_urlT]=useState("./userprofile.png");
    const[phone,set_phone]=useState();
    const[gender,set_gender]=useState();
    const[addrees,set_address]=useState();
    const[birthdate,set_birthdate]=useState();
    const users=useSelector(state=>state.Reducers.Users);
    const dispatch=useDispatch();
   
    useEffect(()=>
    {
         console.log("edit=>",edit)
    },[edit])
    useEffect(()=>
    {
       
        let id=localStorage.getItem('id');
        if(id>0)
        {
            let u=users.find((f)=>parseInt(f.id)===parseInt(id));
            if(u){
            set_user(u);
            console.log("u=>",u)
            set_address(u.address)
            set_gender(u.gender)
            set_birthdate(u.birthdate)
            set_phone(u.phone)}
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    function edit_user()
    {
        console.log("edit user")
        let u={
            ...user,
            "phone":phone,
            "gender":gender,
            "birthdate":birthdate,
            "address":addrees,
        }
        dispatch(edituser(u))
        set_edit(false)
    }
    function change_img()
    {
        console.log("img_url => ",img_url)
        checkImageURL(img_url)
        .then((isValid) => {
        if (isValid) {
      set_img_urlT(img_url)
        } else {
         set_img_urlT("./userprofile.png")
        }
  });
        dispatch(edituser({...user,"img":img_url}))
        // set_img_urlT(img_url)
        set_img_url("image URL ")
    }
    function checkImageURL(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);   
    img.onerror = () => resolve(false); 
    img.src = url;
  });
    }
    return(
        <>
        {user&&
            <div className="profile">
                <div className="profile_cont">
            <motion.div
            initial={{opacity:0,
            x:"-100%"
        }}
         animate={{opacity:1,
            x:0
        }}
          transition={{delay:1.5,duration:.7}}
            viewport={{ once: true }}
             className="user_img">
            <img alt="" src={user.img.length>1?user.img:img_urlT}/>
            <form onSubmit={(e)=> {e.preventDefault(); change_img()}}>
                <input onChange={((e)=>set_img_url(e.target.value))} value={img_url} />
                <button>change</button>
            </form>
            <h4>{user.name}</h4>
            </motion.div>
            <motion.div
             initial={{opacity:0,
            x:"-100%"
        }}
         whileInView={{opacity:1,
            x:0
        }}
          transition={{delay:1.5,duration:.7}}
            viewport={{ once: true }}
             className="contact_info">
                <p>contact imformation</p>
                <form onSubmit={(e)=> {e.preventDefault(); edit_user()}}>
                    <div className="input_label">
                        <label>Email id :</label>
                        <input type="email" value={user.email} readOnly={true}></input>
                    </div>
                    <div className="input_label">
                        <label>phone :</label>
                        <input  onChange={((e)=>set_phone(e.target.value))}
                   
                    value={phone} type="string" className={edit&&"border rounded px-3 py-2"} readOnly={edit?false:true}></input>
                    </div>
                    <div className="input_label">
                        <label>Address :</label>
                        <input  onChange={((e)=>set_address(e.target.value))}
                    value={addrees} type="string"  className={edit&&"border rounded px-3 py-2"} readOnly={edit?false:true}></input>
                    </div>
                     <p>basic info</p>
               
                    <div className="input_label">
                        <label>gender</label>
                        <select onChange={((e)=>set_gender(e.target.value))}
                  
                    value={gender} disabled={!edit} className="border rounded px-3 py-2">
                            <option value="female">female</option>
                            <option value="male">male</option>
                            <option value="not selected">not selected</option>
                        </select>
                    </div>
                    <div className="input_label">
                        <label>Date of birth : </label>
                        <input onChange={((e)=>set_birthdate(e.target.value))}
                   
                    value={birthdate} type="date"  disabled ={!edit}/>
                    </div>
                    {edit?<button onClick={(()=>{edit_user()})}>save information</button>:<span onClick={(()=>{set_edit(true);console.log("cliced")})}>edit</span>}
                </form>
            </motion.div>
            </div>
        </div>
        }</>
       
    )
}
export default Profile;