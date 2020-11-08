import React from 'react';

import AdminNavigationBar from './adminNavBar/adminNavBar';
import AdminPostList from './adminPostList/adminPostList';
import AdminPostCreator from './adminPostCreator/adminPostCreator';

const ControlPanel = () => {
    return (
        <div>
            <AdminNavigationBar />
            <AdminPostList />
            <AdminPostCreator />
        </div>
    )
}

export default ControlPanel;