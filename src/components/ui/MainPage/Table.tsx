import React from 'react';

export const TableThead: React.FC<{ keys: string[] }> = ({ keys }) => {
    return (
        <thead>
            <tr className="text-center">
                {keys.map((key, index) => {
                    let className = "py-2 px-4 bg-gray-200 border-b border-gray-300";
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

export const TableTh: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <th className="py-2 px-4 bg-gray-200 border-b border-gray-300">{children}</th>
    );
};

export const TableTr: React.FC<{ props?: React.HTMLProps<HTMLTableRowElement>; children?: React.ReactNode }> = ({ props, children }) => {
    return (
        <tr key={props?.key} className="text-center">
            {children}
        </tr>
    );
};

export const TableTd: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <td className="py-2 px-4 border-b border-gray-300">{children}</td>
    );
}

export const Table: React.FC<{ keys: string[], children?: React.ReactNode}> = ({ keys, children }) => {
    return (
        <div className="flex justify-center">
            <table className="w-full bg-white shadow-md mx-4 rounded-b-2xl border-gray-400 rounded-2xl">
                <TableThead keys={keys} />
                <tbody>
                {children}
                </tbody>
            </table>
        </div>
    );
};