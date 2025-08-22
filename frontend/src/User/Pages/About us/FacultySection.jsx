import React from "react";

const FacultySection = () => {
  return (
    <section className="py-12 px-6">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Our Leadership Team
        </h1>
        <p className="text-gray-600 mt-2">
          Meet the visionaries guiding our company towards excellence
        </p>
      </div>

      {/* Faculty Members */}
      <div className="flex flex-col gap-12 max-w-5xl mx-auto">
        
        {/* Managing Director */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-2xl shadow-md">
          {/* Left: Image */}
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/Assets/md-sir.jpg" 
              alt="Abhay Kumar Bhattacharya"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              Dr. Abhay Kumar Bhattacharya
            </h2>
            <p className="text-lg text-blue-600 font-semibold mt-1">
              Managing Director
            </p>
            <p className="text-gray-600 mt-3 leading-relaxed max-w-xl">
              Dr. Abhay Kumar Bhattacharya is the founder and a visionary leader with years of 
              experience in the Pharmaceutical and Veterinary industry. His focus on strategic planning, innovation and 
              quality has played a key role in delivering advanced healthcare 
              solutions. Under his leadership, our company has grown and earned 
              recognition at both national and international levels.
            </p>
          </div>
        </div>

        {/* Director */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-2xl shadow-md">
          {/* Left: Image */}
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/Assets/director-mam.jpg" 
              alt="Ranjita Bhattacharya"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              Mrs. Ranjita Bhattacharya
            </h2>
            <p className="text-lg text-blue-600 font-semibold mt-1">
              Director and CEO
            </p>
            <p className="text-gray-600 mt-3 leading-relaxed max-w-xl">
              Mrs. Ranjita Bhattacharya is the founder director and Chief Executive Officer of the company.
               She has been instrumental in driving organizational 
              growth through effective business planning, financial and operational management. With her guidance, our 
              company has achieved sustainable and impactful progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
