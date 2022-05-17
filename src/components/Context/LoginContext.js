import React from "react";

export const LoginContext = React.createContext({
  token: null,
  userId: null
});

export default LoginContext;