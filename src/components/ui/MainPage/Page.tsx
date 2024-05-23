import {SideBar} from "@/components/ui/SideBar";
import React, {useState} from "react";
import {TopBar} from "@/components/ui/MainPage/TopBar";

interface PageProps {
    title: string;
    children: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({title, children}) => {
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <div className="flex">
            <SideBar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
            <div className="flex flex-col w-full">
                <TopBar openMenu={openMenu} setOpenMenu={setOpenMenu} text={title}/>
                {children}
            </div>
        </div>
    );
}
