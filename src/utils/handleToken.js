export const setUserToLocalStorage = (isAuthenticated, token) => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("token", token)
}

export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("token")
    return token;
}

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
  };

export const isUserLoggedIn = () => {
    if (localStorage.getItem("isAuthenticated")) {
        return false;
    } else {
        return true;
    }
}