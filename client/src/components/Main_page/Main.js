import React, { useState, useEffect, Fragment } from "react";
import { Container } from "reactstrap";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./css/reset.css";
import "./css/style.css";
// import {velocity} from "velocity-react"
// import velocity from "./js/velocity.min.js"
// import velocity from "./js/velocity.ui.min.js"
import jQuery from "jquery"
// import List from "./List"
// import SmallList from "./SmallList"

window.$ = window.jQuery = jQuery;


const Main = () => {
    
    const [islocation, setIslocation] = useState(0);
    console.log(islocation);
    useEffect(() => {

            if(islocation == 1){window.location.reload(); // 새로고침}
    }

    }, [islocation]);






    
    return (
        <Fragment>
            <div className = "testing_main" data-hijacking = "on" data-animation ="rotate">
            <section className="cd-section visible sa1">
                <div>
                    <h2>Section 1</h2>
                </div>
            </section>

            <section className="cd-section  sa2">
                <div>
                    <h2>Section 2</h2>
                </div>
            </section>

            <section className="cd-section sa3">
                <div>
                    <h2>Section 3</h2>
                </div>
            </section>

            <section className="cd-section sa4">
                <div>
                    <h2>Section 4</h2>
                </div>
            </section>

            <section className="cd-section sa5">
                <div>
                    <h2>Section 5</h2>
                </div>
            </section>

            <nav>
                <ul className="cd-vertical-nav">
                    <li><a href="#0" className="cd-prev inactive">Next</a></li>
                    <li><a href="#0" className="cd-next">Prev</a></li>
                </ul>
            </nav>
            
            <div className="refresh_plz">메인 화면을 보기 위해서는 새로고침을 해 주세요!</div>
            </div>
        </Fragment>
    )
};

export default Main;