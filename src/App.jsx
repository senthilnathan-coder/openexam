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
// import Login from './Pages/Registration/Login';
// import Signup from './Pages/Registration/Signup';
// import Quizzes from './Pages/Paginations/Quizzes';
// import Paperassign from './Pages/Paginations/Paperassign';
// import Aiquizz from './Pages/Paginations/Aiquizz';
// import Interactive from './Pages/Paginations/Interactive';
// import Codeassign from './Pages/Paginations/Codeassign';
// import Online from './Pages/Paginations/Online';
// import Paper from './Pages/Paginations/Paper';
// import Aiquestion from './Pages/Paginations/Aiquizz';
// import Aiquestions from './Pages/Paginations/Aiquestions';
// import AdminLogin from './Pages/Admin/AdminLogin';
// import UserAdminDashboard from './Pages/Admin/UserAdminDashboard';
// import SuperAdminLogin from './Pages/Admin/SuperAdminLogin';
// import SuperAdminDashboard from './Pages/Admin/SuperAdminDashboard';

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
                            <Route path='PricingPlans' element={<PricingPlans />} />
                            <Route path='CustomPackageBuilder' element={<CustomPackageBuilder />} />
                            <Route path='SubscriptionProvider' element={<SubscriptionProvider />} />
                            
                            {/* Exam and Assessment Routes */}
                            {/* <Route path='online-exam' element={<Online />} />
                            <Route path='paper-exams' element={<Paper />} />
                            <Route path='quizzes' element={<Quizzes />} /> */}
                            





                            
                            {/* Assignment Routes */}
                            {/* <Route path='code-assignment' element={<Codeassign />} />
                            <Route path='paper-assignment' element={<Paperassign />} /> */}
                            
                            {/* AI and Interactive Routes */}
                            <Route path='ai-questions' element={<Aiquestions/>} />
                            {/* <Route path='aiquizzes' element={<Aiquizz/>} />
                            <Route path='lessons' element={<Interactive />} />
                             */}
                            {/* Admin Routes */}
                            {/* <Route path="/admin/login" element={<AdminLogin />} />
                             */}
                            {/* <Route path="/admin/user-dashboard" element={<UserAdminDashboard />} />
                            <Route path="/super-admin/login" element={<SuperAdminLogin />} />
                            <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} /> */}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </React.Fragment>
    );
};

export default App;
