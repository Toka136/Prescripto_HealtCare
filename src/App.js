
import './App.css';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Footer from './components/Footer';
import AllDoctors from './components/AllDoctors';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Doctor from './components/Doctor';
import Login from './components/Login';
import Profile from './components/Profile';
import Appointments from './components/Appointments';
import Adddoctor from './components/Adddoctor';
import Contact from './components/Contact';


function App() {
  return (
    <>
  <Header/>
  <Routes>
    <Route path='/' element={  <Homepage/>}/>
    <Route path='/profile' element={  <Profile/>}/>
    <Route path='/Adddoctor' element={  <Adddoctor/>}/>
    <Route path='/login/:type' element={  <Login/>}/>
    <Route path='/about' element={  <About/>}/>
    <Route path='/contact' element={  <Contact/>}/>
    <Route path='/appointments' element={  <Appointments/>}/>
    <Route path='/alldoctors' element={<AllDoctors/>}/>
    <Route path='/alldoctors/:spec' element={<AllDoctors/>}/>
    <Route path='/doctor/:doc_id' element={<Doctor/>}/>
 

  </Routes>
  <Footer/>
  </>
  );
}

export default App;
