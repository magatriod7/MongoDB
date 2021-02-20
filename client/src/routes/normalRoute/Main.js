import React, { Fragment } from "react";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import List from "./List"
import SmallList from "./SmallList"


const Main = () => {


    return (
        <Fragment>
            <div className="Main_list_1"><SmallList category="공지사항"></SmallList></div>
            <div className="Main_list_2"><SmallList category="자유게시판"></SmallList></div>
            <div></div>
        </Fragment>
    )
};

export default Main;