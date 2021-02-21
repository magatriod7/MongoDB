import React from "react";
import { Row, Col } from "reactstrap";

const Header = () => {
  return (
    <div id="page-header" className="">
      <Row>
        <Col className="text-center m-auto">
          <h1>MAZE</h1>
          <p>메이즈 홈페이지</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
