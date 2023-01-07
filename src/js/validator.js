// validator.js

const isValidEmail = (email) => {
    // Use a regular expression to check if the email looks like a valid address
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      // The email does not look like a valid address
      return false;
    }
  
    // Check if the domain part of the email has a valid suffix (e.g., ".com", ".org", etc.)
    const domainRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})$/;
  
    const domain = email.split('@')[1];
    if (!domainRegex.test(domain)) {
      // The domain part of the email does not have a valid suffix
      return false;
    }
  
    // At this point, the email looks like a valid address
    return true;
  }
  
const isValidPassword = (password) => {
    // Check if the password is at least 8 characters long
    if (password.length < 8) {
        return false;
    }

    // Check if the password contains at least one lowercase character
    if (!/[a-z]/.test(password)) {
        return false;
    }

    // Check if the password contains at least one number
    if (!/[0-9]/.test(password)) {
        return false;
    }

    // If the password passes all checks, it is valid
    return true;
}

// Add more functions here as needed

module.exports = {
    isValidEmail,
    isValidPassword,
    // Export other functions here
};
