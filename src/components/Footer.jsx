import React from "react";
import {
  FaYoutube,
  FaWhatsapp,
  FaFacebook,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";

const socialMediaLinks = [
  { name: "YouTube", icon: <FaYoutube />, url: "#" },
  { name: "WhatsApp", icon: <FaWhatsapp />, url: "https://wa.me/+2348037668773" },
  { name: "Facebook", icon: <FaFacebook />, url: "https://www.facebook.com/share/1D7oL6bTGc/" },
  { name: "LinkedIn", icon: <FaLinkedin />, url: "#" },
  { name: "TikTok", icon: <FaTiktok />, url: "https://www.facebook.com/share/1D7oL6bTGc/" },
];

const quickLinks = [
  { link: "Home", path: "home" },
  { link: "About", path: "about" },
  { link: "Services", path: "services" },
  { link: "Projects", path: "Equipment" },
  { link: "Contact", path: "contact" },
];

const handleScrollAdjust = (e, path) => {
  e.preventDefault();
  const target = document.getElementById(path);

  if (target) {
    const offset = 100;
    const elementPosition = target.offsetTop - offset;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

const Footer = () => {
  return (
    <footer className="bg-[#181818] text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p>Email: odinakaikwueme@yahoo.com</p>
            <p>Phone: 08037668773 07083944442</p>
            <p>Address: muodu quarters, Awka, Anambra State, Nigeria.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {quickLinks.map(({ link, path }) => (
                <li key={path}>
                  <a
                    href={`#${path}`}
                    onClick={(e) => handleScrollAdjust(e, path)}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              {socialMediaLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400 transition-colors text-xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-600 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} PARITE CONSULTS NIG - CAC NO:
            2702539. All rights reserved.
          </p>
          <p className="text-xs italic text-gray-400 mt-2">
            Web Developer: +2348030611606
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
