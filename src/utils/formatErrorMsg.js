const errorMessages = {
  // signup errors
  'auth/invalid-email': 'Invalid email address.',
  'auth/email-already-in-use': 'Email is already taken.',
  // signin errors
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'Invalid email address or password.',
  'auth/wrong-password': 'Invalid email address or password.',
  // others
  'auth/network-request-failed':
    'There was a network error while attempting to create the account',
  'auth/too-many-requests':
    'Too many failed login attempts. Please try again later.',
  // mine
  'auth/email-not-found':
    'The entered email does not match any existing account.',
  default: 'An unknown error occurred. Please try again later.',
};

export default function formatErrorMsg(errorCode) {
  const formattedMsg = errorMessages[errorCode] || errorMessages.default;
  return formattedMsg;
}
