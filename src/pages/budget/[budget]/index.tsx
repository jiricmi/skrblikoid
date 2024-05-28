'use client';
import {NextRouter, useRouter} from "next/router";
import {getBudgetByKey} from "@/components/localStorage/budget";
import {Page} from "@/components/ui/MainPage/Page";
import {Table, TableTd, TableTr} from "@/components/ui/MainPage/Table";
import {AddTransaction, CategoryBadge} from "@/components/ui/TransactionPage/TransactionPage";
import React, {useEffect} from "react";
import {getTransactionByBudget, LSTransaction} from "@/components/localStorage/transaction";
import {getCurrencyByKey} from "@/components/localStorage/currency";
import {getCategoryByKey} from "@/components/localStorage/category";


const Budget = () => {
    const router: NextRouter & {query: {budget ?: string}} = useRouter();

    const budgetId: number = parseInt(router.query.budget as string);
    const [transactions, setTransactions] = React.useState<LSTransaction[]>([]);
    let keys = ["Date", "Name", "Category", "Amount", "Action"];


    useEffect(() => {
        return setTransactions(getTransactionByBudget(budgetId));
    }, [router.query.budget]);

    const addTransaction = (newTransaction: LSTransaction | undefined) => {
        if (newTransaction === undefined) {
            setTransactions(getTransactionByBudget(budgetId));
            return;
        }
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    }

    const transactionAmount = (amount: number): string => {
        const budget = getBudgetByKey(budgetId);
        if (budget === null) return "undef";
        const currency = getCurrencyByKey(budget.currency);
        if (currency === null) return "undef";
        if (currency.postfix) {
            return `${amount} ${currency.symbol}`;
        } else {
            return `${currency.symbol} ${amount}`;
        }

    }

    return (
        <Page title={`${getBudgetByKey(parseInt(router.query.budget as string))?.name}`}>
            <AddTransaction budget={budgetId}/>
            <Table keys={keys}>
                {transactions.map((transaction) => (
                    <TableTr key={transaction.key}>
                        <TableTd>{transaction.date}</TableTd>
                        <TableTd>{transaction.name}</TableTd>
                        <TableTd><CategoryBadge category={getCategoryByKey(transaction.category)}/></TableTd>
                        <TableTd>{transactionAmount(transaction.amount)}</TableTd>
                        <TableTd>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl">
                                Delete
                            </button>
                        </TableTd>
                    </TableTr>
                ))}
            </Table>
        </Page>
    );
}

export default Budget;