import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-gradient-to-r from-purple-400 to-blue-900 text-white py-4 shadow-inner">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-2 md:mb-0">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="italic">
            Crafted with precision by{" "}
            <span className="font-semibold">Priyansh</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
