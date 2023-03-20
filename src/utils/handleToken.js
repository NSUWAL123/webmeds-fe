export const setUserToLocalStorage = (isAuthenticated, token, role) => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("token", token)
    // localStorage.setItem("role", role)
}

export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("token")
    return token;
}

// export const getRoleFromLocalStorage

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    // localStorage.setItem("role")
  };

export const isUserLoggedIn = () => {
    if (localStorage.getItem("isAuthenticated")) {
        return false;
    } else {
        return true;
    }
}