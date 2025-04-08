import React from "react";
import NavItem from "./NavItem";
import { faBook, faUser, faCertificate, faBookAtlas, faSignOut, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBarAdmin(props) {
    const role = props.role;
    const item = [
        { name: "User", icon: faUser, link: "/Admin/ManagerUser" },
        { name: "Courses", icon: faBook, link: "/Admin/ManagerCourse" },
        { name: "Certificate", icon: faCertificate, link: "/Admin/ManagerCertificate" },
        { name: "Blog", icon: faBookAtlas, link: "/Admin/ManagerBlog" },
        { name: "Report", icon: faFileAlt, link: "/Admin/ManagerReport" },
    ];
    const item1 = [
        { name: "Courses", icon: faBook, link: "/Admin/ManagerCourse" },
        { name: "Certificate", icon: faCertificate, link: "/Admin/ManagerCertificate" },
    ];
    
    return (
        <nav className="w-64 flex-shrink-0">
            <div className="flex-auto bg-green-900 h-full">
                <div className="flex flex-col overflow-y-auto">
                    <ul className="relative m-0 p-0 list-none h-full">
                        <li className="text-white text-2xl p-4 w-full flex relative shadow-sm justify-start bg-green-800 border-b-2 border-green-700">
                            Admin
                        </li>
                        <li className="text-white p-4 w-full flex relative shadow-sm justify-start bg-green-800 border-b-2 border-green-700">
                            <div className="mr-4 flex-shrink-0 my-auto">
                                <svg className="fill-current w-5 h-5" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
                                </svg>
                            </div>
                            <div className="flex-auto my-1">
                                <span>Project Overview</span>
                            </div>
                        </li>
                        <li className="p-4 w-full flex relative shadow-sm">
                            <div className="flex-auto my-1">
                                <span className="text-white font-medium">Develop</span>
                            </div>
                        </li>
                        {role === "admin" ?
                            item.map((it) => (
                                <NavItem key={it.name} icon={it.icon} title={it.name} link={it.link} />
                            )) :
                            item1.map((it) => (
                                <NavItem key={it.name} icon={it.icon} title={it.name} link={it.link} />
                            ))
                        }
                        <button 
                            onClick={() => signOut(auth)} 
                            className="text-green-300 flex relative px-4 hover:bg-green-800 cursor-pointer m-3"
                        >
                            <div className="mr-4">
                                <FontAwesomeIcon icon={faSignOut} className="h-5 w-5" />
                            </div>
                            <div className="flex-auto my-1">
                                <span>Đăng xuất</span>
                            </div>
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBarAdmin;