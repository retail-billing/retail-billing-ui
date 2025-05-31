import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {CategoryProvider} from "@/context/CategoryContext.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <CategoryProvider>
            <App/>
        </CategoryProvider>
    </BrowserRouter>
)
