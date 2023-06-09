import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AppBreadcrumb = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const label = props.meta;

    return (
        <div className="route-bar">
            <div className="route-bar-breadcrumb">
                <ul>
                    
                    {/* {location.pathname === '/' ? (
                        <li>Dashboard</li>
                    ) : ( */}
                        <li>
                            <button className="p-link">{label}</button>
                        </li>
                    {/* )} */}
                </ul>
            </div>
        </div>
    );
};

export default AppBreadcrumb;
