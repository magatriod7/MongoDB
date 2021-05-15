import ReactDOM from "react-dom";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const CardInfo_1 = () => {
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
              <h5> 전시회 1 </h5>
              <br></br><br></br>
              
              <h6> 간략한 전시회 소개</h6>
            </div>
          </div>
        <div></div>
      </div>
  );
};

export default CardInfo_1;