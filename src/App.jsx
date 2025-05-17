import React from 'react';
import MainLayout from './Layout/main';
import AuthLayout from './Layout/auth';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Aiquestions from './Pages/Paginations/Aiquestions';
import Login from './Pages/Registration/Login';
import Signup from './Pages/Registration/Signup';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './Pages/Admin/Dashboard';
import UserDashboard from './Pages/User/Dashboard';
import PricingPlans from './Pages/Pricing/PricingPlans';
import CustomPackageBuilder from './components/CustomPackageBuilder';
import SuperAdminDashboard from './Pages/SuperAdmin/Admin/SuperAdminDashboard';
import SuperDashboard from './Pages/SuperAdmin/SuperDashboard';

const App = () => {
    return (
        <React.Fragment>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<MainLayout />}>
                            <Route index element={<Navigate to="/home" />} />
                            <Route path='home' element={<Home />} />
                            
                            {/* Authentication Routes */}
                            <Route path='login' element={<Login />} />
                            <Route path='signup' element={<Signup />} />
                            <Route path='dashboard' element={<Dashboard />} />
                            <Route path='userdashboard' element={<UserDashboard />} />
                            <Route path='superadmin' element={<SuperDashboard />} />
                            <Route path='PricingPlans' element={<PricingPlans />} />
                            <Route path='CustomPackageBuilder' element={<CustomPackageBuilder />} />
                            <Route path='SubscriptionProvider' element={<SubscriptionProvider />} />
                            
                            {/* AI and Interactive Routes */}
                            <Route path='ai-questions' element={<Aiquestions/>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </React.Fragment>
    );
};

export default App;
