import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';
import useViewport from '../../hooks/useViewport';
import useInput from '../../hooks/useInput';
import GoBackButton from '../../components/starting/GoBackBtn';
import {
  validateName,
  validatePassword,
  validateEmail,
} from '../../utils/validators';

function Signup() {
  const navigate = useNavigate('/');
  const { width } = useViewport();
  const breakPoint = 720;

  const {
    value: enteredNameValue,
    valueIsValid: enteredNameIsValid,
    errorPara: nameErrorPara,
    classesName: nameClassesName,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput('Username', 'Username is required', validateName);

  const {
    value: enteredEmailValue,
    valueIsValid: enteredEmailIsValid,
    errorPara: emailErrorPara,
    classesName: emailClassesName,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput('Email', 'Required email format', validateEmail);

  const {
    value: enteredPasswordValue,
    valueIsValid: enteredPasswordIsValid,
    errorPara: passwordErrorPara,
    classesName: passwordClassesName,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(
    'Password',
    'A minimum of 6 characters (letters and numbers), and at least one number and a letter',
    validatePassword
  );

  const isFormValid =
    enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    await createUserWithEmailAndPassword(
      auth,
      enteredEmailValue,
      enteredPasswordValue
    )
      .then((userCredential) => {
        console.log(userCredential);
        const { user } = userCredential;
        user.updateProfile({
          displayName: enteredNameValue,
        });
        navigate('/signin');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error, errorCode, errorMessage);
      });
  };

  return (
    <main className="flex flex-col ">
      <span className="h-4 lg:h-16" />
      <div className="flex  mx-auto">
        {width > breakPoint ? (
          <div>
            <GoBackButton />
          </div>
        ) : null}
        <div className="flex flex-col w-[500px]">
          <div className="mb-4">
            <h1 className="text-5xl mb-2 text-center">Create an account</h1>
            <p className="text-sm text-center">
              Required fields have an asterisk: *
            </p>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="[&>label]:custom-label-div">
              <label htmlFor="username">
                Username*
                <input
                  className={nameClassesName}
                  type="text"
                  value={enteredNameValue}
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                />
                {nameErrorPara}
              </label>
              <label htmlFor="email">
                Email*
                <input
                  value={enteredEmailValue}
                  className={emailClassesName}
                  type="email"
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                />
                {emailErrorPara}
              </label>
              <label htmlFor="password">
                Password*
                <input
                  className={passwordClassesName}
                  value={enteredPasswordValue}
                  type="password"
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                />
                {passwordErrorPara}
              </label>
            </div>
            <button
              className="w-full my-6 py-4 px-10 rounded-3xl text-white bg-my-blue-darker hover:bg-my-blue disabled:bg-my-blue-disabled"
              type="submit"
              disabled={!isFormValid}
            >
              Create free account
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Signup;
