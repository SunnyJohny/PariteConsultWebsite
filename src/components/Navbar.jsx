import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { FaXmark, FaBarsStaggered } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Adjust scroll position for sticky header
  const handleScrollAdjust = (e, path) => {
    e.preventDefault(); // Prevent default behavior
    const target = document.getElementById(path);

    if (target) {
      const offset = 100; // Adjust this to match your sticky header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Close menu on mobile
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };

  const navItems = [
    { link: "Home", path: "home" },
    { link: "About", path: "about" },
    { link: "Services", path: "services" },
    { link: "Gallery", path: "Equipment" },
    { link: "Projects", path: "Equipment" },
    { link: "Contact", path: "contact" },
  ];

  return (
    <header className="fixed w-full z-10000002 transition-all duration-300">
      <nav
        className={`py-4 lg:px-24 px-4 ${isSticky ? "bg-dark shadow-lg" : "bg-transparent"}`}
      >
        <div className="flex z-10000002 justify-between items-center text-base relative">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/images/pariteconsultLogoCorrect.png"
              alt="Logo"
              className="h-10 md:h-12 lg:h-14 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map(({ link, path }) => (
              <a
                key={link}
                href={`#${path}`}
                onClick={(e) => handleScrollAdjust(e, path)}
                className="text-base uppercase text-white hover:text-orange cursor-pointer"
              >
                {link}
              </a>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2 rounded-full border border-gray-500 focus:outline-none ml-2 mr-2"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 text-primary" />
              ) : (
                <FaBarsStaggered className="h-6 w-6 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-dark transition-transform transform ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          } px-4`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-600">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img
                src="/images/Group 4 (2).png"
                alt="Logo"
                className="h-8"
              />
            </a>

            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className="text-white p-2 rounded-full border border-gray-500 focus:outline-none ml-2 mr-2"
            >
              <FaXmark className="h-6 w-6 text-primary" />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col items-center justify-center mt-12 space-y-6">
            {navItems.map(({ link, path }) => (
              <a
                key={link}
                href={`#${path}`}
                onClick={(e) => handleScrollAdjust(e, path)}
                className="text-white text-lg hover:text-orange cursor-pointer"
              >
                {link}
              </a>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;