import React from "react";

const themeColors = {
  red: {
    main: "text-red-600",
    secondary: "text-red-500",
    gradient: "linear-gradient(to right, #dc2626, #b91c1c)",
    bullet: "list-disc text-red-600",
  },
  blue: {
    main: "text-blue-600",
    secondary: "text-blue-500",
    gradient: "linear-gradient(to right, #2563eb, #1e3a8a)",
    bullet: "list-disc text-blue-600",
  },
  green: {
    main: "text-green-600",
    secondary: "text-green-500",
    gradient: "linear-gradient(to right, #15803d, #166534)",
    bullet: "list-disc text-green-600",
  },
};

const Blog1 = ({ theme = "red" }) => {
  
  const colors = themeColors[theme] || themeColors.red;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-12 px-6">
        <div className="overflow-hidden">
          <img
            src="/Assets/blog/Blog Cows.jpg"
            alt="A cow and a calf standing on a grassy field"
            className="w-full object-cover"
            />
          <div className="p-8">
          <div className="flex flex-col items-center justify-center py-6 px-4 sm:px-6 md:px-8 lg:px-12">
							<h1 className={`text-3xl font-semibold text-center mb-3 sm:mb-4 ${colors.main}`}>
              HOW TO IMPROVE EARLY LACTATION {" "}
								<span className="text-green-800">PERFORMANCE FOR HIGHER PEAK MILK YIELD?</span>
							</h1>
							<div
								className="h-1 w-11/12 sm:w-8/12 lg:w-8/12 xl:w-6/12 max-w-5xl rounded-full"
								style={{ background: colors.gradient }}
							></div>
						</div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Successfully guiding cows through early lactation is key to their health and performance. Thus, nutrition and health during early lactation greatly affect peak milk yields. Preventing health problems and having good feed practices can improve peak milk yields.
            </p>

            <div className="space-y-10">
              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>Ten ways to improve early lactation performance and peak milk yield</h2>
                <p className="text-gray-700 leading-relaxed">
                  Research shows dry period nutrition and management affects health and performance after birth. Thus, evaluate your dry cow program if you’re unhappy with milk cow performance. Key goals for dry cows include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Maintaining dry matter intake (28 to 32 pounds per day)</li>
                  <li>Avoiding overfeeding energy</li>
                  <li>Preventing body condition score (BCS) gain</li>
                  <li>Optimizing comfort</li>
                  <li>Addressing hoof health</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>Prevent subclinical milk fever</h2>
                <p className="text-gray-700 leading-relaxed">
                  Reduce the risk of subclinical milk fever (low blood calcium) during the first week of lactation. Low blood calcium (less than 8.0 milligrams deciliter) correlates with the following.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Ketosis</li>
                  <li>Higher somatic cell count</li>
                  <li>Delayed uterine involution</li>
                  <li>Metritis</li>
                  <li>Depressed feed intake</li>
                  <li>Reduced milk yield</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>Optimize feed intake immediately after calving</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide 10 to 15 gallons of warm water with drinkable drench.</li>
                  <li>Allow access to fresh total mixed ration.</li>
                  <li>Provide 5 to 10 pounds of alfalfa/grass hay.</li>
                  <li>Keep the feed bunks clean and fresh.</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>Optimize cow comfort</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>To optimize cow comfort in the fresh cow group:</li>
                  <li>Use a stocking rate at 80 to 85 percent of capacity.</li>
                  <li>Keep cows in a fresh cow group for 14 to 21 days.</li>
                  <li>Provide 30 to 36 inches of bunk space per cow.</li>
                  <li>Reduce social stress (especially for first calf heifers).</li>
                  <li>Prevent cows from separating from the normal herd mates.</li>
                  <li>Invest in cow cooling for dry and lactating cows.</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>Maintain rumen health and prevent ruminal acidosis</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide a flake of alfalfa/grass hay for the first five days after calving. Early lactation diet should contain plenty of good quality digestible fiber (31 to 35 percent neutral detergent fiber).</li>
                  <li>Maintain fiber mat with consistent feed intake and avoid empty bunks.</li>
                  <li>Provide free choice buffer, and monitor buffer intake.</li>
                  <li>Minimize the risk of slug feeding or diet sorting that may result in rumen acidosis (low rumen pH; sour stomach).</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>Identify cows with a history of metabolic or health problems</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Cows with a history of milk fever, ketosis or mastitis are likely to face these problems again. Keeping an eye on cows prone to health problems allows you to help prevent these problems.</li>
                  <li>For example, move cows carrying twins or first-calf heifers into the dry group early. Data shows a correlation with a 7- to 10- day earlier calving date.</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>Evaluate BCS</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>The target BCS at calving is 3.0-3.25. You should avoid having cows reach a BCS greater than 4. A lower BCS at calving allows for 0.5 to 1.0 units of BCS within-herd variation. This provides a safety margin to avoid overweight cows that:</li>
                  <li>Have a higher risk for ketosis and fatty liver</li>
                  <li>Are often more difficult to breed back</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>Position feed additives</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Fresh cow groups are most likely to offer a return on investments for feed additives. Studies support the following additives:</li>
                  <li>Ionophores increase glucose availability.</li>
                  <li>Rumen-protected choline improves liver health and function.</li>
                  <li>Protected amino acids meet amino acid requirements without overfeeding protein.</li>
                  <li>Supplemental protected fat increases energy intake.</li>
                  <li>Yeast culture stabilizes rumen fermentation.</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>Avoid anti-nutritional factors</h2>
                <p className="text-gray-700 leading-relaxed">
                  Anti-nutritional factors include feeds containing mold, wild yeast and poorly fermented feeds. Mold counts over 100,000 colonies per gram likely decrease feed intake and diet digestibility.
                </p>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>Feed correct amounts of antioxidants</h2>
                <p className="text-gray-700 leading-relaxed">
                  Antioxidants (for example, vitamin E and selenium) help reduce the impact of oxidative stress. Oxidative stress could be too much fat mobilization, poor air quality or injury. These all decrease the efficiency of immune system function.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog1;
