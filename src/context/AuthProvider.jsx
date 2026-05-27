import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // LOAD USER FROM LOCAL STORAGE
  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    const googleUser =
      localStorage.getItem("googleUser");

    // NORMAL LOGIN USER
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // GOOGLE LOGIN USER
    if (googleUser) {
      setUser(JSON.parse(googleUser));
    }

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;