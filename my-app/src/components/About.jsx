import React from "react";

const AboutUs = () => {
  return (
    <section id="about" className="bg-gray-100 py-10 px-4 sm:px-8 lg:px-16 scroll-mt-24">
      <div className="container mx-auto max-w-7xl">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">
            About Us
          </h2>
          <p className="text-sm text-gray-500">
            Home &gt; <span className="text-indigo-600 font-bold">About Us</span>
          </p>
        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          {/* Image Section */}
          <div>
            <img
              src="/images/construction1.jpg"
              alt="Solar Solutions"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong className="text-blue-500">PARITE CONSULTS NIG</strong> is a company with regional scope and national recognition. It was
              established in 2010 and registered with CAC in 2018 with company registration number 2702539. It is a general contractor offering
              construction services in terms of Site Analysis, Feasibility Studies, Preliminary Design Studies, Permit/Zoning Applications,
              consultancy, etc. We handle industrial buildings, public and private buildings, recreational and healthcare buildings,
              landscaping, project management, buying and selling of lands and properties, etc.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>PARITE CONSULTS NIG</strong> is a leader in providing value-added construction services to our customers
              by creating a successful partnership with them throughout the construction process.
            </p>
          </div>

        </div>

       {/* Core Services Section */}
<h3 id="services" className="text-2xl font-bold text-gray-800 text-center uppercase tracking-wide mb-8">
  Our Core Services
</h3>
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
  {[
    {
      title: "Site Analysis",
      description: "We conduct thorough evaluations of land conditions and project locations to ensure optimal construction outcomes."
    },
    {
      title: "Feasibility & Design Studies",
      description: "We assess project viability and develop custom architectural and structural plans tailored to your vision and budget."
    },
    {
      title: "Permit & Zoning Applications",
      description: "We manage all required building permits and regulatory approvals to keep your project compliant and on schedule."
    },
    {
      title: "Construction & Supervision",
      description: "From ground-breaking to final inspection, we deliver quality construction with hands-on project management."
    },
    {
      title: "Building Renovation",
      description: "We transform existing spaces through structural improvements, modernization, and functional upgrades."
    },
    {
      title: "Project Management",
      description: "We oversee timelines, costs, materials, and coordination to ensure successful project execution from start to finish."
    },
    {
      title: "Land & Property Sales",
      description: "We assist clients in acquiring or selling properties, ensuring fair value and smooth legal processing."
    },
    {
      title: "Landscaping & Exterior Design",
      description: "We enhance outdoor environments with aesthetic and functional landscaping solutions tailored to the project."
    }
  ].map((service, index) => (
    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h4>
      <p className="text-gray-700">{service.description}</p>
    </div>
  ))}
</div>


       {/* Commitment Section */}
<h3 className="text-2xl font-bold text-gray-800 text-center uppercase mb-8">
  Our Commitment to Safety
</h3>
<div className="grid md:grid-cols-2 gap-8 mb-12">
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h4 className="text-xl font-semibold text-gray-800 mb-4">People First</h4>
    <p className="text-gray-700">
      People are our greatest resource and most valuable asset. We value their safety above all else. 
      Our Safety Program is rooted in the belief that when you put people first, success will follow.
    </p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h4 className="text-xl font-semibold text-gray-800 mb-4">Safety is Everyone’s Job</h4>
    <p className="text-gray-700">
      Safety is everyone's job. Our goal is simple: we want every worker to go home safely to their families every night. 
      We embed safety into every level of our construction processes and culture.
    </p>
  </div>
</div>


       {/* Vision & Mission Section */}
<h3 className="text-3xl font-bold text-gray-900 text-center uppercase tracking-wide mb-8">
  Our Vision & Mission
</h3>
<div>
  <h4 className="text-2xl font-semibold text-gray-800 mb-4">Vision</h4>
  <p className="text-lg text-gray-700 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 p-4 border-l-4 border-gray-800 rounded-lg shadow-md mb-8">
    To be a leading force in the architecture and building construction industry by consistently delivering excellence and innovative solutions across Nigeria and beyond.
  </p>

  <h4 className="text-2xl font-semibold text-gray-800 mb-4">Mission</h4>
  <p className="text-lg text-gray-700 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 p-4 border-l-4 border-gray-800 rounded-lg shadow-md">
    Dedication to providing quality design, construction, technical, and management services to our customers.
    We strive to implement long-term relationships with our clients based on safety, quality, timely service, and an anticipation of their needs.
    We have shown that if you can dream it, we can build it. Our clients represent a wide range of industries in the private and government sectors.
    We are proud that over 80% of our business comes from referrals from satisfied clients.
  </p>
</div>

      </div>
    </section>
  );
};

export default AboutUs;
