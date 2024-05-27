import React, {useEffect, useState} from "react";
import {getCurrency, LSCurrency} from "@/components/localStorage/currency";
import {BlockPage} from "@/components/ui/MainPage/BlockPage";
import {CurrencyBlock, CurrencyBlockAdd} from "@/components/ui/CurrencyPage/CurrencyBlock";

export const CurrencyPage = () => {
    const [currencies, setCurrencies] = React.useState<LSCurrency[]>([]);


    useEffect(() => {
        setCurrencies(getCurrency());
    }, []);


    const addCurrency = (newCurrency: LSCurrency) => {
        setCurrencies((prevCurrencies) => [...prevCurrencies, newCurrency]);
    };

    return (
        <BlockPage>
            {currencies.map((currency) => (
                <CurrencyBlock key={currency.key} currency={currency}/>
            ))}
            <CurrencyBlockAdd addCurrency={addCurrency}/>

        </BlockPage>
    );
}