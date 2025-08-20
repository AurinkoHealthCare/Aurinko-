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

const Blog1 = ({ theme = "red" }) => {
  const { t } = useTranslation("blog");

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
                {t("heading2")}
              </h1>
              <div
                className="h-1 w-11/12 sm:w-8/12 lg:w-8/12 xl:w-6/12 max-w-5xl rounded-full"
                style={{ background: colors.gradient }}
              ></div>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {t("paragraph1a")}
            </p>

            <div className="space-y-10">
              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading4")}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t("paragraph1b")}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{t("line1a")}</li>
                  <li>{t("line2a")}</li>
                  <li>{t("line3a")}</li>
                  <li>{t("line4a")}</li>
                  <li>{t("line5a")}</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading5")}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t("paragraph1c")}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{t("line1b")}</li>
                  <li>{t("line2b")}</li>
                  <li>{t("line3b")}</li>
                  <li>{t("line4b")}</li>
                  <li>{t("line5b")}</li>
                  <li>{t("line6b")}</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading6")}</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{t("line1c")}</li>
                  <li>{t("line2c")}</li>
                  <li>{t("line3c")}</li>
                  <li>{t("line4c")}</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading7")}</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{t("line1d")}</li>
                  <li>{t("line2d")}</li>
                  <li>{t("line3d")}</li>
                  <li>{t("line4d")}</li>
                  <li>{t("line5d")}</li>
                  <li>{t("line6d")}</li>
                  <li>{t("line7d")}</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading8")}</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{t("line1e")}</li>
                  <li>{t("line2e")}</li>
                  <li>{t("line3e")}</li>
                  <li>{t("line4e")}</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading9")}</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{t("line1f")}</li>
                  <li>{t("line2f")}</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading10")}</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{t("line1g")}</li>
                  <li>{t("line2g")}</li>
                  <li>{t("line3g")}</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading11")}</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{t("line1h")}</li>
                  <li>{t("line2h")}</li>
                  <li>{t("line3h")}</li>
                  <li>{t("line4h")}</li>
                  <li>{t("line5h")}</li>
                  <li>{t("line6h")}</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading12")}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t("paragraph1d")}
                </p>
              </section>

              <section>
                <h2 className={`text-3xl font-semibold mb-4 ${colors.secondary}`}>{t("heading13")}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t("paragraph1e")}
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
