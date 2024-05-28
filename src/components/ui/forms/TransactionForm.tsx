import React from "react";
import {handleTransactionFormSubmit, LSTransaction} from "@/components/localStorage/transaction";
import {Form, FormInput, FormLabel, FormMessage, FormSelect, SubmitButton} from "@/components/ui/forms/Form";
import {getCategory} from "@/components/localStorage/category";

interface TransactionFormProps {
    addTransaction: (newTransaction: LSTransaction | undefined) => void;
    closeFormModal: () => void;
    transaction?: LSTransaction;
    budgetId: number;
}


export const TransactionForm: React.FC<TransactionFormProps> = ({addTransaction, closeFormModal, transaction, budgetId}) => {
    const [formMessage, setFormMessage] = React.useState<string>("");
    const [name, setName] = React.useState<string>(transaction ? transaction.name : "");
    const [amount, setAmount] = React.useState<string>(transaction ? `${transaction.amount}` : "");
    const [category, setCategory] = React.useState<number>(transaction ? transaction.category : -1);
    const [date, setDate] = React.useState<string>(transaction ? transaction.date : "");
    const [type, setType] = React.useState<string>(transaction ? transaction.type : "expense");

    const categories = getCategory();

    if (categories.length === 0) {
        setFormMessage("Error: No categories found!");
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit")
        const newTransaction = await handleTransactionFormSubmit(event, setFormMessage, budgetId);
        if (newTransaction == null) return;
        addTransaction(newTransaction);
        closeFormModal();
    };

    return (
        <div>
            <Form onSubmit={(transaction === undefined) ? handleSubmit : handleSubmit}>
                <FormLabel>
                    Name
                    <FormInput
                        type="text"
                        name="transactionName"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormLabel>
                <FormLabel>
                    Amount
                    <FormInput
                        type="number"
                        name="transactionAmount"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </FormLabel>
                <FormLabel>
                    Category
                    <FormSelect
                        name="transactionCategory"
                        value={category}
                        onChange={(e) => setCategory(parseInt(e.target.value))}>
                        <option value={-1} disabled>Select category</option>
                        {categories.map((category) => (
                            <option key={category.key} value={category.key}>{category.name}</option>
                        ))}
                    </FormSelect>
                </FormLabel>
                <FormLabel>
                    Date
                    <FormInput
                        type="date"
                        name="transactionDate"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </FormLabel>
                <FormLabel>
                    Type
                    <FormSelect
                        name="transactionType"
                        value={type}
                        onChange={(e) => setType(e.target.value)}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </FormSelect>
                </FormLabel>
                <FormMessage message={formMessage}/>
                <SubmitButton>Submit</SubmitButton>
            </Form>

        </div>
    );


}