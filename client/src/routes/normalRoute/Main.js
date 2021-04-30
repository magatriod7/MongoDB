import React, { useEffect, Fragment } from "react";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import List from "./List"
import SmallList from "./SmallList"


const Main = () => {


    useEffect(() => {
        // console.log("메인문 유즈 이펙트ㅋ")
    }, []);


    return (
        <Fragment>
            <div className="Main_Photo_body">

            </div>
        </Fragment>
    )
};

export default Main;