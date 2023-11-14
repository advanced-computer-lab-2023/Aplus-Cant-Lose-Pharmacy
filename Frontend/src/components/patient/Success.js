import React from 'react'
import {useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { API_URL } from "../../Consts.js";
import { SnackbarContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";

import {useContext} from 'react';
import { payForCart } from "../../features/patientSlice"; 
const SuccessAppoint = () => {
  const snackbarMessage = useContext(SnackbarContext);

    const navigate=useNavigate()
    const {userId,address}=useParams()
    console.log(userId, address);
    const dispatch = useDispatch();

    useEffect(() => {
      
        const mySuccessMethod = async() => {
          
            try{
         
              await dispatch(payForCart({
                userId: userId,
                paymentType: "Credit Card",
                address: address,
              }));
                const response=await axios.patch(`${API_URL}/patient/successCreditCardPayment/${address}/${userId}`)
                
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