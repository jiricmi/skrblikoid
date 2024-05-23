import React from 'react';

interface TitleProps {
    text: string;
}


const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
      {text}
    </h1>
  );
};

export default Title;

const UpperBar = () => {
    return (
    <div className="flex items-center justify-center bg-gray-900">
        <Title text={"Skriblikoid"}/>
    </div>
        );
}

export {UpperBar, Title}