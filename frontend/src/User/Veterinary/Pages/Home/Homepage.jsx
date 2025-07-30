import Block1 from "../../Components/Home Parts/Block1";
import Block2 from "../../Components/Home Parts/Block2";
import Block3 from "../../Components/Home Parts/Block3";
import Block4 from "../../Components/Home Parts/Block4";
import Block5 from "../../Components/Home Parts/Block5";
import Block6 from "../../Components/Home Parts/Block6";
import ImageSlider from "../../Components/Home Parts/ImageSlider";


const Veterinary_Home = () => {
  return (
    <div className="w-full h-auto bg-gradient-to-br from-white to-gray-100">
      <ImageSlider />
      <Block1 />
      <Block2 />
      <Block3 />
      <Block4 />
      <Block5 />
      <Block6 />
    </div>
  );
};

export default Veterinary_Home;
