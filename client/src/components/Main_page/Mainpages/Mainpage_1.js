import React, { useState, useEffect, Fragment } from "react";
import { Container } from "reactstrap";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSpring, animated} from 'react-spring'
import CardFlip_1 from "./Page_1/CardFlip_1"
import CardFlip_2 from "./Page_1/CardFlip_2"
import CardFlip_3 from "./Page_1/CardFlip_3"


const Main_Page_1 = () => {


    return (
        <Fragment>
            <div className = "Page_1">
                <CardFlip_1/>
                
                <CardFlip_2/>
                
                <CardFlip_3/>
            </div>
        </Fragment>
    )
};

export default Main_Page_1;