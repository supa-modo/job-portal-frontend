import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-white pb-6">
      <div className=" mx-auto px-4">
        {/* Copyright Section */}
        <div className="  pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Job Listings Recruitment. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
