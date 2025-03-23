// import { Button } from "./components/ui/button";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="sso-callback"
        element={
          <AuthenticateWithRedirectCallback
            signInForceRedirectUrl={"/auth-callback"}
          />
        }
      ></Route>
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
