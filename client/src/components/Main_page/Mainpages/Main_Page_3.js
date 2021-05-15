import React, { useState, useEffect, Fragment } from "react";
import { Container } from "reactstrap";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSpring, animated} from 'react-spring'
import BouncingBall from "./Bouncing/Bouncing"
const Main_Page_3 = () => {


    return (
        <Fragment>
            <div className = "Page_1 Page_1_center">
                <BouncingBall/>
            </div>
        </Fragment>
    )
};

export default Main_Page_3;