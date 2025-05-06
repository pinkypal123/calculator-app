
// import React from 'react';
// import { useSelector } from 'react-redux';

// const Display = () => {
//   const { currentOperand } = useSelector((state) => state.calculator);
//   return (
//     <div className="display">
//       <output>{currentOperand}</output>
//     </div>
//   );
// };

// export default Display;
import React from 'react';
import { useSelector } from 'react-redux';

const Display = () => {
  const { currentOperand, previousOperand, operation } = useSelector((state) => state.calculator);
  
  return (
    <div className="display">
      <div className="previous-operand m-0">
        {previousOperand} {operation} {currentOperand}
      </div>
      {/* <output className="current-operand">
        {currentOperand}
      </output> */}
    </div>
  );
};

export default Display;