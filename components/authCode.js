/**
 Used Ai to help change error message to a more user friendly one. 
 * Converts Firebase authentication error codes to user-friendly messages
 * @param {string} error - Firebase error code or message
 * @returns {string} User-friendly error message
 */
export const getFirebaseErrorMessage = (error) => {
    // Extract error code from Firebase error
    const errorCode = error.includes('/') ? error.split('/')[1] : error;
    
    // Map error codes to user-friendly messages
    switch (errorCode) {
      case 'user-not-found':
        return 'No account found with this email address';
      case 'invalid-credential':
        return 'Incorrect Email or Password';
      case 'wrong-password':
        return 'Incorrect password';
      case 'invalid-email':
        return 'Please enter a valid email address';
      case 'too-many-requests':
        return 'Too many failed login attempts. Please try again later';
      case 'email-already-in-use':
        return 'An account with this email already exists';
      case 'weak-password':
        return 'Password should be at least 6 characters';
      case 'network-request-failed':
        return 'Network error. Please check your connection';
      default:
        return 'Authentication failed. Please try again';
    }
  };