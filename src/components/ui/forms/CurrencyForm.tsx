import React from "react";
import {Form, FormInput, FormLabel, FormMessage, FormSelect, SubmitButton} from "@/components/ui/forms/Form";
import {handleCurrencyFormSubmit, LSCurrency} from "@/components/localStorage/currency";

interface CurrencyFormProps {
    addCurrency: (newCurrency: LSCurrency | undefined) => void;
    closeFormModal: () => void;
    currency?: LSCurrency;
}

export const CurrencyForm: React.FC<CurrencyFormProps> = ({addCurrency, closeFormModal, currency}) => {
    const [formMessage, setFormMessage] = React.useState<string>("");
    const [name, setName] = React.useState<string>(currency ? currency.name : "");
    const [symbol, setSymbol] = React.useState<string>(currency ? currency.symbol : "");
    const [rate, setRate] = React.useState<string>(currency ? `${currency.rate}` : "");
    const [postfix, setPostfix] = React.useState<boolean>(currency ? currency.postfix : true);
    const [color, setColor] = React.useState<string>(currency ? currency.color : "#000000");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log("submit")
        event.preventDefault();
        const newCurrency = await handleCurrencyFormSubmit(event, setFormMessage);
        if (newCurrency == null) return;
        addCurrency(newCurrency);
        closeFormModal();
    };

    const editCurrency = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (currency === undefined) return;
        const newCurrency = await handleCurrencyFormSubmit(event, setFormMessage, currency.key);
        if (newCurrency == null) return;
        addCurrency(undefined);
        closeFormModal();
    }

    return (
        <div>
            <Form onSubmit={(currency === undefined) ? handleSubmit : editCurrency}>
                <FormLabel>Name
                    <FormInput
                        type="text"
                        name="currencyName"
                        placeholder="Euro, Dollar..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormLabel>
                <FormLabel>Symbol
                    <FormInput
                        type="text"
                        name="currencySymbol"
                        placeholder="$, ₿..."
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                    />
                </FormLabel>
                <FormLabel>Rate to USD
                    <FormInput
                        type="string"
                        name="currencyRate"
                        placeholder="0.25"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                    />
                </FormLabel>
                <FormLabel>Order
                    <FormSelect
                        name="currencyPostfix"
                        value={`${postfix}`}
                        onChange={(e) => setPostfix(e.target.value === 'true')}
                    >
                        <option value="true">postfix</option>
                        <option value="false">prefix</option>
                    </FormSelect>
                </FormLabel>
                <FormLabel>Color
                    <FormInput
                        type="color"
                        name="currencyColor"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </FormLabel>
                <FormMessage message={formMessage}/>
                <SubmitButton>Submit</SubmitButton>
            </Form>
        </div>
    );
};