import ReactDOM from "react-dom";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const CardInfo_2 = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
      <div className = "Flip_card" style={{backgroundColor: "red"}}>
          <div class="ex_property-card">
            <a href="#">
              <div class="ex_property-image">
                <div class="ex_property-image-title">
                  {/* <!-- Optional <h5>Card Title</h5> If you want it, turn on the CSS also. --> */}
                </div>
              </div></a>
            <div class="ex_property-description">
              <h5> 전시회 2 </h5>
            </div>
          </div>
        <div></div>
      </div>
  );
};

export default CardInfo_2;