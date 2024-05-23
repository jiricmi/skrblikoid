import React from 'react';
import {handleBudgetFormSubmit} from "@/components/budgets/budget";

const BudgetForm = () => {
    return (
        <div>
            <form className="flex flex-col" onSubmit={handleBudgetFormSubmit}>
                <label className="text-lg font-semibold">Name
                    <input type="text" name="budgetName" className="border-2 border-gray-500 rounded-lg p-1 m-5"
                           placeholder="My awsome budget"/>
                </label>
                <label className="text-lg font-semibold">Currency
                    <select name="budgetCurrency" className="border-2 border-gray-500 rounded-lg p-1 m-5">
                        <option value="usd">USD</option>
                        <option value="czk">CZK</option>
                        <option value="eur">EUR</option>
                    </select>
                </label>
                <label className="text-lg font-semibold">Color
                    <input type="color" name="budgetColor" className="border-2 border-gray-500 h-10 w-20 rounded-lg p-1 m-5"/>
                </label>
                <button className="bg-blue-500 text-white rounded-lg p-1">Submit</button>
            </form>
        </div>
    );
}

export default BudgetForm;