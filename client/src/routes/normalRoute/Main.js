import React, { useEffect, Fragment } from "react";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import List from "./List"
import SmallList from "./SmallList"


const Main = () => {


    useEffect(() => {
        console.log("메인문 유즈 이펙트ㅋ")
    }, []);


    return (
        <Fragment>

            <div className="main-container">
                <div className="main-item"><SmallList category="공지사항"></SmallList></div>
                <div className="main-item"><SmallList category="자유게시판"></SmallList></div>
                <div className="main-item"><SmallList category="게시판"></SmallList></div>
                <div className="main-item"><SmallList category="게시판"></SmallList></div>

            </div>
        </Fragment>
    )
};

export default Main;