
import './App.css'
import DoctorComponent from './components/DoctorComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListDoctorComponent from './components/ListDoctorComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {


  return (
    <>
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
          {/* //http://localhost:3000 */}
          <Route path='/' element={<ListDoctorComponent></ListDoctorComponent>}></Route>
          {/* //http://localhost:3000/doctors */}
          <Route path='/doctors' element={<ListDoctorComponent></ListDoctorComponent>}></Route>
           {/* //http://localhost:3000/add-doctor */}
           <Route path='/add-doctor' element={<DoctorComponent/>}></Route>  
           {/* //http://localhost:3000/edit-doctor/1 */}
           <Route path='/edit-doctor/:id' element={<DoctorComponent/>}></Route>
      </Routes>
      {/* <FooterComponent/> */}
    </BrowserRouter>
    </>
  )
}

export default App
