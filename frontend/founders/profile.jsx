// import React from "react";
// import { motion } from "framer-motion";

// const ProfileCard = ({ name, quote, description, profileImage, bgColor }) => (
//   <div className="w-full md:w-1/2 p-4">
//     <section
//       className={`rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center ${bgColor}`}
//     >
//       {/* Left Text */}
//       <motion.div
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="md:w-1/2 text-center md:text-left"
//       >
//         <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{name}</h1>
//         <p className="text-lg md:text-xl italic mb-4 text-gray-200">{quote}</p>
//         <p className="text-gray-100 text-md md:text-lg">{description}</p>
//       </motion.div>

//       {/* Right Image */}
//       <motion.div
//         initial={{ x: 50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="md:w-1/2 flex justify-center mt-6 md:mt-0"
//       >
//         <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
//           <img src={profileImage} alt={name} className="w-full h-full object-cover" />
//         </div>
//       </motion.div>
//     </section>

//     {/* Content Grid */}
//     <div className="grid grid-cols-2 gap-6 mt-6">
//       {["Journey", "Achievements", "Vision", "Personal"].map((title, i) => (
//         <div
//           key={i}
//           className="bg-white p-6 rounded-xl shadow-md border-l-4 border-gray-300 flex flex-col justify-between h-52"
//         >
//           <h2 className="text-xl font-semibold mb-2 border-b-2 border-gray-200 inline-block pb-1">
//             {title}
//           </h2>
//           <p className="text-gray-700 text-sm">
//             {title} details go here. Lorem ipsum dolor sit amet, consectetur
//             adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </p>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const OwnerProfiles = () => {
//   const profiles = [
//     {
//       name: "Sumit",
//       quote: "Building impactful and scalable digital solutions with integrity and vision.",
//       description:
//         "A passionate backend MERN developer with a proven track record of delivering scalable systems.",
//       profileImage: "https://via.placeholder.com/300",
//       bgColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
//     },
//     {
//       name: "Amit",
//       quote: "Delivering high-quality code with efficiency and creativity.",
//       description:
//         "Full-stack developer skilled in React and Node.js. Committed to mentoring others and building robust applications.",
//       profileImage: "https://via.placeholder.com/300",
//       bgColor: "bg-gradient-to-r from-green-500 to-teal-600",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-6 md:px-12 flex flex-wrap justify-center">
//       {profiles.map((profile, index) => (
//         <ProfileCard key={index} {...profile} />
//       ))}
//     </div>
//   );
// };

// export default OwnerProfiles;




import React from "react";
import { motion } from "framer-motion";

const ProfileCard = ({ name, quote, description, profileImage, gradient }) => (
  <div className="w-full md:w-1/2 p-4">
    {/* Hero Section */}
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center ${gradient}`}
    >
      {/* Left Text */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{name}</h1>
        <p className="text-lg md:text-xl italic mb-4 text-gray-100">{quote}</p>
        <p className="text-gray-100 text-md md:text-lg">{description}</p>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
          <img src={profileImage} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
    </motion.section>

    {/* Content Sections */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Journey */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-gray-300"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-b-2 border-gray-200 inline-block pb-1">
          Journey
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Started professional journey mastering backend and MERN stack. Delivered scalable systems demonstrating technical excellence.
        </p>
      </motion.div>

      {/* Key Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-gray-300"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-b-2 border-gray-200 inline-block pb-1">
          Key Achievements
        </h2>
        <p className="text-gray-700 leading-relaxed">
          - Delivered multiple backend systems.<br/>
          - Mentored peers in modern development.<br/>
          - Recognized for problem-solving.<br/>
          - Balanced technical execution with strategic vision.
        </p>
      </motion.div>

      {/* Vision */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-gray-300"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-b-2 border-gray-200 inline-block pb-1">
          Vision
        </h2>
        <p className="text-gray-700 leading-relaxed">
          To lead initiatives creating meaningful digital solutions, combining innovation, reliability, and growth.
        </p>
      </motion.div>

      {/* Personal Touch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-gray-300"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-b-2 border-gray-200 inline-block pb-1">
          Personal Touch
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Enjoys exploring innovative technologies, mentoring developers, and creating impact through leadership and hands-on work.
        </p>
      </motion.div>
    </div>
  </div>
);

const TwoProfiles = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row justify-center items-start md:items-start py-16 px-4 md:px-8 gap-6">
      <ProfileCard
        name="Sumit"
        quote="Building impactful digital solutions with integrity."
        description="A passionate backend MERN developer delivering scalable systems and mentoring peers."
        profileImage="https://randomuser.me/api/portraits/men/32.jpg"
        gradient="bg-gradient-to-r from-blue-700 via-teal-700 to-blue-800"
      />
      <ProfileCard
        name="Anjali"
        quote="Creating meaningful tech with creativity and heart."
        description="Frontend enthusiast and UI/UX lover, bringing life to modern web applications."
        profileImage="https://randomuser.me/api/portraits/women/44.jpg"
        gradient="bg-gradient-to-r from-pink-700 via-purple-700 to-pink-800"
      />
    </div>
  );
};
 

export default TwoProfiles;
