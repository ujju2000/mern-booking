import React from "react";
import { Link } from "react-router-dom";
import {useAppContext} from '../context/AppContext';
import SignOutButton from "./SignOutButton";
export default function Header() {
  const {isLoggedIn} = useAppContext();

  return (
    <div className="py-6 bg-blue-800 ">
      <div className="container mx-auto flex justify-between align-items ">
        <span className="text-3xl text-white font-bold tracking-tight ">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2 ">
          {isLoggedIn  ? <>
              <Link className = 'flex items-center text-white px-3 font-bold hover:bg-blue-600 ' 
              to = '/my-bookings'>My Bookings</Link>
              <Link className = 'flex items-center text-white px-3 font-bold hover:bg-blue-600 '
              to = '/my-hotel'>My Hotels</Link>
              <SignOutButton />
          </>
          :
          <Link
            to="/sign-in"
            className="flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-100"
          >
            Sign In
          </Link>
          }
        </span>
      </div>
    </div>
  );
}
