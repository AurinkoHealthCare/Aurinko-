import { useEffect } from "react";
import { block5Data } from "../../Data/data";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Block5 = () => {
  useEffect(() => {
    block5Data.forEach((item) => {
      const img = new Image();
      img.src = item.hoverImage;
    });
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-400" />);
    }

    return stars;
  };

  return (
    <div className="py-16 px-2 md:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-4">
          GLOBAL PROVIDER OF PERSONAL CARE
        </h1>
        <div
          className="h-1 w-64 rounded-full"
          style={{
            background: "linear-gradient(to right, #dc2626, #7f1d1d)",
          }}
        ></div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {block5Data.map((item) => (
          <div key={item.id} className="flip-card w-full max-w-xs mx-auto">
            <div className="flip-card-inner">
              {/* Front */}
              <div className="flip-card-front bg-white shadow-lg rounded-xl relative group overflow-hidden border border-red-100 hover:border-red-500 transition duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-72 object-cover"
                />
                <div className="flex flex-col justify-center items-center text-center p-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <div className="flex justify-center mt-2">
                    {renderStars(item.rating)}
                  </div>
                  <span className="mt-3 text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-700">
                    {item.segment}
                  </span>
                </div>
              </div>

              {/* Back */}
              <div className="flip-card-back bg-white rounded-xl p-4 shadow-xl flex flex-col justify-center items-center text-center border border-red-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <div className="mt-3 text-sm font-medium px-1 py-1 max-h-80 text-left overflow-y-auto no-scrollbar">
                  {item.summery}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flip Card Styling */}
      <style>{`
        .flip-card {
          perspective: 1000px;
          height: 420px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 0.75rem;
        }

        .flip-card-front {
          z-index: 2;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Block5;
