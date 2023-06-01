import { User, listedUsers } from "../db/user";
import { toast } from "react-toastify";

type authType = {
  user: User | {};
  isAuth: boolean;
};

const authState: authType = {
  user: {},
  isAuth: false,
};

type AuthAction =
  | {
      type: "LOGIN";
      payload: {
        userName: string;
        password: string;
      };
    }
  | {
      type: "LOGOUT";
    };

export const AuthReducer = (state = authState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      let tempUserName = action.payload.userName;
      let tempPassword = action.payload.password;
      let tempAllUsers = listedUsers;

      const foundUser = tempAllUsers.filter(
        (item): boolean => item.userName === tempUserName
      );

      if (foundUser.length !== 0) {
        if (foundUser[0].password === tempPassword) {
          localStorage.setItem("isAuth", "true");
          return { ...state, user: { ...foundUser }, isAuth: true };
        }
        toast.warn("Incorrect Password");
        return state;
      }

      toast.warn("User not found");

      return state;

    case "LOGOUT":
      localStorage.removeItem("isAuth");

      return {
        ...state,
        user: {},
        isAuth: false,
      };

    default:
      return state;
  }
};
