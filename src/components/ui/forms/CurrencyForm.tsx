import React from "react";
import {Form, FormInput, FormLabel, FormMessage, FormSelect, SubmitButton} from "@/components/ui/forms/Form";
import {handleCurrencyFormSubmit} from "@/components/localStorage/currency";

interface CurrencyFormProps {
    addCurrency: (newCurrency: any) => void;
    closeFormModal: () => void;
}

export const CurrencyForm: React.FC<CurrencyFormProps> = ({addCurrency, closeFormModal}) => {
    const [formMessage, setFormMessage] = React.useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const newCurrency = await handleCurrencyFormSubmit(event, setFormMessage);
        if (newCurrency == null) return;
        addCurrency(newCurrency);
        closeFormModal();
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormLabel>Name
                    <FormInput type="text" name="currencyName" placeholder="Euro, Dollar..."/>
                </FormLabel>
                <FormLabel>Symbol
                    <FormInput type="text" name="currencySymbol" placeholder="$, ₿..."/>
                </FormLabel>
                <FormLabel>Rate to USD
                    <FormInput type="string" name="currencyRate" placeholder="0.25"/>
                </FormLabel>
                <FormLabel>Order
                    <FormSelect name="currencyPostfix">
                        <option value="true">postfix</option>
                        <option value="false">prefix</option>
                    </FormSelect>
                </FormLabel>
                <FormLabel>Color
                    <FormInput type="color" name="currencyColor"/>
                </FormLabel>
                <FormMessage message={formMessage}/>
                <SubmitButton>Submit</SubmitButton>
            </Form>
        </div>
    );
}