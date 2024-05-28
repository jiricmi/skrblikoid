import React from 'react';

export const TableThead: React.FC<{ keys: string[] }> = ({keys}) => {
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

export const TableTd: React.FC<{ children?: React.ReactNode }> = ({children}) => {
    return (
        <td className="py-2 px-4 border-b border-gray-300">{children}</td>
    );
}

export const Table: React.FC<{ keys: string[], children?: React.ReactNode }> = ({keys, children}) => {
    return (
        <div className="flex justify-center">
            <table className="w-full bg-white shadow-md mx-4 border-gray-400 rounded-2xl">
                <TableThead keys={keys}/>
                <tbody>
                {children}
                </tbody>
                <TableFooter/>
            </table>
        </div>
    );
};