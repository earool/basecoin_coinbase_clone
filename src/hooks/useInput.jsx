/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

function useInput(label, description, validateValue) {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const classesName = !hasError ? 'custom-input' : 'invalid-input';

  const errorMessage = hasError
    ? enteredValue.trim() === ''
      ? `${label} is required`
      : `${description}`
    : '';

  const errorPara = (
    <p className=" text-red-600 text-sm font-light pt-2 max-w-[400px]">
      {errorMessage}
    </p>
  );
  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    valueIsValid,
    errorPara,
    classesName,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
}

export default useInput;
