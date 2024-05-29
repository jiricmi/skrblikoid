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

    if (!getBudgetByKey(budgetId)) {
        return (
            <Page title="Budget not found">
                <div className="lg:w-full w-screen mx-auto lg:px-10 justify-center">
                    <h1 className="text-4xl">Budget not found</h1>
                </div>
            </Page>
        );
    }

    return (
        <Page title={`${getBudgetByKey(parseInt(router.query.budget as string))?.name}`}>
            <TransactionGraphs budgetId={budgetId} transactions={transactions}/>
            <TransactionTable budgetId={budgetId} transactions={transactions} setTransactions={setTransactions}/>
        </Page>
    );
}

export default Budget;