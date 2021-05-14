import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  faCloudUploadAlt,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { signOut } from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";

import * as ROUTES from "../../routes";

import Avatar from "../Avatar";
import SearchBar from "../SearchBar";
import UploadButton from "../UploadButton";

const addSong = <FontAwesomeIcon title="Upload song" icon={faCloudUploadAlt} />;
const addPlaylist = (
  <FontAwesomeIcon title="Create playlist" icon={faPlusCircle} />
);

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [toggleUserMenu, setToggleUserMenu] = useState(false);

  const { currentUser } = useSelector(authSelector);

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <>
      <nav className="bg-gray-800 fixed z-10 w-screen">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setIsNavbarOpen((prevVal) => !prevVal)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <h4 className="font-bold mr-5">APOLLOFY</h4>
                </Link>
              </div>
              <div className="hidden sm:block m-auto">
                <div className="flex space-x-4">
                  <Link to={ROUTES.SEARCH}>
                    <SearchBar />
                  </Link>
                </div>
              </div>
              <div className="hidden sm:inline-block">
                <UploadButton modal="playlist" icon={addPlaylist} />
                <UploadButton modal="song" icon={addSong} />
              </div>
            </div>
            {/* AVATAR */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <Avatar
                    placeholder={currentUser?.username?.charAt(0).toUpperCase()}
                    height="h-8"
                    width="w-8"
                    textSize="text-base"
                  />
                  <Link to={ROUTES.PROFILE} className="ml-4">
                    <span>{currentUser?.username}</span>
                  </Link>
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none outline-none"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setToggleUserMenu((prevValue) => !prevValue)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="#fff"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {toggleUserMenu ? (
                  <div
                    className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      to={ROUTES.PROFILE}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Profile
                    </Link>
                    <Link
                      to={ROUTES.ACCOUNT}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Account
                    </Link>
                    <Link
                      to={ROUTES.CHANGE_PASSWORD}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Change password
                    </Link>
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        {isNavbarOpen ? (
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-4">
              <UploadButton modal="playlist" text=" Create a playlist" />
            </div>
            <div className="px-4">
              <UploadButton modal="song" text=" Upload a file" />
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <SearchBar />
            </div>
          </div>
        ) : (
          ""
        )}
      </nav>
    </>
  );
}
