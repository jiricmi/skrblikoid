import React, {useEffect} from 'react';
import {BudgetBlock, BudgetBlockAdd} from '@/components/ui/BudgetPage/BudgetBlock';
import {getBudgets, LSBudget} from '@/components/localStorage/budget';
import {BlockPage} from '@/components/ui/MainPage/BlockPage';
import {InfoBlock} from "@/components/ui/MainPage/Block";

export const BudgetPage = () => {
    const [budgets, setBudgets] = React.useState<LSBudget[]>([]);

    useEffect(() => {
        setBudgets(getBudgets());
    }, []);

    // Tato funkce pridava novy rozpocet do seznamu rozpoctu a zpusobi prekresleni stranky
    const addBudget = (newBudget: LSBudget) => {
        setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
    };

    return (
        <div className={"2xl:flex"}>
            <BlockPage className={"w-full"}>
                {/*Vygenerovani budgetu z hooku*/}
                {budgets.map((budget) => (
                    <BudgetBlock key={budget.key} budget={budget}/>
                ))}
                <BudgetBlockAdd addBudget={addBudget}/>
            </BlockPage>
            <BlockPage className={"2xl:w-5/6"}>
                <InfoBlock color={"bg-gray-300 border-2 p-5 border-gray-400"}/>
            </BlockPage>
        </div>
    );
}