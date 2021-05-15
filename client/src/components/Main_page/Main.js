import React, { useState, useEffect, Fragment } from "react";
import { Container } from "reactstrap";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./css/reset.css";
import "./css/style.css";
import { useSpring, animated} from 'react-spring'
// import {velocity} from "velocity-react"
// import "./js/velocity.min.js"
// import "./js/velocity.ui.min.js"
// import "./js/jquery-2.1.4.js"
// import "./js/modernizr.js"
// import "./js/main.js"
import jQuery from "jquery"
import Main_Page_1 from "./Mainpages/Mainpage_1"
import Main_Page_2 from "./Mainpages/Main_Page_2"
import Main_Page_3 from "./Mainpages/Main_Page_3"
import BouncingBall from "./Mainpages/Bouncing/Bouncing"



window.$ = window.jQuery = jQuery;


const Main = () => {
    const [counter, setCounter] = useState(0);

    
    // console.log();
    useEffect(() => {
        // setCounter(counter + 1);
        let localNum = localStorage.getItem('counter')
        console.log(localNum,"로컬넘버 확인용");
        
        if (localNum == undefined){
        localStorage.setItem('counter', 1)
        console.log(localNum,"로컬넘버 생성 1로");
        }
        else if(localNum == 0)
        {
            localNum = 1;
            localStorage.setItem('counter', 1)
            console.log(localNum,"로컬넘버 1이 됨");
        }
        else {
            localNum = 0;
            localStorage.setItem('counter', 0)
            console.log(localNum,"로컬넘버 새로고침, 0이됨");
            window.location.reload();
        }
        console.log("매인 리 렌더링 되는지 확인중입니다. 카운터의 값은?", counter)
    }, []);






    
    return (
        <Fragment>
            <div className = "testing_main" data-hijacking = "on" data-animation ="rotate">
            <section className="cd-section visible sa1">
                <Main_Page_3/>
            </section>

            <section className="cd-section  sa2">
                <Main_Page_1/>
            </section>

            <section className="cd-section sa3">
                <Main_Page_2/>
            </section>

            <section className="cd-section sa4">
                <Main_Page_2/>
            </section>

            <section className="cd-section sa5">
                <div>
                    <h2>환영합니다!</h2>
                </div>
            </section>

            <nav>
                <ul className="cd-vertical-nav">
                    <li><a href="#0" className="cd-prev inactive">Next</a></li>
                    <li><a href="#0" className="cd-next">Prev</a></li>
                </ul>
            </nav>
            
            <div className="refresh_plz"></div>
            </div>
        </Fragment>
    )
};

export default Main;