
import React from 'react';
import Button from './Button';
const BUTTONS = [
  ['AC', '+/-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];


const Keypad = () => {
  return (
    <div className="buttons">
      {BUTTONS.flat().map((btn, idx) => (
        <Button key={idx} value={btn} />
      ))}
    </div>
  );
};

export default Keypad;

