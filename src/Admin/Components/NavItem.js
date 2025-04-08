import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function NavItem(props) {
    const { icon, title, link } = props;
    return (
        <Link 
            to={link} 
            className="text-green-300 flex relative px-4 hover:bg-green-800 cursor-pointer m-3"
        >
            <div className="mr-4">
                <FontAwesomeIcon icon={icon} className="h-5 w-5" />
            </div>
            <div className="flex-auto my-1">
                <span>{title}</span>
            </div>
        </Link>
    );
}

export default NavItem;