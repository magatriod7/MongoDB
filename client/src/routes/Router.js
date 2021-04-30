import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";
import bigList from "../components/list/bigList";
import { Container } from "reactstrap";
import { useLocation ,Switch, Route, Redirect } from "react-router-dom";
import PostCardList from "./normalRoute/PostCardList";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import CategoryResult from "./normalRoute/CategoryResult";
import PostEdit from "./normalRoute/PostEdit";
import Profile from "./normalRoute/Profile";
import ListWrite from "./normalRoute/ListWrite";
import ListWrite_visitor from "./normalRoute/ListWrite_visitor";
import {
  EditProtectedRoute,
  ProfileProtectedRoute,
} from "./protectedRoute/ProtectedRoute";
import List from "./normalRoute/List";
import Main from "../components/Main_page/Main.js";

const MyRouter = () => (



  <Fragment>
    <div className="body">
      <AppNavbar />
      {/* <Header /> */}
      <div id="main-body" className = "main_body_div">
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/post" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
          <Route path="/test" exact component={PostCardList} />
          <EditProtectedRoute path="/post/:id/edit" exact component={PostEdit} />
          {/* 
        <Route
          path="/post/list/:categoryName"
          exact
          component={CategoryResult}
        /> */}

          <Route
            path="/post/list/:categoryName"
            exact component={List}
          />
          <Route path="/search/:searchTerm" exact component={Search} />

          <Route path="/post/list/:categoryName/post" exact component={ListWrite} />
          <Route path="/post/list/:categoryName/postvisitor" exact component={ListWrite_visitor} />

          <Route path="/test2" exact component={List} />
          <ProfileProtectedRoute
            path="/user/:userName/profile"
            exact component={Profile}
          />
          <Redirect from="*" to="/main" />
        </Switch>
      </div>
      {/* <Footer /> */}
    </div>
  </Fragment>
);

export default MyRouter;