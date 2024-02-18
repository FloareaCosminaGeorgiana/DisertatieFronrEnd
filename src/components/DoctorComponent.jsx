import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSpecializationList } from '../services/SpecilizationService';
import { createDoctor, getDoctor, updateDoctor } from '../services/DoctorService';
const DoctorComponent = () => {

    const [specializations, setSpecializations] = useState([]);

    const {id} = useParams();

    useEffect(()=>{
        if(id) {
           getDoctor(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setSpecializationId(response.data.specializationId);
           }).catch(error => {
            console.log(error);
           })
        }
    },[id])
 
    useEffect(()=>{
        fetchSpecializationList().then((response) => {
            setSpecializations(response.data);
         }).catch(console.error())
    },[]);

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [specializationId, setSpecializationId] = useState('');

    const [errors, setErrors] = useState({
        firstName:'',
        lastName:'',
        email:'',
        specializationId:''
    });

   const navigator = useNavigate();

   function handleFirstName(e) {
        setFirstName(e.target.value);
   }

   function handleLasttName(e) {
    setLastName(e.target.value);
}

function handleEmail(e) {
    setEmail(e.target.value);
}

function handleSpecialization(e) {
    setSpecializationId(e.target.value);
}

function saveOrUpdateDoctor(e) {
    e.preventDefault();
    if(validateForm()) {
        const doctor = {firstName,lastName,email,specializationId};
        debugger;
        if(id) {
            updateDoctor(id, doctor).then((response)=>{
                console.log(response.data);
            navigator('/doctors');
            }).catch(error=>{console.error(error)});
        } else {
            createDoctor(doctor).then(response=>{
                console.log(response.data);
                navigator('/doctors');
            }).catch(error=>{console.error(error)}); 
        }
    }
}

function validateForm() {
    let valid = true;

    const errorsCopy = {... errors}

    if(firstName.trim()) {
        errorsCopy.firstName = '';
    } else {
        errorsCopy.firstName = 'First Name is required!';
        valid = false;
    }

    if(lastName.trim()) {
        errorsCopy.lastName = '';
    } else {
        errorsCopy.lastName = 'Last Name is required!';
        valid = false;
    }

    if(email.trim()) {
        errorsCopy.email = '';
    } else {
        errorsCopy.email = 'Email is required!';
        valid = false;
    }

    if(specializationId) {
        errorsCopy.specializationId = '';
    } else {
        errorsCopy.specializationId = 'Specialization is required!';
        valid = false;
    }

    setErrors(errorsCopy);
    return valid;
}

function pageTitle() {
    if(id) {
        return <h3 className='text-center'>Update Doctor</h3> 
    } else {
        return <h3 className='text-center'>Add Doctor</h3> 
    }
}

  return (
    <div className='container'>
        <br></br>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input type='text' placeholder='Enter first name' name='firstName' value={firstName} 
                            className= {`form-control ${errors.firstName ? 'is-invalid':''}`}
                            onChange={handleFirstName}></input>
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input type='text' placeholder='Enter last name' name='lastName' value={lastName} 
                            className={`form-control ${errors.lastName ? 'is-invalid':''}`}
                            onChange={handleLasttName}></input>
                            {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}

                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input type='text' placeholder='Enter email' name='email' value={email}
                            className={`form-control ${errors.email ? 'is-invalid':''}`}
                            onChange={handleEmail}></input>
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Specializations:</label>
                            <select name='specialization' value={specializationId} 
                            className={`form-control ${errors.specializationId ? 'is-invalid':''}`}
                             onChange={handleSpecialization}>
                                <option value="">Select specialization</option>
                                {specializations.map((specialization) => (
                                    <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
                                ))}
                            </select>
                            {errors.specializationId && <div className='invalid-feedback'>{errors.specializationId}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateDoctor}>Save</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
  )
}

export default DoctorComponent