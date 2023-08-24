import React from "react";

export default function Footer() {
  return (
    <footer className=" mt-10 w-full bg-slate-700 pb-16 pt-14 text-slate-100">
      <div className="container inset-x-0 top-0 z-50 row-span-1 mx-auto px-4 sm:px-2">
        <div className="flex flex-wrap justify-between">
          <div className="mb-4 w-full sm:w-full md:mb-0 md:w-2/6">
            <p className="text-sm">© 2023 gitav. All rights reserved.</p>
          </div>
          <div className="mb-4 w-1/2 md:mb-0 md:w-1/6">
            <h3 className="mb-4 block text-base font-medium leading-6 text-white">
              Company
            </h3>
            <ul className="text-sm">
              <li className="mb-2">About Us</li>
              <li className="mb-2">Contact</li>
              <li className="mb-2">Careers</li>
            </ul>
          </div>
          <div className="mb-4 w-1/2 md:mb-0 md:w-1/6">
            <h3 className="mb-4 text-base font-semibold">Support</h3>
            <ul className="text-sm">
              <li className="mb-2">Help Center</li>
              <li className="mb-2">Terms of Service</li>
              <li className="mb-2">Privacy Policy</li>
            </ul>
          </div>
          <div className="mb-4 w-1/2 md:mb-0 md:w-1/6">
            <h3 className="mb-4 text-base font-semibold">Follow Us</h3>
            <ul className="text-sm">
              <li className="mb-2">Facebook</li>
              <li className="mb-2">Twitter</li>
              <li className="mb-2">Instagram</li>
            </ul>
          </div>
          <div className="mb-4 w-1/2 md:mb-0 md:w-1/6">
            <h3 className="mb-4 text-base font-semibold">Follow Us</h3>
            <ul className="text-sm">
              <li className="mb-2">Facebook</li>
              <li className="mb-2">Twitter</li>
              <li className="mb-2">Instagram</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
