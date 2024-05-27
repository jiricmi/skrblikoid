import React from 'react';
import {handleBudgetFormSubmit, LSBudget} from "@/components/localStorage/budget";
import {Form, FormInput, FormLabel, FormMessage, FormSelect, SubmitButton} from "@/components/ui/forms/Form";
import {getAllCurrenciesName} from "@/components/localStorage/currency";

interface BudgetFormProps {
    addBudget: (budget: LSBudget) => void;
    closeFormModal: () => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({addBudget, closeFormModal}) => {
    const [formMessage, setFormMessage] = React.useState<string>("");
    const currencies = getAllCurrenciesName();
    if (currencies.length === 0) currencies.push("None");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const newBudget = await handleBudgetFormSubmit(event, setFormMessage);
        if (newBudget == null) return;
        addBudget(newBudget);
        closeFormModal();
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormLabel>Name
                    <FormInput type="text" name="budgetName" placeholder="My awesome budget"/>
                </FormLabel>
                <FormLabel>Currency
                    <FormSelect name="budgetCurrency">
                        {
                            currencies.map((currency, index) => (
                                <option key={index} value={index}>{currency}</option>
                            ))
                        }
                    </FormSelect>
                </FormLabel>
                <FormLabel>Color
                    <FormInput type="color" name="budgetColor"/>
                </FormLabel>
                <FormMessage message={formMessage}/>
                <SubmitButton>Submit</SubmitButton>
            </Form>
        </div>
    );
}

export default BudgetForm;