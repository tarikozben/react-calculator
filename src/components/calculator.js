import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [calculation, setCalculation] = useState('');

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setCalculation(`${inputValue} ${nextOperation}`);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      setCalculation(`${newValue} ${nextOperation}`);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setCalculation(`${previousValue} ${operation} ${inputValue} =`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setCalculation('');
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.substr(1) : '-' + display);
    }
  };

  return (
    <div className="calculator">
      <Display display={display} calculation={calculation} />
      
      <div className="button-grid">
        <Button onClick={clear} className="function-btn">
          AC
        </Button>
        <Button onClick={toggleSign} className="function-btn">
          +/-
        </Button>
        <Button onClick={inputPercent} className="function-btn">
          %
        </Button>
        <Button onClick={() => inputOperation('÷')} className="operator-btn">
          ÷
        </Button>

        <Button onClick={() => inputNumber(7)} className="number-btn">
          7
        </Button>
        <Button onClick={() => inputNumber(8)} className="number-btn">
          8
        </Button>
        <Button onClick={() => inputNumber(9)} className="number-btn">
          9
        </Button>
        <Button onClick={() => inputOperation('×')} className="operator-btn">
          ×
        </Button>

        <Button onClick={() => inputNumber(4)} className="number-btn">
          4
        </Button>
        <Button onClick={() => inputNumber(5)} className="number-btn">
          5
        </Button>
        <Button onClick={() => inputNumber(6)} className="number-btn">
          6
        </Button>
        <Button onClick={() => inputOperation('-')} className="operator-btn">
          -
        </Button>

        <Button onClick={() => inputNumber(1)} className="number-btn">
          1
        </Button>
        <Button onClick={() => inputNumber(2)} className="number-btn">
          2
        </Button>
        <Button onClick={() => inputNumber(3)} className="number-btn">
          3
        </Button>
        <Button onClick={() => inputOperation('+')} className="operator-btn">
          +
        </Button>

        <Button onClick={() => inputNumber(0)} className="number-btn zero-btn">
          0
        </Button>
        <Button onClick={inputDecimal} className="number-btn">
          .
        </Button>
        <Button onClick={performCalculation} className="operator-btn">
          =
        </Button>
      </div>
    </div>
  );
};

export default Calculator;