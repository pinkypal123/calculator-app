
import React from 'react';
import { useSelector } from 'react-redux';

const Display = () => {
  const { currentOperand, previousOperand, operation } = useSelector((state) => state.calculator);
  
  return (
    <div className="display">
      <div className="previous-operand m-0">
        {previousOperand} {operation} {currentOperand}
      </div>
    </div>
  );
};

export default Display;