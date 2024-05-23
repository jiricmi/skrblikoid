import MainPage from "@/components/ui/MainPage/MainPage";
import {useState} from "react";
import SideBar from "@/components/ui/SideBar";

const Index = () => {
    return (
        <div className="flex">
            <SideBar/>
            <MainPage/>
        </div>
    )
}

export default Index