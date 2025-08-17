import { useFormik } from 'formik';
import './adddoc.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctor } from '../store-api/slices/Doctors-slice';
import * as Yup from'yup'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { speciality_data } from './data';
function Adddoctor()
{   
    const[select,set_select]=useState('fri');
         const docs=useSelector(state=>state.Reducers.doctors);
    const[time,set_time]=useState();
    const [slots,setslots]=useState([])
     const notify1 = () => toast.success("Doctor Added");
        const notify = () => toast.success("Please Select Time");
        const notify2 = () => toast.success("Slot Added");
    const schema=Yup.object({
        name:Yup.string().required(),
        specialist:Yup.string().required(),
        description:Yup.string().required(),
        address:Yup.string().required(),
        image_url:Yup.string().required(),
        fee:Yup.number().required()
    })
     const formik=useFormik(
        {
            initialValues:{
                name:'',
                specialist:'General Physician',
                description:'',
                address:'',
                image_url:'',
                fee:0,
            },
            validationSchema:schema,
            onSubmit:(values)=>
            {
                console.log(values);
               add_doctor(values)
            },
            
        }
    
    )
       
    const navigate=useNavigate()
    function  add_doctor(values)
    {
         let tid=0;
                if(docs.length===0)
                {
                    //  console.log("new 1");
                    tid=1;
                }
                else
                {
                //   console.log("docs=>",(docs[docs.length-1]))
                    tid=docs[(docs.length-1)].id;
                    // console.log("docs[(docs.length-1)].id=>",docs[(docs.length-1)].id)
                    tid=parseInt(tid)+1;
                    // console.log(tid)
                }
                if(slots.length>0){
                    // console.log()
                    
        let d={
            id:tid.toString(),
             name:"DR."+values.name,
                specialist:values.specialist,
                description:values.description,
                address:values.address,
               avatar:values.image_url,
               Apointmentfee:values.fee,
               Book_slots:slots,
               delay:parseInt(tid)/10
        }
        dispatch(addDoctor(d))
        console.log("d=>",d)
        notify1()
         setTimeout(() => {
             navigate('/alldoctors')
        }, 2000);
        }
        else
        {
            notify()
        }
      
    }
    function formatTime12(time) {
  const [hour, minute] = time.split(":");
  let h = parseInt(hour);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12; 
  return `${h}:${minute} ${ampm}`;
}
    const dispatch=useDispatch();
    function add_slot()
    {
        if(select&&time){
           let slot_temp=[...(slots||[])]
        let x=slot_temp.findIndex((f)=>f.day===select)
        if(x!==-1)
        {
            let t=slot_temp[x].time.filter((f)=>f!==formatTime12(time))
           if (!t.includes(formatTime12(time))) {
      t.push(formatTime12(time));
    }
            slot_temp[x]={"day":select,"time":t}
        }
        else
        {
            console.log("selecte",select)
            slot_temp.push({"day":select,"time":[formatTime12(time),]})
        }
        setslots(slot_temp)
        console.log("slot_temp=>",slot_temp)
        notify2()
    }
        else
        {
            notify();
        }
    }
    return(
        <div className="add_doctor">
            <div className="add_doc_cont">
                <h4>Add doctor</h4>
                <form onSubmit={formik.handleSubmit}>
                    <label for="name">Name</label>
                    <input type="string" id='name' onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.name}/>
                {formik.errors.name&&formik.touched.name&&<p className='text-danger  fw-bold'>{formik.errors.name}</p>}
                    <label for="specialist">specialist</label>
                    <select  name="specialist" onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.specialist}>
                        <option>Select specialist</option>
                        {speciality_data.map((s)=>
                        {
                            return< option key={s.id} value={s.name}>{s.name}</option>
                        })}
                    </select>
                    {/* <input type="string" id='specialist'  onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.specialist}/> */}
            {formik.errors.specialist&&formik.touched.specialist&&<p className='text-danger  fw-bold'>{formik.errors.specialist}</p>}
                    <label for="description">description</label>
                    <input type="string" id='description'  onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.description}/>
                    {formik.errors.description&&formik.touched.description&&<p className='text-danger  fw-bold'>{formik.errors.description}</p>}
                    <label for="address">address</label>
                    <input type="string" id='address'  onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.address}/>
                    {formik.errors.address&&formik.touched.address&&<p className='text-danger  fw-bold'>{formik.errors.address}</p>}
                    <label for="image_url">image url</label>
                    <input type="string" id='image_url'  onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.image_url}/>
                    {formik.errors.image_url&&formik.touched.image_url&&<p className='text-danger  fw-bold'>{formik.errors.image_url}</p>}
                    <label for="fee">Appointment fee</label>
                    <input type="string" id='fee'  onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.fee}/>
                    {formik.errors.fee&&formik.touched.fee&&<p className='text-danger  fw-bold'>{formik.errors.fee}</p>}
                    <div className='parent_but'>
                        <button onClick={(()=>add_slot())} type='button'>+add slot</button>
                    </div>
                    <div className='time_day'>
                    <select onChange={((e)=>set_select(e.target.value))}>
                        <option value={"Fri"}> Fri</option>
                        <option value={"Sun"}> Sun</option>
                        <option value={"Mon"}> Mon</option>
                        <option value={"Tue"}> Tue</option>
                        <option value={"Wed"}> Wed</option>
                        <option value={"Thu"}> Thu</option>
                        <option value={"Sat"}> Sat</option>
                    </select>
                    <input type="time" onChange={((e)=>set_time(e.target.value))}/>
                    </div>
                    <button type='submit'>Add doctor</button>
                     <ToastContainer />
                </form>
            </div>
        </div>
    )
}
export default Adddoctor