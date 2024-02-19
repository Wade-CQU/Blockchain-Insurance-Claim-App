import React, { useState } from 'react';
import Web3 from 'web3'
import {ContractABI} from '../ContractABI'


const MakeClaim = () => {

  const contractAddress = '0x6831260b7B603904a54e759B1c9b531d55d24854'; // Replace with Ethereum contract address
  const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); //This is default for locally hosted ethereum blockchain network
  web3.eth.defaultAccount = web3.eth.accounts[0];
  const contract = new web3.eth.Contract(ContractABI, contractAddress);

  //Retrieve input from user's claim form and send tx to blockchain network
  async function setClaimInfo() {
    const claimNumber = generateRandomClaimNumber().toString();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await contract.methods.setClaimInfo(
      claimNumber,
      formData.accNumber,
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.vehicleReg,
      formData.accidentDesc,
      formData.dateOfAccident,
      "new"
    ).estimateGas();
    const result = await contract.methods.setClaimInfo(
        claimNumber,
        formData.accNumber,
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.vehicleReg,
        formData.accidentDesc,
        formData.dateOfAccident,
        "new"
      )
    .send({ from: account, gas });
    setFormSubmitted(!formSubmitted);
    console.log(result);
  }

  // Generate a random 10-digit number (used for claim ID for demonstration purpose)
  function generateRandomClaimNumber() {
    const min = 1000000000; 
    const max = 9999999999; 
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  //react state hook to update when form is submitted
  const [formSubmitted, setFormSubmitted] = useState(false)
  //react state hook to hold user's input into claim form
  const [formData, setFormData] = useState({
    accNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    vehicleReg: '',
    accidentDesc: '',
    dateOfAccident: '',
    progress: '',
  });

  //update formData variable to hold user input from the form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //run the setClaimInfo function when user clicks submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setClaimInfo();
  };

  return (
    <div className='form-container'>
      <h2>{formSubmitted ? 'FORM SUCCESSFULLY SUMBITTED' : 'SUBMIT A CLAIM' }</h2>
      <form onSubmit={handleSubmit} className='claim-form' style={formSubmitted ? {display: 'none'} : {}}>
      <label>
        Account Number:
        <input type="text" name="accNumber" className="form-field" required value={formData.accNumber} onChange={handleChange} />
      </label>
      <br />
      <label>
        First Name:
        <input type="text" name="firstName" className="form-field" required value={formData.firstName} onChange={handleChange}/>
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="lastName" className="form-field" required value={formData.lastName}onChange={handleChange}/>
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" className="form-field" required value={formData.email} onChange={handleChange}/>
      </label>
      <br />
      <label>
        Vehicle Registration:
        <input type="text" name="vehicleReg" className="form-field" required value={formData.vehicleReg} onChange={handleChange}/>
      </label>
      <br />
      <label>
        Accident Description:
        <textarea rows={3} type="text" name="accidentDesc" className="form-field" required value={formData.accidentDesc} onChange={handleChange}/>
      </label>
      <br />
      <label>
        Date of Accident:
        <input type="date" name="dateOfAccident" className="form-field" required value={formData.dateOfAccident} onChange={handleChange}/>
      </label>
      <br />
      <button type="submit">SUBMIT</button>
    </form>
    {formSubmitted ? <a href='/'>Go back</a> : ''}
  </div>
  )
}

export default MakeClaim