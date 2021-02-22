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
import MenuList from "./MenuList";
import MenuListWindow from "./MenuListWindow";
import SearchInput from "./search/searchInput";



const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);//초기값 부여 및 setIsOpen의 값이 변하면 isOpen의 값이 변한다
  const { isAuthenticated, user, userRole } = useSelector(//store에서 state를 가져온다. 즉, authenticated, user, userRole를 받아온다.
    (state) => state.auth//state.auth 받아 옴 
  );
  const [isWindowWidth, setWindowWidth] = useState(2);
  //console.log(userRole, "UserRole");

  const dispatch = useDispatch();//액션을 파라미터로 전달한다.

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

  const handleResize = () => {
    console.log(window.innerWidth)
    if (window.innerWidth > 992) { setWindowWidth(1) }
    else { setWindowWidth(0) }
  }


  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    console.log(isWindowWidth, "왜이러는거야 흑흑");
    setIsOpen(false);
  }, [isWindowWidth]);//유저가 변할 때 isopen이 꺼진다.



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
      <NavItem className="justify-content-center">
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


  console.log(window.innerWidth);



  return (
    <Fragment>
      <div className="AppNavBar">
        <Navbar color="dark" dark expand="lg" className="sticky-top">
          <Container>
            <Link to="/" className="text-white text-decoration-none">
              MAZE_HOME_PAGE
          </Link>
            <NavbarToggler onClick={handleToggle} />
            <Collapse isOpen={isOpen} navbar>
              <div className="Menu_list_top">
                {/* <SearchInput isOpen={isOpen} /> */}
                <nav className="top_menu_nav">
                  {isWindowWidth ? < MenuListWindow /> : < MenuList />}
                </nav>


                <Nav className="top_menu_nav" navbar>
                  {isAuthenticated ? authLink : guestLink}
                </Nav>
              </div>
            </Collapse >
          </Container >
        </Navbar >
      </div>
    </Fragment >
  );
};

export default AppNavbar;