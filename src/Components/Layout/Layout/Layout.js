import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAnchor, faBars, faNewspaper, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase.js';
import { AuthContext } from '../../../context/AuthContext.js';
import Footer from '../Footer/Footer.js';
import './Layout.css';

function Layout() {
    const { currentUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="layout-container">
            {/* Header/Navbar */}
            <header className="navbar-header">
                <div className="navbar-brand">
                    <Link to="/" className="brand-logo">
                        <FontAwesomeIcon className="Icon" icon={faAnchor} />
                        <span>BRAND</span>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button className="menu-toggle" onClick={toggleMenu}>
                    <FontAwesomeIcon className="Icon" icon={faBars} />
                </button>

                {/* Navigation */}
                <nav className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="nav-item">
                        <FontAwesomeIcon className="Icon" icon={faHome} />
                        Trang chủ
                    </Link>
                    <Link to="/Course" onClick={() => setIsMenuOpen(false)} className="nav-item">
                        <FontAwesomeIcon className="Icon" icon={faBookOpen} />
                        Các khóa học
                    </Link>
                    <Link to="/Blog" onClick={() => setIsMenuOpen(false)} className="nav-item">
                        <FontAwesomeIcon className="Icon" icon={faNewspaper} />
                        Bài viết
                    </Link>
                    <Link to="/Profile" onClick={() => setIsMenuOpen(false)} className="nav-item">
                        <FontAwesomeIcon className="Icon" icon={faUser} />
                        Trang cá nhân
                    </Link>

                    {/* User Section */}
                    <div className="user-section">
                        {currentUser ? (
                            <div className="user-info">
                                <img 
                                    src={currentUser.photoURL} 
                                    alt="profile" 
                                    className="user-avatar"
                                />
                                <span className="user-name">{currentUser.displayName}</span>
                                <button 
                                    onClick={() => signOut(auth)} 
                                    className="logout-btn"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <Link to="/Login" className="login-btn">
                                Đăng nhập
                            </Link>
                        )}
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Layout;