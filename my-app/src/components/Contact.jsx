import { useRef } from "react";
import { FaPhoneAlt, FaEnvelope, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        "template_2hgv8sp",
        form.current,
        "6UfHuLSCvF132R-1l"
      )
      .then(
        () => toast.success("Message sent successfully"),
        (error) => toast.error(error.text)
      );

    e.target.reset();
  };

  return (
    <section id="contact" className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-sm text-gray-500 mb-2">
            Home &gt; <span className="text-gray-800 font-bold text-indigo-500">Contact Us</span>
          </p>

        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Form Section */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="w-full lg:w-1/2 max-w-md p-4 border border-gray-300 bg-white shadow-md rounded-md"
          >
            <label className="block text-lg font-medium mb-2 text-gray-800">
              Name
            </label>
            <input
              type="text"
              name="user_name"
              className="block w-full text-base font-light p-3 border border-gray-400 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Full Name"
              required
            />

            <label className="block text-lg font-medium mb-2 text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="user_email"
              className="block w-full text-base font-light p-3 border border-gray-400 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your active email"
              required
            />

            <label className="block text-lg font-medium mb-2 text-gray-800">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              className="block w-full text-base font-light p-3 border border-gray-400 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Subject"
              required
            />

            <label className="block text-lg font-medium mb-2 text-gray-800">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              className="block w-full text-base font-light p-3 border border-gray-400 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your message here..."
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white text-lg font-medium py-3 rounded hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>

          {/* Contact Details Section */}
          <div className="w-full lg:w-1/2 bg-blue-500 text-white p-8 rounded-md shadow-md">
            <h3 className="text-2xl font-bold mb-4">My Contact Information</h3>
            <p className="mb-6">
              Fill the form or contact us via other channels listed below:
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <FaPhoneAlt className="text-blue-100 text-2xl mr-4" />
                <p>08037668773, 0708394444</p>
              </div>

              <div className="flex items-center">
                <FaEnvelope className="text-blue-100 text-2xl mr-4" />
                <p>odinakaikwueme@yahoo.com</p>
              </div>

              <div className="flex items-center">
                <GoLocation className="text-blue-100 text-2xl mr-4" />
                <p> muodu quarters, Awka, Anambra State, Nigeria.</p>
              </div>

              <div className="flex items-center">
                <FaTiktok className="text-blue-100 text-2xl mr-4" />
                <p></p>
              </div>

      {/* WhatsApp Section */}
              <div className="flex items-center">
                <FaWhatsapp className="text-blue-100 text-2xl mr-4" />
                <a
                  href="https://wa.me/2348037668773?text=Hello%20I%20would%20like%20to%20make%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

  );
};

export default Contact;
