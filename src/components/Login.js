import { useEffect, useState } from 'react';
import './Auth.css'
import { useFormik } from 'formik';
import * as Yup from'yup'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { adduser } from '../store-api/slices/Users-slice';
import { ToastContainer, toast } from 'react-toastify';

function Login()
{
    const param=useParams();
    const register_schema=Yup.object(
        {
           name:Yup.string().min(3,'must be 3 charcters or more').required('Name is required'),
           email:Yup.string().email('Invalid email format').required("Email is required"),
           password:Yup.string().required("Paasword is required").min(6),
        }
    ) 
    const[sign,set_sign]=useState(true);
        const[count,setcount]=useState(0);
    const formik=useFormik(
        {
            initialValues:{
                email:'',
                password:''
            },
            onSubmit:(values)=>
            {
                console.log(values);
                checkuser(values,param.type);
            }
        }
    
    )
    const formikR=useFormik(
        {
            initialValues:{
                name:'',
                email:'',
                password:''
            },
            onSubmit:(values)=>
            {
                Adduser(values)
            },
            validationSchema:register_schema,
        }
    
    )
    useEffect(()=>
    {
        if(param.type==='admin')
            set_sign(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },param)
        const notify = () => toast.error("Wrong password or email");
     const users=useSelector(state=>state.Reducers.Users);
          const navigate=useNavigate();
        const dispatch=useDispatch();
  function Adduser(values)
        {
            console.log("in functio");
            if(users.length>0){
                 console.log("in")
            const u=users.find((x)=>x.email===values.email);
            console.log(u+"u");
            if(u)
            {
                console.log("in2")
               notify()
            }
            else 
            {
                console.log("new");
                let id=0;
                if(users.length===0)
                {
                     console.log("new 1");
                    id=1;
                }
                else
                {
                    id=users[(users.length-1)].id;
                    id=id+1;
                }
                dispatch(adduser({"id":id,"name":values.name,"email":values.email,"password":values.password,"type":"user","doc_slots":[]}));                
               set_sign(false);

            }}
            else
            {
                  console.log("new");
                let id=0;
                if(users.length===0)
                {
                     console.log("new 1");
                    id=1;
                }
                else
                {
                    id=users[(users.length-1)].id;
                    id=id+1;
                }
                dispatch(adduser({"id":id,"name":values.name,"gender":"","address":"", "img":"","phone":"000000","birthdate":"","email":values.email,"password":values.password,"type":"user","doc_slots":[]}));                                
               set_sign(false);
            }

        }
        function checkuser(values,type)
    {
       
        console.log(users);
        if(type==='user'){
            // console.log("user");
            if(count>2)
            {
               set_sign(true);
               setcount(0)
            }
        if(users.length===0)
        {
            //  console.log("not user")
            setcount(count+1);
            // console.log("count"+count);
           notify()
        }
        else
        {
            if(count<3){
                // console.log("pass"+password);
            const u=users.find((x)=>x.password===values.password&&x.email===values.email);
            if(u)
            {
                localStorage.setItem("id",u.id);
                setcount(0);
                // console.log("true ")
                navigate('/');
            }
            else {
                notify()
                setcount(count+1);}
        }
        
        }
        
    }
    else
    {
        console.log("type"+type);
        if(values.email==="admin@1234.com"&&values.password==="admin1")
        {
            localStorage.setItem("admin","true");
            navigate('/');
        }
        else
        {
           notify()
        }
    }
    }

    return(
        <div>
            {!sign?
            <div className="login_cont">
                <h3><span>{param.type==='user'?"user":"admin"}</span> login</h3>
                <p>Please log in to book appointment</p>
                <form onSubmit={formik.handleSubmit}>
                    <label for="email">emial</label>
                    <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.email} id="email" placeholder={param.type==="admin"&&"admin@1234.com"}></input>
                    <label for="password">password</label>
                    <input 
                     onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.password}  placeholder={param.type==="admin"&&"admin1"} id="password"></input>
                    <div className='bbutton_parent'>
                    <button>login</button>
                             <ToastContainer />
                    
                    </div>
                </form>
                {param.type==='user'&& <p>Create an new account? <button onClick={(()=>{set_sign(true)})}>Click here</button></p>}
               
            </div>:<div className="login_cont">
                <h3>Create account</h3>
                <p>Please sign up to book appointment</p>
                <form onSubmit={formikR.handleSubmit}>
                    <label for="name">first name</label>
                    <input
                     id="name" 
                     onChange={formikR.handleChange}
                    onBlur={formikR.handleBlur}
                    value={formikR.name}></input>
                    {formikR.errors.name&&formikR.touched.name&&<p className='text-danger  fw-bold'>{formikR.errors.name}</p>}
                    <label for="email">emial</label>
                    <input 
                    onChange={formikR.handleChange}
                    onBlur={formikR.handleBlur}
                    value={formikR.email}
                    id="email"></input>
                    {formikR.errors.email&&formikR.touched.email&&<p className='text-danger  fw-bold'>{formikR.errors.email}</p>}
                    <label for="password">password</label>
                    <input 
                    onChange={formikR.handleChange}
                    onBlur={formikR.handleBlur}
                    value={formikR.password}id="password"></input>
                    {formikR.errors.password&&formikR.touched.password&&<p className='text-danger  fw-bold'>{formikR.errors.password}</p>}
                    <div className='bbutton_parent'>
                    <button>Create account</button>
                    </div>
                </form>
                <p>Already have an account? <button onClick={(()=>{set_sign(false)})}>login here</button></p>
            </div>}
            
        </div>
    )
}
export default Login;