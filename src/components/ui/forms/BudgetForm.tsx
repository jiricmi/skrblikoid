import React from 'react';

const BudgetForm = () => {
    return (
        <div>
            <form className="flex flex-col">
                <label>
                    <span className="text-lg font-semibold">Name of Budget</span>
                    <input type="text" className="border-2 border-gray-500 rounded-lg p-1 m-5"/>
                </label>
                <label>
                    <span className="text-lg font-semibold">Amount</span>
                    <input type="text" className="border-2 border-gray-500 rounded-lg p-1 m-5"/>
                </label>
                <button className="bg-blue-500 text-white rounded-lg p-1">Submit</button>
            </form>
        </div>
    );
}

export default BudgetForm;1