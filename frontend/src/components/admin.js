import React from 'react';
import Cookies from 'js-cookie';

import ControlPanel from './adminPage/controlPanel';
import AdminLoginPage from './adminPage/loginPage';

const Admin = () => {
    var renderPage = [];

    if (Cookies.get('AUTHTOKEN') == undefined || Cookies.get('AUTHTOKEN') != localStorage.getItem('AUTHTOKEN')) {
        renderPage.push(
            <AdminLoginPage />
        )
    } else {
        renderPage.push(
            <ControlPanel />
        )
    }
    
    return (
        <div>
            {renderPage}
        </div>
    )
}

export default Admin;