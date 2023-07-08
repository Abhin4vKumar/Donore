import React, { useState } from 'react';
import { useEffect } from 'react'
import { Navigation } from './components/navigation';
import LoginPage from './components/loginRegis';

function AuthPage() {


  return (
    <>
      <Navigation/>
      <LoginPage/>
    </>
    
  );
}

export default AuthPage;
