import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faAnchor,
  faBars,
  faNewspaper,
  faBookOpen,
  faUser,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.js";
import { AuthContext } from "../../../context/AuthContext.js";
import Footer from "../Footer/Footer.js";
import "./Layout.css";
import ChatBot from "../Component/ChatBot.js";

function Layout() {
  const { currentUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Mở/đóng modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Đóng modal
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
        <nav className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="nav-item"
          >
            <FontAwesomeIcon className="Icon" icon={faHome} />
            Trang chủ
          </Link>
          <Link
            to="/Course"
            onClick={() => setIsMenuOpen(false)}
            className="nav-item"
          >
            <FontAwesomeIcon className="Icon" icon={faBookOpen} />
            Các khóa học
          </Link>
          <Link
            to="/Blog"
            onClick={() => setIsMenuOpen(false)}
            className="nav-item"
          >
            <FontAwesomeIcon className="Icon" icon={faNewspaper} />
            Bài viết
          </Link>
          <Link
            to="/Profile"
            onClick={() => setIsMenuOpen(false)}
            className="nav-item"
          >
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
                <button onClick={() => signOut(auth)} className="logout-btn">
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
      <button
        className="fixed bottom-6 right-6 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none flex items-center space-x-2"
        onClick={() => toggleModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 2048 2048"
        >
          <path
            fill="currentColor"
            d="M768 1024H640V896h128zm512 0h-128V896h128zm512-128v256h-128v320q0 40-15 75t-41 61t-61 41t-75 15h-264l-440 376v-376H448q-40 0-75-15t-61-41t-41-61t-15-75v-320H128V896h128V704q0-40 15-75t41-61t61-41t75-15h448V303q-29-17-46-47t-18-64q0-27 10-50t27-40t41-28t50-10q27 0 50 10t40 27t28 41t10 50q0 34-17 64t-47 47v209h448q40 0 75 15t61 41t41 61t15 75v192zm-256-192q0-26-19-45t-45-19H448q-26 0-45 19t-19 45v768q0 26 19 45t45 19h448v226l264-226h312q26 0 45-19t19-45zm-851 462q55 55 126 84t149 30q78 0 149-29t126-85l90 91q-73 73-167 112t-198 39q-103 0-197-39t-168-112z"
          />
        </svg>
        <span>Chat with AI</span>
      </button>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-[50%] shadow-lg transform transition-all duration-300 ease-in-out">
            <ChatBot closeModal={closeModal}></ChatBot>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
