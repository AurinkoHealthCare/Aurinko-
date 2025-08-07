import ImageSlideruse from "../../../../re-use/imageSlider";
import Block1 from "../../Home Parts/Block1";
import Block2 from "../../Home Parts/Block2";
// import Block3 from "../../Home Parts/Block3";
import SingleImage from "../../../../re-use/center banner";
import Block5 from "../../Home Parts/Block5";
import Block6 from "../../Home Parts/Block6";


const Human_Home = () => {
  return (
    <div className="w-full h-auto bg-gradient-to-br from-white to-gray-100">
      <ImageSlideruse category="Human" />
      <Block1 />
      <Block2 />
      {/* <Block3 /> */}
      <SingleImage category="Human" />
      <Block5 />
      <Block6 />
    </div>
  );
};

export default Human_Home;
