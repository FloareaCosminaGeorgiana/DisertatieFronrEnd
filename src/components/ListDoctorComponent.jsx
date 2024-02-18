import React, {useEffect, useState} from 'react'
import { fetchDoctorList, deleteDoctor } from '../services/DoctorService';
import { fetchSpecializationList } from '../services/SpecilizationService';
import { useNavigate } from 'react-router-dom';

const ListDoctorComponent = () => {

   const [doctors,setDoctors] = useState([]);
   const [specializations,setSpecializations] = useState([]);
   const navigator = useNavigate();

   useEffect(()=>{
        getDoctors();
        getSpecializations();
   },[]);

   function addDoctor() {
     navigator('/add-doctor');
   }

   function getDoctors() {
        fetchDoctorList().then((response) => {
            setDoctors(response.data);
        }).catch(console.error());
   }
   function getSpecializations() {
        fetchSpecializationList().then((response) => {
            setSpecializations(response.data);
        }).catch(console.error());
   }

   function getSpecializationName(specializationId) {
    const specialization = specializations.find(spec => spec.id === specializationId);
    return specialization ? specialization.name : '';
}
function updateDoctor(id) {
    navigator(`/edit-doctor/${id}`)
}
function deleteDoctorById(id) {
    deleteDoctor(id).then((response)=>{
        getDoctors();
    }).catch((error)=>{
        console.error(error);
    })
}

  return (
    <div className='container'>
        <h2 className='text-center'>List of Doctors:</h2>
        <button className='btn btn-primary' onClick={addDoctor} >Add Doctor</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>First Name</th>
                    <th>Email</th>
                    <th>Specialization</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    doctors.map(doctor => 
                        <tr key={doctor.id}>
                            <td>{doctor.id}</td>
                            <td>{doctor.firstName}</td>
                            <td>{doctor.lastName}</td>
                            <td>{doctor.email}</td>
                            <td>{getSpecializationName(doctor.specializationId)}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateDoctor(doctor.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => deleteDoctorById(doctor.id)}>Delete</button>
                            </td>
                        </tr>
                        )
                }

            </tbody>
        </table>
    </div>
  )
}

export default ListDoctorComponent