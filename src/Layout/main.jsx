import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <React.Fragment>
            <Header />
            <div className='w-full min-h-[calc(100vh-248px)]'>
                <Outlet />
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default MainLayout;