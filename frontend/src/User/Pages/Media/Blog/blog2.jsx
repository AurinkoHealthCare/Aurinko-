import React from "react";
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation("blog");

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
								{t("heading3")}
							</h1>
							<div
								className="h-1 w-11/12 sm:w-8/12 lg:w-8/12 xl:w-6/12 max-w-5xl rounded-full"
								style={{ background: colors.gradient }}
							></div>
						</div>
						<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading4")}</h2>
						<p className="text-gray-700 mb-6 leading-relaxed">
							{t("paragraph2a")}
						</p>
						<img
							src="/Assets/blog/MILK-FERVER-COW2.jpg"
							alt="A cow lying on a straw bed"
							className="h-48 object-cover"
						/>
						<div className="space-y-10">
							<section>
								<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading2a")}</h2>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2b")}
								</p>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2c")}
								</p>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2d")}
								</p>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2e")}
								</p>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2f")}
								</p>
							</section>

							<section>
								<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading2b")}</h2>
								<h2 className={`text-lg font-semibold ${colors.secondary}`}>{t("stage1")}</h2>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2g")}
								</p>
								<h2 className={`text-lg font-semibold ${colors.secondary}`}>{t("stage2")}</h2>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2h")}
								</p>
								<h2 className={`text-lg font-semibold ${colors.secondary}`}>{t("stage3")}</h2>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2i")}
								</p>
							</section>

							<section>
								<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading2c")}</h2>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2j")}
								</p>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2k")}
								</p>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2l")}
								</p>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2m")}
								</p>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2n")}
								</p>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2o")}
								</p>
							</section>

							<section>
								<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading2d")}</h2>
								<ul className="list-disc list-inside text-gray-700 space-y-2">
									<li>{t("lineb2")}</li>
									<li>{t("lineb3")}</li>
									<li>{t("lineb4")}</li>
									<li>{t("lineb5")}</li>
								</ul>
							</section>

							<section>
								<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading2e")}</h2>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2p")}
								</p>
								<p className="text-gray-700 leading-relaxed">
									{t("paragraph2q")}
								</p>
								<ul className="list-disc list-inside text-gray-700 space-y-2">
									<li>{t("linec2")}</li>
									<li>{t("linec3")}</li>
									<li>{t("linec4")}</li>
									<li>{t("linec5")}</li>
									<li>{t("linec6")}</li>
									<li>{t("linec7")}</li>
									<li>{t("linec8")}</li>
									<li>{t("linec9")}</li>
								</ul>
							</section>

							<section>
								<h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading2f")}</h2>
								<ul className="list-disc list-inside text-gray-700 space-y-2">
									<li>{t("lined2")}</li>
									<li>{t("lined3")}</li>
									<li>{t("lined4")}</li>
									<li>{t("lined5")}</li>
									<li>{t("lined6")}</li>
									<li>{t("lined7")}</li>
									<li>{t("lined8")}</li>
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