import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import auth from "../../firebase";
import { Link } from "react-router-dom";

const Header = () => {
  const [isAuth, setAuth] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setAuth(user));
  }, []);

  const Logout = () => {
    signOut(auth)
      .then(() => alert("Logged Out Successfully!"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-2">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4" to="/">
            TaskMaster
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center gap-3">

              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/addTask">
                  Add Task
                </Link>
              </li>

              {/* Profile + Logout */}
              {isAuth ? (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-danger btn-sm px-3"
                      onClick={Logout}
                    >
                      Logout
                    </button>
                  </li>

                  <li className="nav-item dropdown">
                    <button
                      className="btn border-0 p-0"
                      data-bs-toggle="dropdown"
                    >
                      <img
                        src={isAuth.photoURL}
                        alt="profile"
                        className="rounded-circle border"
                        width="45"
                        height="45"
                      />
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end shadow">
                      <li className="dropdown-item fw-semibold">
                        {isAuth.displayName}
                      </li>
                      <li className="dropdown-item">{isAuth.email}</li>
                      <li className="dropdown-item text-center">
                        <img
                          src={isAuth.photoURL}
                          alt="Profile"
                          className="rounded-circle mt-2"
                          width="60"
                          height="60"
                        />
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
