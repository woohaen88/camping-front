import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Root(){
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}