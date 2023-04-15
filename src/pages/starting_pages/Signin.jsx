import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { ReactComponent as UserIcon } from '../../assets/icons/headerbar/user.svg';
import { auth } from '../../firebase';
import useInput from '../../hooks/useInput';
import { validateEmail, validatePassword } from '../../utils/validators';
import formatErrorMsg from '../../utils/formatErrorMsg';

function Signin() {
  const navigate = useNavigate();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    value: enteredEmailValue,
    valueIsValid: enteredEmailIsValid,
    errorPara: emailErrorPara,
    classesName: emailClassesName,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput('Email', 'Required email format', validateEmail);

  const {
    value: enteredPasswordValue,
    valueIsValid: enteredPasswordIsValid,
    errorPara: passwordErrorPara,
    classesName: passwordClassesName,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(
    'Password',
    'A minimum of 6 characters (letters and numbers), and at least one number and a letter',
    validatePassword
  );

  const submitEmailHandler = async (e) => {
    e.preventDefault();

    if (enteredEmailIsValid && !showPasswordForm) {
      const methods = await fetchSignInMethodsForEmail(auth, enteredEmailValue);
      if (methods.length) {
        setShowPasswordForm(true);
        setSubmitError(null);
        return;
      }

      setSubmitError(formatErrorMsg('auth/email-not-found'));
    }

    emailReset();
  };

  const submitPasswordHandler = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(
      auth,
      enteredEmailValue,
      enteredPasswordValue
    )
      .then(() => {
        setSubmitError(null);
        navigate('/home');
      })
      .catch((error) => {
        setSubmitError(formatErrorMsg(error.code));
        passwordReset();
      });
  };

  const form = showPasswordForm ? (
    <form onSubmit={submitPasswordHandler}>
      <label htmlFor="value" className="[&>label]:custom-label-div text-sm">
        Password
        <input
          type="password"
          value={enteredPasswordValue}
          className={passwordClassesName}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordErrorPara}
      </label>
      <button
        type="submit"
        className="w-full my-6 py-4 px-10 rounded-3xl text-white bg-my-blue-darker hover:bg-my-blue disabled:bg-my-blue-disabled"
        disabled={!enteredPasswordIsValid}
      >
        continue
      </button>
    </form>
  ) : (
    <form onSubmit={submitEmailHandler}>
      <label htmlFor="value" className="[&>label]:custom-label-div text-sm">
        Email
        <input
          type="email"
          value={enteredEmailValue}
          className={emailClassesName}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailErrorPara}
      </label>
      <button
        type="submit"
        className="w-full my-6 py-4 px-10 rounded-3xl text-white bg-my-blue-darker hover:bg-my-blue disabled:bg-my-blue-disabled"
        disabled={!enteredEmailIsValid}
      >
        continue
      </button>
    </form>
  );
  const paragraph = showPasswordForm ? (
    <div>
      <h3 className="text-lg font-medium mb-2">Enter Password</h3>
      <button
        type="button"
        className="w-full my-6 h-[44px] hover:bg-gray-100 [&>svg]:text-gray-500 flex items-center justify-center border border-x-gray-border rounded-md"
        onClick={() => {
          setShowPasswordForm(false);
          passwordReset();
        }}
      >
        <UserIcon className="w-6 mr-2 fill-gray-500" />
        <p>{enteredEmailValue}</p>
      </button>
    </div>
  ) : (
    <div>
      <h3 className="text-lg font-medium mb-2">Sign in to Basecoin</h3>
      <p className=" mb-5 text-sm italic text-gray-border-darker">
        Not your device? Use a private or incognito window to sign in.
      </p>
    </div>
  );

  return (
    <main className="flex flex-col">
      <span className="h-4 sm:h-32">
        <p className="mb-2 bg-red-500 text-center text-white">{submitError}</p>
      </span>
      <div className=" max-w-md mt-5 sm:mt-0 mx-auto sm:w-[720px] sm:border-2 sm:border-solid sm:border-gray-border sm:rounded-lg sm:p-10 ">
        <h2 className="text-my-blue text-3xl md:text-4xl font-medium mb-4">
          Basecoin
        </h2>
        {paragraph}
        {form}
      </div>
    </main>
  );
}

export default Signin;
