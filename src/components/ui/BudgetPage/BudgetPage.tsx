import React, {useEffect} from 'react';
import {BudgetBlock, BudgetBlockAdd} from '@/components/ui/BudgetPage/BudgetBlock';
import {getBudgets, LSBudget} from '@/components/localStorage/budget';
import {BlockPage} from '@/components/ui/MainPage/BlockPage';

export const BudgetPage = () => {
    const [budgets, setBudgets] = React.useState<LSBudget[]>([]);

    useEffect(() => {
        setBudgets(getBudgets());
    }, []);

    const addBudget = (newBudget: LSBudget) => {
        setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
    };

    return (
        <BlockPage>
            {budgets.map((budget) => (
                <BudgetBlock key={budget.key} budget={budget}/>
            ))}
            <BudgetBlockAdd addBudget={addBudget}/>
        </BlockPage>
    );
}