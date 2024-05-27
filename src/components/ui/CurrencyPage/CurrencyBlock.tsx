import React, {useState} from "react";
import {AddButtonModal, AddEditDeleteBar, Block} from "@/components/ui/MainPage/Block";
import {CurrencyForm} from "@/components/ui/forms/CurrencyForm";
import {LSCurrency} from "@/components/localStorage/currency";

interface CurrencyBlockProps {
    onClick?: () => void;
    currency: LSCurrency
}

interface CurrencyBlockAddProps {
    addCurrency: (newCurrency: any) => void;
}

export const CurrencyBlock: React.FC<CurrencyBlockProps> = ({ onClick, currency}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, key: number) => {
        e.stopPropagation()
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, key: number) => {
        e.stopPropagation();
        console.log("delete " + "currency_" + key)

    }

    const currencySym = (amount: string) => currency.postfix ? amount + " " + currency.symbol : currency.symbol + " " + amount;

    return (
        <Block onClick={onClick} color={currency.color}>
            <div
                className="flex items-center justify-center h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="text-center">
                    <h2 className="text-xl font-semibold">{currency.name}</h2>
                    <p className="text-sm font-semibold">{currencySym("1")} is {currency.rate} USD</p>
                    <AddEditDeleteBar id={currency.key} onEdit={handleEdit} onDelete={handleDelete} isHovered={isHovered}/>
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
            <CurrencyForm addCurrency={addCurrency} closeFormModal={closeForm}/>
        </AddButtonModal>
    );
};