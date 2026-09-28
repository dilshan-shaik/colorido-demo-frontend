import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {

    const navigate = useNavigate();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: "📊"
        },
        {
            name: "Fest Info",
            path: "/admin/fest",
            icon: "🎉"
        },
        {
            name: "Categories",
            path: "/admin/categories",
            icon: "🗂️"
        },
        {
            name: "Events",
            path: "/admin/events",
            icon: "🎭"
        },
        {
            name: "Venues",
            path: "/admin/venues",
            icon: "📍"
        },
        {
            name: "Schedule",
            path: "/admin/schedule",
            icon: "📅"
        },
        {
            name: "Results",
            path: "/admin/results",
            icon: "🏆"
        },
        {
            name: "Map",
            path: "/admin/map",
            icon: "🗺️"
        },
        {
            name: "Gallery",
            path: "/admin/gallery",
            icon: "🖼️"
        },
        {
            name: "Contact",
            path: "/admin/contact",
            icon: "📞"
        }
    ];


    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("adminToken");

        localStorage.removeItem("admin");

        navigate("/admin/login");

    };


    return (

        <aside className="admin-sidebar">

            {/* =========================
                BRAND
            ========================= */}

            <div className="admin-sidebar-brand">

                <div className="admin-logo">
                    C
                </div>

                <div>

                    <h2>
                        COLORIDO
                    </h2>

                    <span>
                        ADMIN PANEL
                    </span>

                </div>

            </div>


            {/* =========================
                NAVIGATION
            ========================= */}

            <nav className="admin-sidebar-nav">

                <p className="sidebar-section-title">
                    MANAGEMENT
                </p>

                {menuItems.map(item => (

                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `admin-nav-link ${
                                isActive
                                    ? "active"
                                    : ""
                            }`
                        }
                    >

                        <span className="nav-icon">
                            {item.icon}
                        </span>

                        <span>
                            {item.name}
                        </span>

                    </NavLink>

                ))}

            </nav>


            {/* =========================
                BOTTOM
            ========================= */}

            <div className="admin-sidebar-bottom">

                <div className="admin-event-info">

                    <strong>
                        COLORIDO 2K26
                    </strong>

                    <span>
                        R.V.R. & J.C. College
                    </span>

                </div>


                <button
                    className="admin-logout-button"
                    onClick={handleLogout}
                >

                    <span>
                        🚪
                    </span>

                    Logout

                </button>

            </div>

        </aside>

    );
}