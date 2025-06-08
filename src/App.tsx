import './App.css'
import NavBar from "@/components/NavBar.tsx";
import {Route, Routes, useLocation} from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard.tsx";
import ManageCategory from "@/pages/manage-category/ManageCategory.tsx";
import Explore from "@/pages/explore/Explore.tsx";
import ManageItem from "@/pages/manage-item/ManageItem.tsx";
import ManageUser from "@/pages/manage-user/ManageUser.tsx";
import { Toaster } from "@/components/ui/sonner";
import Login from "@/pages/login/Login.tsx";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
    const location = useLocation();
    const hideNavBar = location.pathname === "/login";
    return (
        <div>
            {!hideNavBar && <NavBar/>}
            <Toaster />
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/categories" element={<ManageCategory/>}/>
                    <Route path="/explore" element={<Explore/>}/>
                    <Route path="/items" element={<ManageItem/>}/>
                    <Route path="/users" element={<ManageUser/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App
