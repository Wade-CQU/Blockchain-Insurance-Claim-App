import React, { useState } from 'react';
import Web3 from 'web3'
import {ContractABI} from '../ContractABI'

const ProcessClaim = () => {

  const contractAddress = '0x6831260b7B603904a54e759B1c9b531d55d24854'; // Replace with Ethereum contract address
  const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); //This is default for locally hosted ethereum blockchain network
  web3.eth.defaultAccount = web3.eth.accounts[0];
  const contract = new web3.eth.Contract(ContractABI, contractAddress);

  //connect to user's account on etherem network
  async function connectAccount(){
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    console.log(account);
    setAccountSet(true);
  }

  //retrieve pending claims from blockchain
  async function showPendingClaims() {
    setClaimsLoaded(true);
    const latestBlockNumber = await web3.eth.getBlockNumber();
    let newClaims = [];
    let claimsWhereStatusIsNotNew = [];
  
    for (let i = 0; i <= latestBlockNumber; i++) {
      try {
        const block = await web3.eth.getBlock(i);
        if (block) {
          const result = await contract.methods.getClaimInfo().call({}, block.number);
          if(result.progress === 'new'){
            console.log('Block status = ', result.progress);
            const newClaim = {claimNumber : result.claimNumber, accNumber : result.accNumber, accidentDesc : result.accidentDesc, dateOfAccident : result.dateOfAccident, email : result.email, 
              firstName: result.firstName, lastName : result.lastName, progress: result.progress, vehcileReg: result.vehcileReg, blockNumber: block.number}
              newClaims.push(newClaim)
          } else {
            const newClaim = {claimNumber : result.claimNumber, accNumber : result.accNumber, accidentDesc : result.accidentDesc, dateOfAccident : result.dateOfAccident, email : result.email, 
              firstName: result.firstName, lastName : result.lastName, progress: result.progress, vehcileReg: result.vehcileReg, blockNumber: block.number}
              claimsWhereStatusIsNotNew.push(newClaim);
          }
        }
        await new Promise(resolve => setTimeout(resolve, 10));
      } catch (e) {
        console.log(`Block ${i}:`, e);
      }
    }
    //remove any claims that have already been processed from the list
    let uniquePendingClaimNumbers = new Set(claimsWhereStatusIsNotNew.map(claim => claim.claimNumber));
    let filteredNewClaims = newClaims.filter(claim => !uniquePendingClaimNumbers.has(claim.claimNumber));
    setPendingClaims(filteredNewClaims);
  }

  //Update claim status by sending new tx to blockchain network
  const changeClaimStatus = (chosenStatus) => {
    console.log('div clicked status: ', chosenStatus)
    updateStatus();
    async function updateStatus(){
      const accounts = await window.ethereum.enable();
      const account = accounts[0];
      const result = await contract.methods.setClaimInfo(
        claimDetails.claimNumber,
        claimDetails.accNumber,
        claimDetails.firstName,
        claimDetails.lastName,
        claimDetails.email,
        claimDetails.vehcileReg,
        claimDetails.accidentDesc,
        claimDetails.dateOfAccident,
        chosenStatus
      ).send({ from: account, gas: '1000000' });
      setShowListOfClaims(true);
      setShowSuccessfullProcess(true);
      console.log(result);
    }
  }

  //display pending transactions
  const renderPendingCLaims = ()=> {
    return listOfPendingClaims.map((claim, index) => 
      <div key={index} className='claim-list-item' onClick={() => viewClaim(claim)}>
        <div className='claim-list-name'>{claim.firstName} {claim.lastName}</div>
        <div className='claim-list-date'>{claim.dateOfAccident}</div>
        <div className='claim-list-status'>NEW</div>
      </div>
    )
  }

  //change UI when user clicks on a claim to remove the list of all claims and instead show details of that claim
  const viewClaim = (claim)=>{
    setClaimDetails(claim);
    setShowListOfClaims(false);
    console.log(claim);
  }

  //Show claim details when user selects a claim to view
  const renderClaimDetails = (claim) => {
    return(
      <div>
          <form className='claim-form'>
            <label>
              Account Number:
              <input type="text" name="accNumber" className="form-field" readOnly value={claim.accNumber} />
            </label>
            <br />
            <label>
              First Name:
              <input type="text" name="firstName" className="form-field" readOnly value={claim.firstName}/>
            </label>
            <br />
            <label>
              Last Name:
              <input type="text" name="lastName" className="form-field" readOnly value={claim.lastName}/>
            </label>
            <br />
            <label>
              Email:
              <input type="text" name="email" className="form-field" readOnly value={claim.email} />
            </label>
            <br />
            <label>
              Vehicle Registration:
              <input type="text" name="vehcileReg" className="form-field" readOnly value={claim.vehcileReg} />
            </label>
            <br />
            <label>
              Accident Description:
              <textarea rows={3} type="text" name="accidentDesc" className="form-field" readOnly value={claim.accidentDesc}/>
            </label>
            <br />
            <label>
              Date of Accident:
              <input type="text" name="dateOfAccident" className="form-field" readOnly value={claim.dateOfAccident}/>
            </label>
            <br />
            <div className='process-claim-buttons'>
              <div onClick={()=> changeClaimStatus('declined')}>DECLINE</div>
              <div onClick={()=> changeClaimStatus('pending')}>MOVE TO VERIFY STAGE</div>
            </div>
      </form>
      </div>
    )
  }
  
  //React states used to update UI components
  const [accountSet, setAccountSet] = useState(false)
  const [claimsLoaded, setClaimsLoaded] = useState(false)
  const [showSuccessfullProcess, setShowSuccessfullProcess] = useState(false)
  const [showListOfClaims, setShowListOfClaims] = useState(true)
  const [listOfPendingClaims, setPendingClaims] = useState([])   
  const [claimDetails, setClaimDetails] = useState({});                                   

  return (
    <div className='form-container'>
      <h2>{showListOfClaims ? 'CLAIMS TO BE PROCESSED' : 'CLAIM DETAILS'}</h2>
      {showSuccessfullProcess && <div className='success-message'>CLAIM PROCESSED</div>}
      {accountSet ? <button onClick={showPendingClaims} style={claimsLoaded ? {display: 'none'} : {}}>VIEW PENDING CLAIMS</button> : <button onClick={connectAccount}>Log in with MetaMask</button>}
      {showListOfClaims ? renderPendingCLaims() : renderClaimDetails(claimDetails)}
      <br></br><a href='/'>Go back</a>
    </div>
  )
}

export default ProcessClaim