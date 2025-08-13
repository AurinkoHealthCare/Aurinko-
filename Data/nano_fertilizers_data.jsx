const nano_fertilizers_data = [
  // {
  //   id: 1,
  //   name: "Copper Neuna",
  //   description:
  //     "Copper Neuna is an advanced nano-enabled agricultural solu on designed to enhance plant health, boost crop yield, and provide eco-friendly disease control. ",
  //   segment: "Nano Fertilizers",
  //   type: "Liquid",
  //   category: "Fertilizers",
  //   packaging: "",
  //   Productimg: "/Assets/Product images/Nano Fertilizers",
  //   Productname: "/Assets/Product name/Nano Fertilizers/copper neuna.webp",
  //   composition: [
  //     "Copper Neunapar cle 5000 PPM",
  //     "Encapsulated with Chitosan "
  //   ],
  //   indications:
  //     [
  //       "Fungal infec ons such as powdery mildew,",
  //       "Bacterial infec ons such as Leaf spot",
  //       "Crops grown in sandy, organic, or highly leached soils with low na ve copper content."
  //     ],
  //   usage:
  //     [
  //       "Soluble liquid formula on: Suitable for spraying, applying through drip irriga on (micro irriga on) and drenching.",
  //       "5000 ppm: 0.5 ml / L water",
  //       "Typical acre dose: 0.5-1 L",
  //       "Typical Hectare dose :1.25-2.5 L"
  //     ],
  //   report: " ",
  //   brochure: " ",
  //   feedback: " "
  // },
  // {
  //   id: 2, 
  //   name: "Zinc Neuna", 
  //   description:
  //     "Zinc Neuna is a nanopar cle form of zinc that is rapidly absorbed by plants, works well in high pH soils, and improves phosphorus uptake. It supports be er plant growth, higher yields, and increased zinc levels, especially under stress condi ons, while enhancing the nutri onal value of crops through biofor fica on. It is effec ve across all crop types. ",
  //   segment: "Nano Fertilizers",
  //   type: "Liquid",
  //   category: "Fertilizers",
  //   packaging: "",
  //   Productimg: "/Assets/Product images/",
  //   Productname: "/Assets/Product name/Nano Fertilizers/zinc neuna.webp",
  //   composition: [
  //     "Zinc Nanopar cle 5000 PPM",
  //     "Encapsulated with Chitosan"
  //   ],
  //   indications:
  //     [
  //       "Zinc Deficiency Correc on",
  //       "Early Plant Development",
  //       "Improved Flowering and Grain Forma on",
  //       "Environmental stress"
  //     ],
  //   usage:
  //     [
  //       "2-5ml per litre of water 500 m/acre or as advised by a well qualified agronomist."
  //     ],
  //   report: " ",
  //   brochure: " ",
  //   feedback: " "
  // },
  // {
  //   id: 3,
  //   name: "Neuna Urea",
  //   description:
  //     "Neuna Urea is the nanotechnology based Revolu onary Agri-input which provides nitrogen to plants. Neuna Urea is a sustainable op on for farmers towards smart agriculture and combat climate change.",
  //   segment: "Nano Fertilizers",
  //   type: "Liquid",
  //   category: "Fertilizers",
  //   packaging: "",
  //   Productimg: "/Assets/Product images/",
  //   Productname: "/Assets/Product name/Nano Fertilizers/urea neuna.webp",
  //   composition: [
  //     "Each pack contains: Neuna Urea 30%"
  //   ],
  //   indications:
  //     [
  //       "Pale green or yellow leaves (chlorosis), slow growth, and poor llering.",
  //       "Yield and Produc vity Enhancement",
  //       "Essential for crops in nitrogen-depleted soils, par cularly sandy or heavily cropped fields",
  //       "Low nutrients uptake"
  //     ],
  //   usage:
  //     [
  //       "Mix 0.66 ml to 1 ml of neuna urea 30% in one litre of water and spray on crop leaves at its active growth stages",
  //       "1st Spray: At active branching stage(30-35 days after germina on or 20-25 days after transplanting)",
  //       "2nd Spray: 20-25 days after 1st sprayor before flowering in the crop. Note Don’t cut the basal nitrogen supplied DAP or complex fertilizers "
  //     ],
  //   report: " ",
  //   brochure: " ",
  //   feedback: " "
  // },
  // {
  //   id: 4,
  //   name: "Neuna NPK",
  //   description:
  //     "Neuna NPK is an advanced, next-genera on fer lizer designed using nanotechnology to deliver Nitrogen, Phosphorus, and Potassium in ultra-small par cle sizes. This ensures faster absorp on, efficient nutrient use, and improved crop produc vity while reducing nutrient losses and environmental impact",
  //   segment: "Nano Fertilizers",
  //   type: "Liquid",
  //   category: "Fertilizers",
  //   packaging: "",
  //   Productimg: "/Assets/Product images/",
  //   Productname: "/Assets/Product name/Nano Fertilizers/npk neuna.webp",
  //   composition: [
  //     "Each Pack Contains: Neuna NPK 30% "
  //   ],
  //   indications:
  //     [
  //       "Environmental stress such as salinity, drought, heat and pest pressure.",
  //       "Low fer lity soils",
  //       "Nutrients deficiency correc ons",
  //       "Chlorosis, weak stems, poor fruit quality"
  //     ],
  //   usage:
  //     [
  //       "Foliar Spray:",
  //       "2-4 ml per liter of water.",
  //       "Apply at cri cal growth stages (vegeta ve, flowering, frui ng).",
  //       "Soil Applica on (Drip/Irriga on):",
  //       "500–1000 ml per acre, depending on crop stage and soil fer lity.",
  //       "Repeat every 15–20 days or as advised by an agronomist."
  //     ],
  //   report: " ",
  //   brochure: " ",
  //   feedback: " "
  // },
  // {
  //   id: 5,
  //   name: "Copper Neuna",
  //   description:
  //     "Neuna-potassium is a modern fer lizer technology that delivers potassium in ny nanoscale par cles, allowing plants to absorb nutrients more quickly and effec vely. This innova ve method enhances crop yields, opmizes resource use, and reduces environmental impact",
  //   segment: "Nano Fertilizers",
  //   type: "Liquid",
  //   category: "Fertilizers",
  //   packaging: "",
  //   Productimg: "/Assets/Product images/",
  //   Productname: "/Assets/Product name/Nano Fertilizers/potassium neuna.webp",
  //   composition: [
  //     "Neuna Potassium 5000 PPM",
  //     "Encapsulated with Chitosan "
  //   ],
  //   indications:
  //     [
  //       "Potassium Deficiency in Crops",
  //       "Retarded growth especially during cri cal growth stages (Flowering, frui ng)",
  //       "Soil having low potassium availability",
  //       "Chlorosis, weak stems, poor fruit quality"
  //     ],
  //   usage:
  //     [
  //       "500 ml per acre or as advised by a well qualified agronomist."
  //     ],
  //   report: " ",
  //   brochure: " ",
  //   feedback: " "
  // }
]
export default nano_fertilizers_data;