import React, { useState, useEffect, Fragment } from "react";
import { Container } from "reactstrap";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSpring, animated} from 'react-spring'
import CardInfo_1 from "./Page_2/CardInfo_1";
import CardInfo_2 from "./Page_2/CardInfo_2";
import CardInfo_3 from "./Page_2/CardInfo_3";

const Main_Page_2 = () => {


    return (
        <Fragment>
            <div className = "Page_1">
                <CardInfo_1/>
                
                <CardInfo_2/>
                
                <CardInfo_3/>
            </div>
        </Fragment>
    )
};

export default Main_Page_2;