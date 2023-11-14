import React from 'react'
import {useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { API_URL } from "../../Consts.js";
import { SnackbarContext } from "../../App";
import {useContext} from 'react'
const SuccessAppoint = () => {
  const snackbarMessage = useContext(SnackbarContext);

    const navigate=useNavigate()
    const {appointmentID,patientId}=useParams()
    useEffect(() => {
      
        const mySuccessMethod = async() => {
          
            try{
         
                const response=await axios.patch(`${API_URL}/patient/successCreditCardPayment/${patientId}/${appointmentID}`)
                if (response< 300) {
                  snackbarMessage("You have successfully edited", "success");
                } else {
                  snackbarMessage(`error: ${response} has occurred`, "error");
                }
        
              }catch(error)
              {
                console.error('Error:', error);
              } 
            console.log('Success! Payment completed');
            
        };

        
        mySuccessMethod();
        navigate('/Home');
    }, []); 
    
  return (
    <div>Success</div>
  )
}

export default SuccessAppoint