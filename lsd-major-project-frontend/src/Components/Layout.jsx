import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <Navbar onSearch={setSearchQuery} />
            <Outlet context={{ searchQuery }} />
        </>
    );
}

export default Layout;
