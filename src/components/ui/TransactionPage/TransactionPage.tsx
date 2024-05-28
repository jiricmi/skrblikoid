import React, {useEffect} from "react";
import {FormModal} from "@/components/ui/MainPage/Modal";
import {addTestTransaction, getTransactionByBudget, LSTransaction} from "@/components/localStorage/transaction";
import {LSCategory} from "@/components/localStorage/category";


const getContrastColor = (hexColor: string): boolean => {
    hexColor = hexColor.replace('#', '');

    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255; // AI helped me to find this formula
    return luminance > 0.5;
};



export const AddTransaction: React.FC<{ budget: number }> = ({budget}) => {
    const [isOpenForm, setIsOpenForm] = React.useState(false);

    const openForm = () => setIsOpenForm(true);
    const closeForm = () => setIsOpenForm(false);
    const transaction: LSTransaction = {
        key: 0,
        name: "Test",
        date: "2021-01-01",
        category: 0,
        amount: 100,
        budget: budget
    }

    return (
        <div>
            <div className="flex lg:justify-normal justify-center lg:ml-5 mb-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-2xl"
                        onClick={openForm}>
                    Add Transaction
                </button>
            </div>
            <FormModal isOpen={isOpenForm} onClose={closeForm}>
                <button onClick={() => addTestTransaction(transaction)}>Add</button>
            </FormModal>
        </div>
    )
}

export const CategoryBadge: React.FC<{ category?: LSCategory }> = ({category}) => {
    const category_color = category === undefined ? "#ffffff" : category.color;


    return (
        <div className={`rounded-full p-2 ${getContrastColor(category_color) ? "text-black" : "text-white"}`} style={{backgroundColor: category_color}}>
            {category?.name}
        </div>
    )
}