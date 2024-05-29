'use client';
import {NextRouter, useRouter} from "next/router";
import {getBudgetByKey} from "@/components/localStorage/budget";
import {Page} from "@/components/ui/MainPage/Page";
import {
    TransactionGraphs, TransactionTable
} from "@/components/ui/TransactionPage/TransactionPage";
import React from "react";
import {LSTransaction} from "@/components/localStorage/transaction";


const Budget = () => {
    const router: NextRouter & { query: { budget?: string } } = useRouter()
    const [transactions, setTransactions] = React.useState<LSTransaction[]>([]);

    const budgetId: number = parseInt(router.query.budget as string);
    const data = [
        {label: 'Jan', value: 30},
        {label: 'Feb', value: 20},
        {label: 'Mar', value: 50},
        {label: 'Apr', value: 40},
        {label: 'May', value: 70},
    ];

    return (
        <Page title={`${getBudgetByKey(parseInt(router.query.budget as string))?.name}`}>
            <TransactionGraphs budgetId={budgetId} transactions={transactions}/>
            <TransactionTable budgetId={budgetId} transactions={transactions} setTransactions={setTransactions}/>
        </Page>
    );
}

export default Budget;