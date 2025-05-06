
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import {
//   addDigit,
//   chooseOperation,
//   clear,
//   evaluateAction,
//   toggleSign
// } from '../features/calculator/calculatorSlice';

// const Button = ({ value }) => {
//   const dispatch = useDispatch();
// const handleClick = () => {
//     if (value === 'AC') {
//       dispatch(clear());
//     } else if (value === '=') {
//       dispatch(evaluateAction());
//     } else if (['+', '-', '*', '/', '%'].includes(value)) {
//       dispatch(chooseOperation(value));
//     } else {
//       dispatch(addDigit(value));
//     }
//   };
//   return (
//     <button
//       className={`btn ${['÷', '×', '-', '+', '='].includes(value) ? 'btn-orange' : ''}`}
//       onClick={handleClick}
//     >
//       {value}
//     </button>
//   );
// };

// export default React.memo(Button);

import React from 'react';
import { useDispatch } from 'react-redux';
import {
  addDigit,
  chooseOperation,
  clear,
  evaluateAction,
  percentage,
  toggleSign,
  openParenthesis,
  closeParenthesis,
} from '../features/calculator/calculatorSlice';

const Button = ({ value }) => {
  const dispatch = useDispatch();
console.log('value======',value)
  const handleClick = () => {
    if (value === 'AC') {
      dispatch(clear());
    } else if (value === '=') {
      dispatch(evaluateAction());
    } else if (value === '+/-') {
      dispatch(toggleSign());
    } else if (value === '%') {
      dispatch(percentage());
    } 
    else if (value === '(') {
      dispatch(openParenthesis());
    } else if (value === ')') {
      dispatch(closeParenthesis());
    }
    else if (['+', '-', '×', '÷'].includes(value)) {
      dispatch(chooseOperation(value));
    } else {
      dispatch(addDigit(value));
    }
  };

  return (
    // <button
    //   className={`btn ${['÷', '×', '-', '+', '='].includes(value) ? 'btn-orange' : ''}`}
    //   onClick={handleClick}
    // >
    //   {value}
    // </button>
    <button
  className={`btn 
    ${['÷', '×', '-', '+', '='].includes(value) ? 'btn-orange' : ''}
    ${value === '0' ? 'wide-btn' : ''}
  `}
  onClick={handleClick}
  style={value === '0' ? { gridColumn: 'span 2' } : {}}
>
  {value}
</button>
  );
};

export default React.memo(Button);

  