import React, { useContext, useState } from "react";
import { Link, Navigate, NavLink } from "react-router";
import azarImage from "../assets/azar.png";
import { AuthContext } from "../context/auth";

export default function NavBar() {
  const [openProfile, setopenProfile] = useState(false);
  
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b text-white shadow-sm bg-blue-500 border-blue-500">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link className="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                  Flowbite
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    onClick={() => setopenProfile(!openProfile)}
                    type="button"
                    className="flex text-sm bg-blue-600 rounded-full cursor-pointer"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-10 h-10 rounded-full"
                      src={azarImage}
                      alt="Neil Sims"
                    />
                  </button>
                </div>
                {openProfile && (
                  <div
                    className="absolute top-10 right-10 z-50 my-4 text-base list-none bg-blue-900 divide-y divide-white rounded-sm shadow-sm"
                    id="dropdown-user"
                  >
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-white" role="none">
                        Neil Sims
                      </p>
                      <p className="text-sm font-medium text-white truncate" role="none">
                        neil.sims@flowbite.com
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <Link className="block px-4 py-2 text-sm text-white hover:bg-blue-400" role="menuitem">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="block px-4 py-2 text-sm text-white hover:bg-blue-400" role="menuitem">
                          Settings
                        </Link>
                      </li>
                      <li>
                        <Link className="block px-4 py-2 text-sm text-white hover:bg-blue-400" role="menuitem">
                          Earnings
                        </Link>
                      </li>
                      <li>
                        <Link className="block px-4 py-2 text-sm text-white hover:bg-blue-400" role="menuitem">
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}


