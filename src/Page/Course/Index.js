import React from 'react';
import './Course.css';
import { Outlet } from 'react-router-dom';
import ListCard from '../../Components/Course/ListCard';
function Course() {
    
    return (
        <div>
            <ListCard></ListCard>
            <Outlet/>
        </div>
    );
}
export default Course;