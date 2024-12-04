import React from 'react';
import { Outlet } from 'react-router-dom';
import ListCardBlog from '../../Components/Blog/ListCardBlog';
function Blog() {
    return (
        <div>
            <ListCardBlog></ListCardBlog>
            <Outlet/>
        </div>
    );
}

export default Blog;