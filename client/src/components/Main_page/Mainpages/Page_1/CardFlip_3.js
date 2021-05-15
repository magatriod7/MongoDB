import ReactDOM from "react-dom";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const CardFlip_3 = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div onMouseOver={handleClick} className = "Flip_card" style={{backgroundColor: "red"}}>
          <div class="property-card">
            <a href="#">
              <div class="property-image">
                <div class="property-image-title">
                  {/* <!-- Optional <h5>Card Title</h5> If you want it, turn on the CSS also. --> */}
                </div>
              </div></a>
            <div class="property-description">
              <h5> 마이크로 마우스 </h5>
            </div>
          </div>
        <div></div>
      </div>

      <div onMouseOut={handleClick} className = "Flip_card" style={{backgroundColor: "white"}}>

      GIF 이식 예정
      </div>
    </ReactCardFlip>
  );
};

export default CardFlip_3;