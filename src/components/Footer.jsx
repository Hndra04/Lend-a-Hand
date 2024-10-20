import React from "react";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#232323] text-white py-10">
      <div className="container mx-auto flex items-center px-20">
        <div className="flex flex-col md:flex-row w-full max-w-4xl text-center md:text-left gap-28">
          {/* Logo and Social Media Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <img
                src="/assets/Icons/Logo.png"
                alt="Lend-a-Hand Logo"
                className="h-8"
              />
              <span className="text-lg font-bold">Lend-a-Hand</span>
            </div>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Twitter" className="hover:text-gray-400">
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-gray-400"
              >
                <FaInstagram size={24} />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-gray-400">
                <FaYoutube size={24} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Newsroom
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contribute
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Donate
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
