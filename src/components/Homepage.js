import { useDispatch } from "react-redux";
import Bookimg from "./Bookimg";
import Doctors from "./Doctors";
import Mainimg from "./Mainimg";
import Speciality from "./Speciality";
import { useEffect } from "react";
import { Fetch_doctors } from "../store-api/slices/Doctors-slice";

function Homepage()
{
  const dispatch =useDispatch();
  useEffect(()=>
  {
     const i=localStorage.getItem("fetch");
     console.log(i)
     if(!i){
      dispatch(Fetch_doctors());
    localStorage.setItem("fetch",1)}
  })
    return(
      <>
        <Mainimg/>
       <Speciality/>
        <Doctors/>
        <Bookimg/>
     </>
    )
}
export default Homepage;