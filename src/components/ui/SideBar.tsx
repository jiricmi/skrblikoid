import React, {useState} from "react";

interface SideBarProps {
    openMenu: boolean;
    setOpenMenu: (value: boolean) => void;
}

interface DividerProps {
    color: string;
}

interface NavItemBorderProps {
    onClick?: () => void;
    children: React.ReactNode;
}

interface NavItemLogoProps {
    src: string;
    alt: string;
}

interface NavH1Props {
    children: React.ReactNode;
    openMenu: boolean;
}

interface UnwrapperSideBarProps {
    openMenu: boolean;
    setOpenMenu: (value: boolean) => void;
}

interface SideBarPanelProps {
    openMenu: boolean;
    children: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({color}) => {
    return (
        <div className={`${color} h-0.5 w-full lg:my-3 my-5`}/>
    );
}

const NavItemBorder: React.FC<NavItemBorderProps> = ({onClick, children}) => {
    return (
        <div onClick={onClick}
             className="flex items-center p-2 mt-2 bg-blue-500 hover:bg-blue-600 transition-colors duration-100 rounded-lg">
            {children}
        </div>

    );
}

const NavItemLogo: React.FC<NavItemLogoProps> = ({src, alt}) => {
    return (
        <img src={src} alt={alt}
             className="w-10 h-10 rounded-2xl bg-white border-2 border-gray-200 p-1 mr-4"/>
    );
}

const NavH1: React.FC<NavH1Props> = ({children, openMenu}) => {
    return (
        <h1 className={`text-2xl font-semibold text-white duration-100 ${!openMenu && "scale-0"}`}>{children}</h1>
    );
}

const NavH2: React.FC<NavH1Props> = ({children, openMenu}) => {
    return (
        <h3 className={`text-lg font-semibold text-white duration-100 ${!openMenu && "scale-0"}`}>{children}</h3>
    );
}

const UnwrapperSideBar: React.FC<UnwrapperSideBarProps> = ({openMenu, setOpenMenu}) => {
    return (
        <img src={`/control.png`} alt={`next`}
             className={`absolute cursor-pointer rounded-full lg:-right-4 lg:w-7 w-10 border-2 border-blue-400 bg-white
                     ${openMenu ? "transform rotate-180 -right-0" : "-right-4"}`}
             onClick={() => setOpenMenu(!openMenu)}/>
    )
}

const SideBarPanel: React.FC<SideBarPanelProps> = ({openMenu, children}) => {
    return (
        <div
            className={`duration-300 h-screen p-5 pt-2 bg-blue-400 rounded-b-3xl ${openMenu ? 'lg:w-72 w-full z-50 absolute lg:relative' : 'lg:w-24 relative hidden duration-300 lg:block'}`}>
            {children}
        </div>
    )
}

export const SideBar: React.FC<SideBarProps> = ({openMenu, setOpenMenu}) => {
    return (
        <div>
            <SideBarPanel openMenu={openMenu}>
                <NavItemBorder>
                    <NavItemLogo src="/logo.svg" alt="logo"/>
                    <NavH1 openMenu={openMenu}>Skrblikoid</NavH1>
                </NavItemBorder>
                <div className="flex pt-1.5">
                    <Divider color={"bg-gray-100"}/>
                    <UnwrapperSideBar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
                </div>
                <NavItemBorder>
                    <NavItemLogo src="/logo.svg" alt="logo"/>
                    <NavH2 openMenu={openMenu}>Skrblikoid</NavH2>
                </NavItemBorder>
            </SideBarPanel>
        </div>
    )
}