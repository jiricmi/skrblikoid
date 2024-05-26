import React, {useEffect} from 'react';
import {BudgetBlock, BudgetBlockAdd} from '@/components/ui/MainPage/BudgetBlock';
import {getBudgets, LSBudget} from '@/components/budgets/budget';

export const BudgetPage = () => {
    const [budgets, setBudgets] = React.useState<LSBudget[]>([]);

    useEffect(() => {
        setBudgets(getBudgets());
    }, []);

    const addBudget = (newBudget: LSBudget) => {
        setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
    };

    return (
        <div className="flex flex-col p-7 text-2xl font-semibold">
            <div className="lg:flex lg:flex-wrap grid grid-cols-1">
                {budgets.map((budget) => (
                    <BudgetBlock key={budget.name} name={budget.name} currency={budget.currency} color={budget.color} />
                ))}
                <BudgetBlockAdd addBudget={addBudget}/>
            </div>
        </div>
    );
}