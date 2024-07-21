export const validateInput = value => {
    // Regular expression to match numbers and dot
    const regex = /^[0-9.]+$/;
    return regex.test(value);
  };
  
  export const validateEmail = userEmail => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(userEmail).toLowerCase())) {
      return true;
    } else {
      return false;
    }
  };
  
  