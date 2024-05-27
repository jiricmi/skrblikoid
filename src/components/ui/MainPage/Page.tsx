import {SideBar} from "@/components/ui/MainPage/SideBar";
import React, {useEffect, useState} from "react";
import {TopBar} from "@/components/ui/MainPage/TopBar";
import {
  useWindowWidth,
} from '@react-hook/window-size/throttled'

interface PageProps {
    title: string;
    children?: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({title, children}) => {
    // if windows size is less than 1024px, openMenu is false
    const init_state = useWindowWidth() > 1024 ? localStorage.getItem("openMenu") === "true" : false;

    const [openMenu, setOpenMenu] = useState(init_state);
    useEffect(() => {
        document.title = title;
    } , [title]);

    useEffect(() => {
        localStorage.setItem("openMenu", openMenu.toString());
    }, [openMenu]);
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
