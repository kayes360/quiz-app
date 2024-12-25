import React from "react";
import { Link } from "react-router-dom";
import logoWhite from "../assets/logo-white.svg";
import logoImage from "../assets/logo.svg";
import AvatarSaly from '../assets/Saly-1.png'
import RegistrationForm from "../components/auth/RegistrationForm";

export default function Registration() {
  return (
    <div className="flex min-h-screen max-h-screen">
      {/* <!-- Left side --> */}
      <div className="hidden  lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12  h-full fixed left-0 top-0">
        <div className="text-white">
          <img src={logoWhite} className="h-8" />

          <img
            src={AvatarSaly}
            alt="Illustration"
            className="mx-auto 2xl:ml-0 max-h-64  max-w-lg"
          />

          <h2 className="text-3xl font-bold mb-1">Sign Up Now</h2>

          <p className="text-xl mb-4 font-medium">
            Boost Your Learning Capabilities
          </p>
          <p className="mb-8 max-w-lg">
            Logging in unlocks your personal progress tracker, letting you
            evaluate your performance and see how you stack up against others.
            Whether you're preparing for exams, improving your knowledge, or
            simply having fun, there's no better way to sharpen your mind.
          </p>
        </div>
      </div>

      {/* <!-- Right side --> */}
      <div className="fixed right-0 top-0 w-full h-full lg:w-1/2 flex items-start xl:items-center justify-center p-6 lg:p-8 xl:p-12 overflow-y-auto xl:overflow-hidden">
        <div className="w-full max-w-lg ">
          <h2 className="text-3xl font-bold mb-3 flex gap-2 items-center">
            <span>Welcome to</span>
            <img src={logoImage} className="h-7" />
          </h2>
          <h1 className="text-4xl font-bold mb-6">Sign Up</h1>

          <RegistrationForm/>

          <div className="mt-2 text-gray-400">
            <p className="text-center">
              Already have account ?{" "}
              <Link to="/login" className="text-primary">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
