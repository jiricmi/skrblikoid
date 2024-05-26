import React, {useState} from "react";
import {AddBlock, AddButtonModal, Block} from "@/components/ui/MainPage/Block";
import {CurrencyForm} from "@/components/ui/forms/CurrencyForm";
import {LSCurrency} from "@/components/localStorage/currency";

interface CurrencyBlockProps {
    onClick?: () => void;
    name: string;
    symbol: string;
    rate: number;
    color: string;
}

interface CurrencyBlockAddProps {
    addCurrency: (newCurrency: any) => void;
}

export const CurrencyBlock: React.FC<CurrencyBlockProps> = ({onClick, name, symbol, rate, color}) => {
    return (
        <Block onClick={onClick} color={color}>
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <h3 className="text-md font-semibold">{symbol}</h3>
                    <h3 className="text-md font-semibold">{rate}</h3>
                </div>
            </div>
        </Block>
    );
}


export const CurrencyBlockAdd: React.FC<CurrencyBlockAddProps> = ({addCurrency}) => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    return (
        <AddButtonModal text="Add currency" isFormOpen={isFormOpen} openForm={openForm} closeForm={closeForm}>
            <h1>Create new currency</h1>
            <CurrencyForm addCurrency={addCurrency} closeFormModal={closeForm} />
        </AddButtonModal>
    );
};