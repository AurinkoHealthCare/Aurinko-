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

const Blog2 = ({ theme = "red" }) => {
	
	const colors = themeColors[theme] || themeColors.red;

	return (
		<div className="min-h-screen">
			<div className="container mx-auto py-12 px-6">
				<div className="overflow-hidden">
					<img
						src="/Assets/blog/MILK-FERVER-COW.jpg"
						alt="A cow lying on a straw bed"
						className="w-full object-cover"
					/>
					<div className="p-8">
						<div className="flex flex-col items-center justify-center py-6 px-4 sm:px-6 md:px-8 lg:px-12">
							<h1 className={`text-3xl font-semibold text-center mb-3 sm:mb-4 ${colors.main}`}>
								MILK FEVER SIGNS CAUSES{" "}
								<span className={colors.secondary}> PREVENTION AND TREATMENT</span>
							</h1>
							<div
								className="h-1 w-11/12 sm:w-8/12 lg:w-8/12 xl:w-6/12 max-w-5xl rounded-full"
								style={{ background: colors.gradient }}
							></div>
						</div>
						<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>Thinking Ahead <br /> SIGNS, CAUSES, PREVENTION, AND TREATMENT</h2>
						<p className="text-gray-700 mb-6 leading-relaxed">
							Milk fever is a disorder mainly of dairy cows close to calving. It is a metabolic disease caused by a low blood calcium level (Hypocalcemia).
							Calcium is necessary for proper contraction of the muscle. Muscle contraction is reduced by any decrease in blood calcium.
							Daniel et.al.,(1983) demonstrated that contraction rate and strength of the smooth muscle of the intestinal tract is directly
							proportional to blood calcium concentration. Hypocalcemia also acts as a stressor to the cow. About 80% of cases occur within
							one day of calving because milk and colostrum production drain calcium (and other substances) from the blood and some cows
							are unable to replace the calcium quickly enough. High producers are more susceptible because the fall in their blood calcium
							level is greater. Selecting cows for high production may, therefore, increase the problem with milk fever. Fat cows are at a
							greater risk than thin cows. This is partly because their feed and calcium intake has been higher and partly because fat
							cows produce more milk at calving time. Some cows get milk fever several days or even weeks before or after calving.
							This is usually due to the feed, especially the dietary calcium, being insucient to meet the heavy demand due to
							the rapidly growing fetus or milk production in early lactation. In early lactation, cows should receive as much calcium as possible.
						</p>
						<img
							src="/Assets/blog/MILK-FERVER-COW2.jpg"
							alt="A cow lying on a straw bed"
							className="h-48 object-cover"
						/>
						<div className="space-y-10">
							<section>
								<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>SIGNS OF MILK FEVER</h2>
								<p className="text-gray-700 leading-relaxed">
									Signs observed during this stage include loss of appetite, excitability, nervousness, hypersensitivity, weakness, weight shifting, and shuffling of the hind feet. The clinical signs of stage II milk fever can last from 1 to 12 hours.
								</p>
								<p className="text-gray-700 leading-relaxed">
									The affected animal may turn its head into its flank or may extend its head. In typical cases, cows show some initial excitement or agitation and a tremor in muscles of the head and limbs.
								</p>
								<p className="text-gray-700 leading-relaxed">
									Then they stagger and the temperature falls below normal, especially in cold, wet, windy weather. Go down to a “sitting” position, often with a ‘kink’ in her neck, and finally lie flat on their side before the circulatory collapse, coma, and death.
								</p>
								<p className="text-gray-700 leading-relaxed">
									A dry muzzle, staring eyes, cold legs and ears, constipation and drowsiness are seen after going down. The heartbeat becomes weaker and faster. The body These signs are due mainly to lowered blood calcium levels.
								</p>
								<p className="text-gray-700 leading-relaxed">
									Sometimes there are additional signs due to complicating factors. Bloat is common in cows unable to “sit up” because the gas in the rumen is unable to escape. Pneumonia and exposure may affect cows left out in bad weather.
								</p>
							</section>

							<section>
								<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>THE CLINICAL SIGNS OF MILK FEVER CAN BE CLASSIFIED INTO THREE STAGES:</h2>
								<h2 className={`text-lg font-semibold ${colors.secondary}`}>STAGE 1</h2>
								<p className="text-gray-700 leading-relaxed">
									The cow may appear excited with stiffening of the muscles and trembling (may go unnoticed). – Reluctance to move or eat; hind limbs may become stiff and the animal may stagger.
								</p>
								<h2 className={`text-lg font-semibold ${colors.secondary}`}>STAGE 2</h2>
								<p className="text-gray-700 leading-relaxed">
									The cow will be found lying or sitting down and cannot get up; often has a ‘kink’ in her neck or her head folded along her flank. – Dull, cold to touch, low body temp., heavy breathing, increased heart rate.
								</p>
								<h2 className={`text-lg font-semibold ${colors.secondary}`}>STAGE 3</h2>
								<p className="text-gray-700 leading-relaxed">
									Cows are often unresponsive and almost in an unconscious state.. – The animal will lay on her side with legs stretched out; bloat often develops and regurgitation is likely.- Most animals will die if left untreated in this stage.
								</p>
							</section>

							<section>
								<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>CAUSES OF MILK FEVER</h2>
								<p className="text-gray-700 leading-relaxed">
									High producers have a higher risk of hypocalcemia since the fall in their blood calcium level is greater. They may not be able to replenish the large volumes of calcium reserves that drain into the milk.
								</p>
								<p className="text-gray-700 leading-relaxed">
									A highly alkaline environment hinders mobilization of calcium from the bones and absorption of calcium in the intestines. The imbalance increases the cow’s risk to milk fever.
								</p>
								<p className="text-gray-700 leading-relaxed">
									Cows that get milk fever before parturition are attributed to the rapid fetal growth, which demands a lot of calcium. If the cow cannot replenish the minerals through the feeds, it will have milk fever.
								</p>
								<p className="text-gray-700 leading-relaxed">
									Age is important. Old cows increase in susceptibility up to the fifth or six calving because they produce more milk and are less able to replace blood calcium quickly.
								</p>
								<p className="text-gray-700 leading-relaxed">
									When the amount of calcium in the diet is greater than is needed, the efficiency of absorbing calcium from the intestine and the efficiency of transferring calcium from the skeleton both become very sluggish and the chance of milk fever is greatly increased.
								</p>
								<p className="text-gray-700 leading-relaxed">
									Hypocalcemia is often accompanied by hypophosphatemia, and hypermagnesemia although milk fever may also be caused by a low magnesium intake (hypomagnesemia).
								</p>
							</section>

							<section>
								<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>SYMPTOMS OF MILK FEVER</h2>
								<ul className="list-disc list-inside text-gray-700 space-y-2">
									<li>The very first symptom is an unsteady gait. You may notice it during the day. Soon the cow lies down, and if you feel her ears they will be cold and usually droopy.</li>
									<li>If the cow is on her feet, early symptoms include paddling with the hind feet and swaying as if she is about to fall over. Once down, she will twist her head and neck to the side as if there were a kink in her neck. Her nose becomes dry.</li>
									<li>Another warning signal is if your cow, which was bright and active caring for her newborn calf, becomes listless and inattentive. This could be a symptom of any malaise, but at this particular moment in your cow’s life, suspect milk fever.</li>
									<li>If not treated, the symptoms increase in severity until the cow goes down, she begins to go cold (you can feel the ears, legs, and other extremities becoming cold first), her head remains pulled around, and her pulse slows. She no longer recognizes you. All rumen activity ceases. After several hours, she will be unable to hold her head up and will fall over flat, gasping for air.</li>
								</ul>
							</section>

							<section>
								<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>PREVENTION OF MILK FEVER</h2>
								<p className="text-gray-700 leading-relaxed">
									A strategy to prevent milk fever in a herd will depend on herd-specific circumstances such as the attitude and skills of the farmer and the facilities available in the production system.
								</p>
								<p className="text-gray-700 leading-relaxed">
									Prevention of metabolic disease at calving should form an important part of an integrated herd health plan for the farm:
								</p>
								<ul className="list-disc list-inside text-gray-700 space-y-2">
									<li>Do not breed from cows or sires with a history of recurrent milk fever.</li>
									<li>Prevent animals from becoming over fat (cows should calve at BCS 2.5-3) and ensure they get plenty of exercises.</li>
									<li>Make sure that the diet is sufficient in magnesium for cows in late pregnancy.</li>
									<li>Avoid stress in cows.</li>
									<li>Feed adequate long fiber to transition cows.</li>
									<li>Ensure that the calcium intake during the dry period is below 50 g/day.</li>
									<li>Ensure that adequate dietary calcium is available over the risk period (just prior to and after calving).</li>
									<li>Try to avoid diets high in strong cations, such as sodium and potassium.</li>
								</ul>
							</section>

							<section>
								<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>TREATMENT OF MILK FEVER</h2>
								<ul className="list-disc list-inside text-gray-700 space-y-2">
									<li>Treat cases of milk fever as soon as possible with a slow intravenous infusion of 8-12 g of calcium.</li>
									<li>Ensure the solution is warmed to body temperature in cold weather.</li>
									<li>Sit the cow up in a sternal recumbency position and turn her so that she is lying on the side opposite to the one on which she was found and turn every 2 hours.</li>
									<li>Massage the legs.</li>
									<li>Protect cases from exposed weather conditions.</li>
									<li>Remove the calf if a severe case.</li>
									<li>Treat relapse cases as above.</li>
								</ul>
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Blog2;