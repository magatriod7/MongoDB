import React, { Fragment, useState, useCallback, useEffect } from "react";
import {
  Navbar,
  Container,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Form,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT_REQUEST, POSTS_WRITE_REQUEST } from "../redux/types";
import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal";
import SearchInput from "./search/searchInput";

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);//초기값 부여 및 setIsOpen의 값이 변하면 isOpen의 값이 변한다
  const { isAuthenticated, user, userRole } = useSelector(//store에서 state를 가져온다. 즉, authenticated, user, userRole를 받아온다.
    (state) => state.auth//state.auth 받아 옴 
  );
  //console.log(userRole, "UserRole");

  const dispatch = useDispatch();//액션을 파라미터로 전달한다.

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);



  useEffect(() => {
    setIsOpen(false);
  }, [user]);//유저가 변할 때 isopen이 꺼진다.



  const handleToggle = () => {
    setIsOpen(!isOpen);
  };//isOpen의 값을 토글한다.

  const addPostClick = () => {
    console.log("POSTS_WRITE_REQUEST")
    dispatch({
      type: POSTS_WRITE_REQUEST,
    });
  };


  const authLink = (
    <Fragment>
      <NavItem>
        {/* {userRole === "MainJuin" ? (
          <Form className="col mt-2">
            <Link
              to="/post"
              className="btn btn-success block text-white px-3"
              onClick={addPostClick}
            >
              Add Post
            </Link>
          </Form>
        ) : (
            ""
          )} */}

      </NavItem>
      <NavItem className="d-flex justify-content-center">
        <Form className="col mt-2">
          {user && user.name ? (
            <Link to={`/user/${user.name}/profile`}>
              <Button outline color="light" className="px-3" block>
                <strong>{user ? `Welcome ${user.name}` : ""}</strong>
              </Button>
            </Link>
          ) : (
              <Button outline color="light" className="px-3" block>
                <strong>No User</strong>
              </Button>
            )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col">
          <Link onClick={onLogout} to="#" className="">
            <Button outline color="light" className="mt-2" block>
              Logout
            </Button>
          </Link>
        </Form>
      </NavItem>
    </Fragment>
  );

  const guestLink = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );







  return (
    <Fragment>
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            MAZE_HOME_PAGE
          </Link>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            {/* <SearchInput isOpen={isOpen} /> */}
            <nav className="top_menu_nav">
              <ul>
                <li> <Link to="/post/60208a813276140620c98e62" className="top_menu_link"> 소개 </Link> </ li>
                <li> <Link to="" className="top_menu_link"> 게시판 </Link>
                  <ul>
                    <li>  <Link to="/post/list/공지사항" className="top_menu_link"> 공지사항 </Link> </ li>
                    <li>  <Link to="/post/list/자유게시판" className="top_menu_link"> 자유게시판 </Link> </ li>
                    <li>  <Link to="/post/list/손님게시판" className="top_menu_link"> 손님게시판 </Link> </ li>
                    {isAuthenticated ?
                      <li>  <Link to="/post/list/정회원게시판" className="top_menu_link"> 정회원게시판 </Link> </ li> : <div></div>}
                  </ ul>
                </ li>
                <li>
                  <Link to="" className="top_menu_link"> 대회 및 전시회 </Link>
                  <ul>
                    <li>  <Link to="/post/list/MAZE전시회" className="top_menu_link"> MAZE 전시회 </Link> </ li>
                    <li>
                      <Link to="" className="top_menu_link"> 단국대 대회 </Link>
                      <ul>
                        <li>  <Link to="/post/list/스텝 트레이서" className="top_menu_link"> 스텝 트레이서 </Link> </ li>
                        <li>  <Link to="/post/list/DC 트레이서" className="top_menu_link"> DC 트레이서 </Link> </ li >
                        <li>  <Link to="/post/list/마이크로 마우스" className="top_menu_link"> 마이크로 마우스 </Link> </ li >
                      </ ul >
                    </ li >
                    <li>
                      <Link to="" className="top_menu_link"> sub nav </Link>
                      <ul>
                        <li>  <Link to="" className="top_menu_link"> child </Link> </ li>
                        <li>  <Link to="" className="top_menu_link"> child </Link> </ li >
                        <li>  <Link to="" className="top_menu_link"> child </Link> </ li >
                      </ ul >
                    </ li >
                  </ ul >
                </ li >
                <li>  <Link to="/test" className="top_menu_link"> 사진첩 </Link> </ li >
                <li>  <Link to="" className="top_menu_link"> 링크 </Link> </ li >
              </ ul >
            </nav>


            <Nav className="ml-auto d-felx justify-content-around" navbar>
              {isAuthenticated ? authLink : guestLink}
            </Nav>
          </Collapse >
        </Container >
      </Navbar >
    </Fragment >
  );
};

export default AppNavbar;