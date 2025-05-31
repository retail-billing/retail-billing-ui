import './App.css'
import NavBar from "@/components/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import Dashboard from "@/pages/Dashboard/Dashboard.tsx";
import ManageCategory from "@/pages/ManageCategory/ManageCategory.tsx";
import Explore from "@/pages/Explore/Explore.tsx";
import ManageItem from "@/pages/ManageItem/ManageItem.tsx";
import ManageUser from "@/pages/ManageUser/ManageUser.tsx";

function App() {
    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/categories" element={<ManageCategory/>}/>
                <Route path="/explore" element={<Explore/>}/>
                <Route path="/items" element={<ManageItem/>}/>
                <Route path="/users" element={<ManageUser/>}/>
            </Routes>
        </div>
    )
}

export default App
