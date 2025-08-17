// import { a } from 'react-router-dom';
import './Header.css'
import { motion } from "framer-motion"
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Header()
{
    const MotionNavLink = motion(NavLink);
    const [screen,setscreen]=useState(false);
    const[icon,seticon]=useState(false);
    const [user_flag,setuser_flag]=useState(false);
    const [admin_flag,setu_admin_flag]=useState(false);
         const users=useSelector(state=>state.Reducers.Users);
         const navigate=useNavigate();
     const location = useLocation();
     function logout()
     {
        setuser_flag(false);
        setu_admin_flag(false);
         localStorage.setItem("id",-1);
        localStorage.setItem("admin","false");
        navigate('/')
     }
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
        useEffect(()=>
          {
              const i=localStorage.getItem("id");
              // const ad=localStorage.getItem("admin");
             
              if(i>0)
              {
                 
                  setuser_flag(true);
                 
                  setu_admin_flag(false);
                  const u=users.find((x)=>parseInt(x.id)===parseInt(parseInt(i)));
                  
                  if(u){
                    console.log(u)
                  }
              }
              else
              {
                  const t=localStorage.getItem("admin");
               
                  if(t==="true")
                  { 
                       setu_admin_flag(true);
                       setuser_flag(true);
                   
                  }
              }
             // eslint-disable-next-line react-hooks/exhaustive-deps 
          },[location])
    const list_animate=(delay1)=>
    {
        return{
            initial:{
                y:"-100%",
                opacity:0,
            },
            animate:{
                 y:"0",
                opacity:1,
            
             transition:{
                duration:.6,
                delay:delay1
            }
        }
    }
    }
    return(
        <header className={screen &&icon?"no_grid":""}>
            {(!screen || !icon)&&<div className="logo">
                {!screen? <motion.img
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{duration:.8,delay:.5}} src="/logo.svg"/>:
                <img src="/logo.svg" alt=''/>
                }
               
            </div>}
            {!screen&&
            <>
            
            <div className="tabs" >
                    < MotionNavLink   className={({ isActive }) => isActive ? ' active1' : ''} to={'/'}
                    variants={list_animate(.7)}
                    initial="initial"
                    animate="animate" 
                     >home </MotionNavLink>
                    < MotionNavLink  className={({ isActive }) => isActive ? ' active1' : ''} to={'/alldoctors'}
                    variants={list_animate(.8)}
                    initial="initial"
                    animate="animate">all doctors </MotionNavLink>
                    <MotionNavLink  className={({ isActive }) => isActive ? ' active1' : ''} to={'/about'}
                    variants={list_animate(.9)}
                    initial="initial"
                    animate="animate"  >about </MotionNavLink>
                    <MotionNavLink
                    variants={list_animate(1)}
                    initial="initial"
                    animate="animate" to={'/contact'}>contact </MotionNavLink>
                    {(!user_flag&&!admin_flag)&&
                    <MotionNavLink
                    variants={list_animate(1.1)}
                    initial="initial"
                    animate="animate" to={'/login/admin'}   className='admin'>admin panel </MotionNavLink>}
                </div>
                
            {user_flag?
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-user"></i>
            </button>
            <ul class="dropdown-menu">
                {!admin_flag&&
                <li><NavLink className="dropdown-item" to={'/profile'}>profile</NavLink></li>}
               {admin_flag? <li><NavLink className="dropdown-item" to={'/Adddoctor'}>Add doctor</NavLink></li>: <li><NavLink className="dropdown-item" to={'/appointments'}>my appointment</NavLink></li>}
                <li><button class="dropdown-item" onClick={(()=>{logout();})}>logout</button></li>
            </ul>
            </div>
            :<motion.div
             initial={{ y:"-100%",
                opacity:0,}}
                animate={{y:"0",
                opacity:1}}
                transition={{duration:.5,delay:1.5}}

                 className='account'>
                     <MotionNavLink  className="account_button" to={'/login/user'} >create account </MotionNavLink>
                </motion.div>}
             </>}
                 {screen &&!icon&&
            <div className="list_icon">
            {icon?<i onClick={(()=>seticon(!icon))} className={"fa-solid fa-x"}></i>:<i onClick={(()=>seticon(!icon))} className={"fa-solid fa-bars"}></i>}
            </div>}
            {icon&&
            <motion.div
            initial={{ x:"100%",
                opacity:0,}}
                animate={{x:"0",
                opacity:1}}
                transition={{duration:.5,delay:0}} className='overflow_hidden'>
            <div className='new_header'>
                 <div className="logo">
                <img src="/logo.svg" alt=''/>
            </div>
             <div className="list_icon">
            {icon?<i onClick={(()=>seticon(!icon))} className={"fa-solid fa-x"}></i>:<i onClick={(()=>seticon(!icon))} class={"fa-solid fa-bars"}></i>}
            </div>
            </div> <div className='cont_resize'>
            <div className="tabs resize" >
             < MotionNavLink  onClick={(()=>seticon(false))} className={({ isActive }) => isActive ? ' active1' : ''} to={'/'}
                    variants={list_animate(.7)}
                    initial="initial"
                    animate="animate" 
                     >home </MotionNavLink>
                    < MotionNavLink  onClick={(()=>seticon(false))}  className={({ isActive }) => isActive ? ' active1' : ''} to={'/alldoctors'}
                    variants={list_animate(.8)}
                    initial="initial"
                    animate="animate">all doctors </MotionNavLink>
                    <MotionNavLink  onClick={(()=>seticon(false))}  className={({ isActive }) => isActive ? ' active1' : ''} to={'/about'}
                    variants={list_animate(.9)}
                    initial="initial"
                    animate="animate"  >about </MotionNavLink>
                    <MotionNavLink  onClick={(()=>seticon(false))}
                    variants={list_animate(1)}
                    initial="initial"
                    animate="animate" to={'/contact'}>contact </MotionNavLink>
                   {(!user_flag&&!admin_flag)&&
                    <MotionNavLink  onClick={(()=>seticon(false))}
                    variants={list_animate(1.1)}
                    initial="initial"
                    animate="animate" to={'/login/admin'}   className=''>admin panel </MotionNavLink>}
                   {user_flag?<><MotionNavLink  onClick={(()=>seticon(false))}  className={({ isActive }) => isActive ? ' active1' : ''} to={'/profile'}
                    variants={list_animate(.9)}
                    initial="initial"
                    animate="animate"  >profile </MotionNavLink>
                  {admin_flag?  <MotionNavLink  onClick={(()=>seticon(false))}  className={({ isActive }) => isActive ? ' active1' : ''} to={'/Adddoctor'}
                    variants={list_animate(.9)}
                    initial="initial"
                    animate="animate"  >Add doctor </MotionNavLink>:  <MotionNavLink  onClick={(()=>seticon(false))}  className={({ isActive }) => isActive ? ' active1' : ''} to={'/appointments'}
                    variants={list_animate(.9)}
                    initial="initial"
                    animate="animate"  >my appointments </MotionNavLink>}
                    <motion.a 
                    variants={list_animate(.9)}
                    initial="initial"
                    animate="animate" onClick={(()=>logout())} >logout </motion.a>
                    </>:<motion.div
             initial={{ y:"-100%",
                opacity:0,}}
                animate={{y:"0",
                opacity:1}}
                transition={{duration:.5,delay:1.5}}

                 className='account'>
                     <MotionNavLink  onClick={(()=>seticon(false))}  className="" to={'/login/user'} >create account </MotionNavLink>
                </motion.div>}

                    </div>
                </div>
            </motion.div>
            }
        </header>
    )
}
export default Header;