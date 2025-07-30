const Paragraph = ({ children }) => (
  <p className="text-sm md:text-base lg:text-lg p-3 md:p-4 text-zinc-800">{children}</p>
);

const About = () => {
  return (
   
    <div className="font-sans">
      <div className="relative">
        <img
          src="/Assets/AurinkoHome1.png"
          alt="About Us"
          className="w-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl relative text-center mb-6">
            About Us
          </h1>
        </div>
      </div>
      <div className="px-10 py-8 md:px-14 lg:px-20">
        <section className="mt-6">
          <Paragraph>
            Aurinko One Health is an innovation driven pharmaceutical and nanobiotechnology company incorporated
            on 21st November 2014, received Start up recognition and certification from Department of Industrial
            Policy and Promotion, Govt. of India. Aurinko One Health is a WHO-GMP, FSSAI, APEDA and HACCP certified
            company with ISO 9001-2015, ISO 22000-2018 certifications received for robust management systems.
          </Paragraph>
          <Paragraph>
            Promoters of this organization are well qualified pharmaceutical and financial business professionals
            having illustrious recognition in the areas of strategic marketing, branding, innovation, formulation
            development and business finance with over 30 years of rich domain experience.
          </Paragraph>
          <Paragraph>
            Aurinko One Health is a member of elite business regulatory bodies of India i.e. Federation of Indian
            Chamber of Commerce and Industry, Federation of Indian Export Organizations, Pharmaceutical Export
            Promotion Council, PHD Chamber of Commerce and Spice Board of India.
          </Paragraph>
          <Paragraph>
            Company is specialized in human healthcare segment and evolving the concept of “Organic Therapy” by
            using advance research in nano-biotechnology, bioenhancers and phytochemical molecules to develop
            path-breaking technologies for improvement of human health. A major breakthrough has been achieved
            with “Nanophosphosome”, a novel drug delivery system to multiply the power of phytoactives. Number of
            innovative health supplements have been invented based on Nanophosphosome technology.  “Molecoat”
            technology is developed as colon targeted drug delivery system for drugs and probiotics and
            “Neunaparticles” (Drug Nanoparticles) of 10 to 30 nm has been developed to support human healthcare.
          </Paragraph>
          <Paragraph>
            Company is aiming towards total health solutions by delivering values with quality herbs, spices, essential
            oils, fresh and sun dried fruits and vegetables as consumables to it’s elite customers.
          </Paragraph>
          <Paragraph>
            In line with the global research, Aurinko One Health is developing new concepts and solutions in preventive
            nutrition and nanobiotechnology segment to prevent and control the economically important animal
            diseases and conditions i.e. mastitis, metritis, anoestrus and repeat breeding; and working towards
            “disease free and antibiotic free farming concept”. Essential oils, phytochemicals, probiotics and high value
            nutrition are the latest instruments in disease prevention of animals. The latest invention is “Neunamin”,
            an innovation in animal nutrition with carbon technology nano-minerals.
          </Paragraph>
          <Paragraph>
            Aurinko One Health is well equipped with research, formulation development, quality control and quality
            assurance systems to develop specialized and technologically advanced nutritional and organic concepts
            through in-house, contract research as well as partnership/collaboration with leading research institutes.
          </Paragraph>
          <Paragraph>
            These innovative concepts provide overall benefit to human health & wellness along with dairy, poultry,
            swine, pet and aqua industry by improving in the areas of health, performance and cost concerns.
            Company has filed for trademark & patents, and has been awarded with more than 50 trademarks,
            copyrights for its product portfolio.
          </Paragraph>
          <Paragraph>
            Aurinko One Health is also delivering the values to the consumers, professionals and farmers beyond India
            by exporting it’s quality products to South and South-East Asia, SAARC, Gulf, Middle-East and African
            regions.
          </Paragraph>
      
        </section>
      </div>
    </div>
  );
};

export default About;
