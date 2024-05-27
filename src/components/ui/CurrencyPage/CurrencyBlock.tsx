import React, {useState} from "react";
import {AddBlock, AddEditDeleteBar, Block} from "@/components/ui/MainPage/Block";
import {CurrencyForm} from "@/components/ui/forms/CurrencyForm";
import {deleteCurrency, LSCurrency} from "@/components/localStorage/currency";
import {FormModal, YesNoModal} from "@/components/ui/MainPage/Modal";

interface CurrencyBlockProps {
    onClick?: () => void;
    currency: LSCurrency
    currencies: LSCurrency[]
    addCurrency: (currency: any) => void
}

interface CurrencyBlockAddProps {
    addCurrency: (newCurrency: any) => void;
}

export const CurrencyBlock: React.FC<CurrencyBlockProps> = ({onClick, currency, currencies, addCurrency}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isOpenDelete, setOpenDelete] = useState<boolean>(false);
    const [isOpenEdit, setOpenEdit] = useState<boolean>(false);

    const openDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setOpenDelete(true);
    }

    const closeDeleteModal = () => setOpenDelete(false);

    const openEditModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setOpenEdit(true);
    }

    const closeEditModal = () => setOpenEdit(false);

    const handleDelete = (key: number) => {
        deleteCurrency(key)
        addCurrency(undefined)

    }

    const currencySym = (amount: string) => currency.postfix ? amount + " " + currency.symbol : currency.symbol + " " + amount;

    return (
        <div>
            <Block onClick={onClick} color={currency.color}>
                <div
                    className="flex items-center justify-center h-full"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">{currency.name}</h2>
                        <p className="text-sm font-semibold">{currencySym("1")} is {currency.rate} USD</p>
                        <AddEditDeleteBar id={currency.key} onEdit={openEditModal} onDelete={openDeleteModal}
                                          isHovered={isHovered}/>
                    </div>
                </div>

            </Block>
            <YesNoModal isOpen={isOpenDelete} onClose={closeDeleteModal} onYes={() => handleDelete(currency.key)}>
                <h1>Are you sure you want to delete this currency?</h1>
                <p className="text-sm">With this, you will also delete all budgets, works on this currency!</p>
            </YesNoModal>
            <FormModal isOpen={isOpenEdit} onClose={closeEditModal}>
                <h1>Edit currency</h1>
                <CurrencyForm addCurrency={addCurrency} closeFormModal={closeEditModal} currency={currency}/>
            </FormModal>
        </div>
    );
}


export const CurrencyBlockAdd: React.FC<CurrencyBlockAddProps> = ({addCurrency}) => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    return (
        <AddBlock text="Add currency" isModalOpen={isFormOpen} openModal={openForm} closeModal={closeForm}>
            <h1>Create new currency</h1>
            <CurrencyForm addCurrency={addCurrency} closeFormModal={closeForm}/>
        </AddBlock>
    );
};