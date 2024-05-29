import React from "react";
import {getTransactionsByBudget, LSTransaction} from "@/components/localStorage/transaction";
import {getCurrencyByKey} from "@/components/localStorage/currency";
import {getBudgetByKey} from "@/components/localStorage/budget";


interface BarChartProps {
    data: { label: string; profit: number; loss: number }[];
    budgetId: number;

}

interface BarPrepareProps {
    sizeMargin: number;
    xOffSet: number;
    maxValue: number;
    maxY: number;
    budgetId: number;
}

// zde se pripravi data z budgetu a transakci pro graf
export const Graph: React.FC<{ budgetId: number }> = ({budgetId}) => {
    const transactions: LSTransaction[] = getTransactionsByBudget(budgetId);
    const budgetName = getBudgetByKey(budgetId)?.name || '';

    const days: string[] = []; // vygeneruju dny pro poslednich 7 dni
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toISOString().split('T')[0]);
    }

    const profit: number[] = [];
    const loss: number[] = [];

    for (let day of days) { // pro kazdy den zjistim sumu zisku a ztraty
        const transactionsOfDay = transactions.filter((transaction) => transaction.date === day);
        let profitSum = 0;
        let lossSum = 0;
        for (let transaction of transactionsOfDay) {
            if (transaction.type === 'income') {
                profitSum += transaction.amount;
            } else {
                lossSum += transaction.amount;
            }
        }
        profit.push(profitSum);
        loss.push(lossSum);
    }
    const data_profit = profit.map((value, index) => ({label: days[index], profit: value, loss: loss[index]}));
    return (
        <div className={"mb-20 lg:border-gray-200 lg:bg-gray-200 lg:rounded-2xl lg:border-2"}>
            <h1 id={`${budgetId}`} className="text-5xl mx-auto  text-center font-bold mb-4 mt-2">{budgetName}</h1>
            <div className="lg:w-full w-screen mx-auto lg:px-10 justify-center gap-5 lg:flex">
                {/*tyto sumy predam do barchartu*/}
                <BarChart data={data_profit} budgetId={budgetId}/>
            </div>
        </div>
    );


};

// zde vygeneruji podpurne prvky pro graf jako napriklad stupnici ktera se vytvari dynamicky podle nejvetsi hodnoty
// a podle toho se zobrazuje i stupnice
export const ChartPrepare: React.FC<BarPrepareProps> = ({sizeMargin, xOffSet, maxValue, maxY, budgetId}) => {
    const step = Math.ceil(maxValue / 5);
    const diff = maxY / 5;
    const currency = getCurrencyByKey(getBudgetByKey(budgetId)?.currency || 0);
    const currencyName = currency?.name || '';

    const shortName = currencyName.length > 8 ? currencyName.slice(0, 5) + '...' : currencyName;

    const budgetColor = getBudgetByKey(budgetId)?.color || '#000000';
    return (
        <g>
            {/*generovani platna*/}
            <rect x="0" y="0" width="100" height="60" fill={"#fff7f7"} stroke={budgetColor} rx="1" ry="1"/>

            {/*generovani osy x*/}
            <line x1={xOffSet - 1} y1={50} x2={100 - 4 * sizeMargin} y2={50} stroke={"#dddddd"} strokeWidth={0.5}/>
            <line x1={xOffSet - 1} y1={3} x2={xOffSet - 1} y2={50} stroke={"#dddddd"} strokeWidth={0.5}/>
            {
                // generovani stupnice
                Array.from({length: 6}, (_, index) => (
                    <g key={index}>
                        <line x1={xOffSet - 1} y1={50 - index * diff} x2={100 - 4 * sizeMargin}
                              y2={50 - index * diff} stroke={"#dddddd"} strokeWidth={0.5}/>
                        <text x={xOffSet - 2} y={50 - index * diff + 2} fontSize="2" textAnchor="end" fill="black">
                            {index * step}
                        </text>
                    </g>
                ))
            }

            <text x={xOffSet - 2} y={55} fontSize="2" textAnchor="end" fill="black">
                {`${shortName}/day`}
            </text>
        </g>
    )
}

// zde se vygeneruje samotny graf
export const BarChart: React.FC<BarChartProps> = ({data, budgetId}) => {
    // nalezeni nejvetsi hodnoty pro normalizaci ostatnich hodnot
    const maxProfit = Math.max(...data.map(item => item.profit));
    const maxLoss = Math.max(...data.map(item => item.loss));
    const maxValue = Math.max(maxProfit, maxLoss);
    if (maxValue === 0) { // pokud budget nema transakce tak vygeneruje prazdny graf
        return (
            <svg viewBox="0 0 100 60" className="lg:w-1/2 lg:mx-auto h-auto my-5 mx-5">
                <ChartPrepare sizeMargin={1} xOffSet={15} maxValue={1} maxY={45} budgetId={budgetId}/>
            </svg>
        );
    }

    // konstanty
    const sizeMargin: number = 1;
    const xOffSet: number = 15;
    const widthBarMap = 100 - xOffSet;
    const sizeBlock: number = ((widthBarMap - 3 * sizeMargin) - (data.length * sizeMargin)) / data.length;
    const maxY = 45;


    return (
        <svg viewBox="0 0 100 60" className="lg:w-1/2 lg:mx-auto h-auto my-5 mx-5">
            <ChartPrepare sizeMargin={sizeMargin} xOffSet={xOffSet} maxValue={maxValue} maxY={maxY}
                          budgetId={budgetId}/>
            {/*vygenerovani sloupecku*/}
            {data.slice().reverse().map((item, index) => (
                <g key={`g${index}`}>
                    {/*profit*/}
                    <rect
                        key={index}
                        x={index * (sizeBlock + sizeMargin) + xOffSet}
                        y={50 - (item.profit / maxValue) * maxY}
                        width={sizeBlock / 2}
                        height={(item.profit / maxValue) * maxY}
                        className={"fill-current text-green-500"}
                    />
                    {/*vygenerovani expanse sloupecku*/}
                    <rect
                        key={"e" + index}
                        x={index * (sizeBlock + sizeMargin) + sizeBlock / 2 + 0.1 + xOffSet}
                        y={50 - (item.loss / maxValue) * maxY}
                        width={sizeBlock / 2}
                        height={(item.loss / maxValue) * maxY}
                        className={"fill-current text-red-500"}
                    />
                    {/*vygenerovani popisku (den)*/}
                    <text x={index * (sizeBlock + sizeMargin) + xOffSet + sizeBlock / 2}
                          y={55}
                          fontSize="2"
                          textAnchor="middle"
                          fill="black">
                        {
                            item.label.slice(5)
                        }
                    </text>
                </g>
            ))}
        </svg>
    );
};