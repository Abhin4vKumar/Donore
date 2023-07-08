import React, { useState } from 'react';
import { useEffect } from 'react'
import { Navigation } from './components/navigation';
import { DashNavigation } from './components/dashNav';
import DashBoardObj from './components/dashboard';

function DashPage() {
    return (
        <>
            <DashNavigation/>
            <DashBoardObj />
        </>
    )
}
export default DashPage;