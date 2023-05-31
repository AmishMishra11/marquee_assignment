import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { AuthReducer } from "../Reducer/AuthReducer";
import { User } from "../db/user";
type authType = {
  user: User | {};
  isAuth: boolean;
};

const authInitialState: authType = {
  user: {},
  isAuth: false,
};

const AuthContext = createContext<{
  state: authType;
  dispatch: React.Dispatch<any>;
}>({
  state: authInitialState,
  dispatch: () => null,
});

type AuthProviderPorps = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: AuthProviderPorps) => {
  const [state, dispatch] = useReducer(AuthReducer, authInitialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth };
