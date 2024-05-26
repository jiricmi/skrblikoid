import React, {useState} from "react";
import {AddBlock, Block} from "@/components/ui/MainPage/Block";
import {CurrencyForm} from "@/components/ui/forms/CurrencyForm";

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
        <AddBlock text="Add currency" openModal={openForm} closeModal={closeForm} isModalOpen={isFormOpen}>
            <h1>Create new currency</h1>
            <CurrencyForm closeFormModal={closeForm} addCurrency={addCurrency}/>
            <button
                onClick={closeForm}
                className="mt-4 bg-red-500 text-white font-bold py-1 px-4 rounded-lg w-full hover:bg-red-600 transition-colors duration-200">
                Close
            </button>
        </AddBlock>
    )
}