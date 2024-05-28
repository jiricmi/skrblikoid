import React from 'react';
import {LSTransaction, transactionAmountString} from "@/components/localStorage/transaction";
import {Modal} from "@/components/ui/MainPage/Modal";
import {getCategoryByKey} from "@/components/localStorage/category";
import {TransactionEditTools} from "@/components/ui/TransactionPage/TransactionPage";
import {useWindowWidth} from "@react-hook/window-size/throttled";

export const TableThead: React.FC<{ keys: string[], sm_hide?: number[] }> = ({keys, sm_hide}) => {
    const isHide = (index: number) => {
        if (sm_hide === undefined) return false;
        return sm_hide.includes(index);
    }
    return (
        <thead>
        <tr className="text-center">
            {keys.map((key, index) => {
                let className = "py-2 px-4 bg-gray-200";
                if (index === 0) {
                    className += " rounded-tl-2xl";
                }
                if (index === keys.length - 1) {
                    className += " rounded-tr-2xl";
                }

                if (isHide(index)) {
                    className += " hidden lg:table-cell";
                } else {
                    className += " visible";
                }

                return (
                    <th key={index} className={className}>
                        {key}
                    </th>
                );
            })}
        </tr>
        </thead>
    );
};

export const TableFooter: React.FC = () => {
    return (
        <tfoot className=" bg-gray-200 w-full rounded-b-2xl">
        <tr className=" bg-gray-200 w-full rounded-b-2xl">
            <td colSpan={5} className="text-center py-2 px-4 rounded-b-2xl">
            </td>
        </tr>
        </tfoot>
    );

}

export const TableTr: React.FC<{
    props?: React.HTMLProps<HTMLTableRowElement>;
    children?: React.ReactNode,
    color_green?: boolean
}> = ({props, children, color_green}) => {
    if (color_green === undefined) color_green = false;
    return (
        <tr key={props?.key} className={`text-center ${color_green ? "bg-green-200" : "bg-red-200"}`}>
            {children}
        </tr>
    );
};

export const TableTd: React.FC<{
    children?: React.ReactNode,
    sm_hidden?: boolean,
    transaction?: LSTransaction
    addTransaction?: (newTransaction: LSTransaction | undefined) => void
}> = ({children, sm_hidden, transaction, addTransaction}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const init_state = useWindowWidth() > 1024;

    const openModal = () => {
        if (transaction !== undefined && !init_state) {
            setIsOpen(true);
        }
    }
    // event close modal
    const closeModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsOpen(false);
    }

    const amount: number = transaction ? transaction.amount : 0;
    const name: string = transaction ? transaction.name : "";
    const date: string = transaction ? transaction.date : "";
    const type: string = transaction ? transaction.type : "";
    const budget: number = transaction ? transaction.budget : 0;
    const amount_str: string = transactionAmountString(amount, type, budget);
    const category: number = transaction ? transaction.category : 0;
    const category_name: string = getCategoryByKey(category)?.name || "undef";

    // transaction is not undefined
    if (addTransaction === undefined) {
        addTransaction = (newTransaction: LSTransaction | undefined) => {
            if (newTransaction === undefined) {
                return;
            }
        }
    }

    const testTrans: LSTransaction = {
        key: 0,
        name: "test",
        amount: 0,
        date: "2021-01-01",
        type: "income",
        budget: 0,
        category: 0
    }

    return (
        <td className={`py-2 px-4 border-b border-gray-300 ${sm_hidden ? "hidden lg:table-cell" : "visible"}`}
            onClick={openModal}>
            {children}
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="p-4 gap-1">
                    <h1 className="text-3xl font-semibold pb-2">{name}</h1>
                    <p className="text-lg">created: {date}</p>
                    <p className="text-lg">Amount: {amount_str}</p>
                    <p className="text-lg">Category: {category_name}</p>
                </div>
                <TransactionEditTools transaction={transaction ? transaction : testTrans}
                                      addTransaction={addTransaction}/>
                <button className="bg-red-400 rounded-lg py-2 px-3 hover:bg-red-500 duration-300 text-white w-full mt-2"
                        onClick={closeModal}>Close
                </button>
            </Modal>
        </td>
    );
}

export const Table: React.FC<{ keys: string[], children?: React.ReactNode, sm_hide?: number[] }> = ({
                                                                                                        keys,
                                                                                                        children,
                                                                                                        sm_hide
                                                                                                    }) => {
    return (
        <div className="lg:flex justify-center">
            <table className="w-full bg-white shadow-md lg:mx-4 border-gray-400 rounded-2xl">
                <TableThead keys={keys} sm_hide={sm_hide}/>
                <tbody>
                {children}
                </tbody>
                <TableFooter/>
            </table>
        </div>
    );
};