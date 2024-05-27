import {Divider} from "@/components/ui/MainPage/SideBar";
import React from "react";

interface TopBarProps {
    openMenu: boolean;
    setOpenMenu: (value: boolean) => void;
    text: string;
}

interface TitleProps {
    text: string;
}

const Title: React.FC<TitleProps> = ({text}) => {
    return (
        <h1 className=" text-5xl lg:text-5xl pb-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-800">
            {text}
        </h1>
    );
};

interface BurgerMenuProps {
    openMenu: boolean;
    setOpenMenu: (value: boolean) => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({openMenu, setOpenMenu}) => {
    return (
        <img src={`/control.png`} alt={`next`}
             className={`lg:hidden visible absolute cursor-pointer rounded-full left-2 w-10 border-2 border-blue-400 bg-white
                     ${openMenu ? "transform rotate-180 -right-0" : "-right-4"}`}
             onClick={() => setOpenMenu(!openMenu)}/>
    );
};
export const TopBar: React.FC<TopBarProps> = ({openMenu, setOpenMenu, text}) => {
    return (
        <div className="m-[18px]">
            <Title text={text}/>
            <div className="flex">
                <Divider color="bg-blue-400"/>
                <BurgerMenu openMenu={openMenu} setOpenMenu={setOpenMenu}/>
            </div>

        </div>
    )
}
