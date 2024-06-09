import React from 'react';
import CustomInput from '../components/CustomInput';

const Resetpassword = () => {
  return(
    <div className="py-5" style={{background:"#ffd333",minHeight:"100vh"}}>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-5">
        <h3 className="text-center title">Reset Password</h3>
        <p className="text-center">Enter youn new password</p>
          <form action="">
            <CustomInput type='passord' label='New Password' id="passwd"/>
            <CustomInput type='password' label='Confirm Password' id="confirm_passwd"/>
            <button className='border-0 px-3 mt-3 py-2 text-white fw-bold w-100' style={{background:"#ffd333"}} type='submit'>Reset</button>
          </form>
      </div>
    </div>
  );
}

export default Resetpassword;
