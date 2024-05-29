import React, {useEffect, useState} from "react";
import {getCurrency, LSCurrency} from "@/components/localStorage/currency";
import {BlockPage} from "@/components/ui/MainPage/BlockPage";
import {CurrencyBlock, CurrencyBlockAdd} from "@/components/ui/CurrencyPage/CurrencyBlock";

export const CurrencyPage = () => {
    const [currencies, setCurrencies] = React.useState<LSCurrency[]>([]);

    useEffect(() => {
        setCurrencies(getCurrency());
    }, []);


    const addCurrency = (newCurrency: LSCurrency | undefined) => {
        if (newCurrency === undefined) {
            setCurrencies(getCurrency());
            return;
        }
        setCurrencies((prevCurrencies) => [...prevCurrencies, newCurrency]);
    };

    return (
        <BlockPage>
            {/*generovani dynamicky bloky*/}
            {currencies && currencies.map((currency) => (
                <CurrencyBlock key={currency.key} currency={currency} currencies={currencies}
                               addCurrency={addCurrency}/>
            ))}
            <CurrencyBlockAdd addCurrency={addCurrency}/>
        </BlockPage>
    );
}