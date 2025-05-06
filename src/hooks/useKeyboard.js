import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addDigit,
  chooseOperation,
  clear,
  evaluateAction,
  percentage,
  toggleSign,
  deleteDigit,
} from '../features/calculator/calculatorSlice';

export const useKeyboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') dispatch(addDigit(e.key));
      else if (e.key === '.') dispatch(addDigit('.'));
      else if (e.key === 'Escape') dispatch(clear());
      else if (e.key === 'Backspace') dispatch(deleteDigit());
      else if (e.key === 'Enter' || e.key === '=') dispatch(evaluateAction());
      else if (e.key === '%') dispatch(percentage());
      else if (e.key === '_') dispatch(toggleSign());
      else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        const op = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
        dispatch(chooseOperation(op));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);
};