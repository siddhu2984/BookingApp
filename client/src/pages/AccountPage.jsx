import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // if (!ready) {
  //   return "Loading...";
  // }
  if (!ready & !user) {
    return <Navigate to={"/login"} />;
  }

  if (subpage === undefined) {
    subpage = "profile";
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto mt-8">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
