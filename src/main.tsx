import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {CategoryProvider} from "@/context/CategoryContext.tsx";
import {UserProvider} from "@/context/UserContext.tsx";
import {ItemProvider} from "@/context/ItemContext.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <UserProvider>
            <CategoryProvider>
                <ItemProvider>
                    <App/>
                </ItemProvider>
            </CategoryProvider>
        </UserProvider>
    </BrowserRouter>
)
