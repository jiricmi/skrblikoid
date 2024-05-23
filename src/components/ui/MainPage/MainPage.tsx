import React from 'react';
import {BudgetBlock, BudgetBlockAdd} from '@/components/ui/MainPage/BudgetBlock';
import Title from '@/components/ui/upper_bar';
import {Divider} from "@/components/ui/SideBar";

const MainPage = () => {
    const blocks = [
        {name: "Název 1", amount: "$100"},
        {name: "Název 2", amount: "$200"},
    ];
    return (
        <div className="flex flex-col p-7 text-2xl font-semibold">
            <div className="flex flex-wrap">
                {blocks.map((block, index) => (
                    <BudgetBlock key={index} name={block.name} amount={block.amount}/>
                ))}
                <BudgetBlockAdd />
            </div>
        </div>
    );
}

export default MainPage;