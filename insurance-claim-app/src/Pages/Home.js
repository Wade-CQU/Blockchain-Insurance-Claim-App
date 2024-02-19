import React from 'react'
import makeClaimIMG from '../Assets/makeClaim.jpeg'
import processClaimIMG from '../Assets/processClaim.jpeg'
import VerifyClaimIMG from '../Assets/verifyClaim.jpeg'
import PageCard from '../Components/PageCard'

const Home = () => {
  return (
    <div>
        <div className='pagecard-container'>
            <PageCard img={makeClaimIMG} text={'Make a claim'} link={'/MakeClaim'} />
            <PageCard img={processClaimIMG} text={'Process a claim'} link={'/ProcessClaim'}/>
            <PageCard img={VerifyClaimIMG} text={'Verify a claim'} link={'/VerifyClaim'}/>        
        </div>
    </div>
  )
}

export default Home