import {useState} from "react";


const SideBar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <div className={`${openMenu ? "lg:w-72 w-full z-50 absolute lg:relative" : "w-20 relative"} duration-100 h-screen bg-blue-400 p-5 pt-8`}>
            <img src={`/control.png`} alt={`next`}
                 className={`absolute cursor-pointer rounded-full lg:-right-4 top-12 w-7 border-2 border-blue-400 bg-white
                     ${openMenu ? "transform rotate-180 -right-0" : "-right-4"}`}
                 onClick={() => setOpenMenu(!openMenu)}/>
            <div className="flex gap-x-4 items-center">
                <img src="/logo.svg" alt={`logo`} className={`w-12 h-12 rounded-full bg-white p-1`}/>
                <h1 className={`text-2xl font-semibold text-white origin-left
                ${!openMenu && "scale-0"}`}>Skrblikoid</h1>
            </div>
        </div>
    )
}

export default SideBar