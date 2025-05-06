// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentOperand: '0',
//   previousOperand: '',
//   operation: '',
//   overwrite: false,
// };

// const calculatorSlice = createSlice({
//   name: 'calculator',
//   initialState,
//   reducers: {
//     addDigit: (state, action) => {
//       if (state.overwrite) {
//         state.currentOperand = action.payload;
//         state.overwrite = false;
//         return;
//       }

//       if (action.payload === '0' && state.currentOperand === '0') return; // prevent leading zeros
//       if (action.payload === '.' && state.currentOperand.includes('.')) return; // prevent multiple dots

//       state.currentOperand += action.payload;
//     },

//     chooseOperation: (state, action) => {
//       if (state.currentOperand === '' && state.previousOperand === '') return;

//       if (state.previousOperand === '') {
//         state.operation = action.payload;
//         state.previousOperand = state.currentOperand;
//         state.currentOperand = '';
//       } else if (state.currentOperand === '') {
//         state.operation = action.payload;
//       } else {
//         const result = evaluate(state);
//         state.previousOperand = result;
//         state.operation = action.payload;
//         state.currentOperand = '';
//       }
//     },

//     clear: (state) => {
//       state.currentOperand = '';
//       state.previousOperand = '';
//       state.operation = '';
//       state.overwrite = false;
//     },

//     toggleSign: (state) => {
//       if (state.currentOperand.startsWith('-')) {
//         state.currentOperand = state.currentOperand.slice(1);
//       } else if (state.currentOperand !== '') {
//         state.currentOperand = '-' + state.currentOperand;
//       }
//     },

//     deleteDigit: (state) => {
//       if (state.overwrite) {
//         state.currentOperand = '';
//         state.overwrite = false;
//         return;
//       }
//       state.currentOperand = state.currentOperand.slice(0, -1);
//     },

//     evaluateAction: (state) => {
//       if (
//         state.operation === '' ||
//         state.currentOperand === '' ||
//         state.previousOperand === ''
//       ) {
//         return;
//       }

//       const result = evaluate(state);

//       state.currentOperand = result;
//       state.previousOperand = '';
//       state.operation = '';
//       state.overwrite = true;
//     },
//   },
// });

// export const {
//   addDigit,
//   chooseOperation,
//   clear,
//   deleteDigit,
//   toggleSign,
//   evaluateAction,
// } = calculatorSlice.actions;

// export default calculatorSlice.reducer;

// function evaluate({ currentOperand, previousOperand, operation }) {
//   const prev = parseFloat(previousOperand);
//   const curr = parseFloat(currentOperand);
//   if (isNaN(prev) || isNaN(curr)) return '';

//   let computation = 0;
//   switch (operation) {
//     case '+':
//       computation = prev + curr;
//       break;
//     case '-':
//       computation = prev - curr;
//       break;
//     case '*':
//       computation = prev * curr;
//       break;
//     case '/':
//       if (curr === 0) return 'Error';
//       computation = prev / curr;
//       break;
//     case '%':
//       computation = prev % curr;
//       break;
//     default:
//       return '';
//   }

//   return computation.toString();
// }

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentOperand: "0", // Start with '0' instead of empty string
  previousOperand: "",
  operation: "",
  overwrite: false,
  hasParenthesis: false,
  
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    addDigit: (state, action) => {
      if (state.overwrite) {
        state.currentOperand = action.payload;
        state.overwrite = false;
        return;
      }
      console.log("actionPayload====", action.payload);
      // Prevent multiple leading zeros
      if (action.payload === "0" && state.currentOperand === "0") return;

      // Prevent multiple decimal points
      if (action.payload === "." && state.currentOperand.includes(".")) return;

      // Replace initial zero when typing numbers
      if (state.currentOperand === "0" && action.payload !== ".") {
        state.currentOperand = action.payload;
      } else {
        state.currentOperand += action.payload;
      }
    },

    chooseOperation: (state, action) => {
      if (state.currentOperand === "0" && state.previousOperand === "") return;

      // Convert UI symbols to mathematical operators
      const operation =
        action.payload === "÷"
          ? "/"
          : action.payload === "×"
          ? "*"
          : action.payload;

      if (state.previousOperand === "") {
        state.operation = operation;
        state.previousOperand = state.currentOperand;
        state.currentOperand = "0";
      } else if (state.currentOperand === "0") {
        state.operation = operation;
      } else {
        const result = evaluate(state);
        state.previousOperand = result;
        state.operation = operation;
        state.currentOperand = "0";
      }
    },

    clear: () => initialState,

    deleteDigit: (state) => {
      if (state.overwrite) {
        return initialState;
      }

      if (state.currentOperand.length === 1) {
        state.currentOperand = "0";
      } else {
        state.currentOperand = state.currentOperand.slice(0, -1);
      }
    },

    evaluateAction: (state) => {
      if (state.operation === "" || state.previousOperand === "") return;

      const result = evaluate(state);

      state.currentOperand = result;
      state.previousOperand = "";
      state.operation = "";
      state.overwrite = true;
    },

    // Add percentage operation
    // percentage: (state) => {
    //   state.currentOperand = (parseFloat(state.currentOperand) / 100).toString();
    // },
    percentage: (state) => {
      if (state.currentOperand === "") return;
      const value = parseFloat(state.currentOperand);
      state.currentOperand = (value / 100).toString();
    },

    // Add toggle sign operation
    toggleSign: (state) => {
      state.currentOperand = (parseFloat(state.currentOperand) * -1).toString();
    },
    openParenthesis: (state) => {
      state.hasParenthesis = true;
      // Actual implementation would need stack-based approach
    },

    closeParenthesis: (state) => {
      if (state.hasParenthesis) {
        // Evaluate expression inside parentheses
        state.hasParenthesis = false;
      }
    },
  },
});

// Helper function for calculation logic
function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev)) return currentOperand;
  if (isNaN(curr)) return previousOperand;

  let computation = 0;
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "/":
      if (curr === 0) return "Error";
      computation = prev / curr;
      break;
    // case '%':
    //   computation = prev % curr;
    //   break;
    default:
      return "";
  }

  // Handle floating point precision
  const str = computation.toString();
  return str.includes(".")
    ? parseFloat(str)
        .toFixed(8)
        .replace(/\.?0+$/, "")
    : str;
}

export const {
  addDigit,
  chooseOperation,
  clear,
  deleteDigit,
  evaluateAction,
  percentage,
  toggleSign,
  openParenthesis,
  closeParenthesis,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
