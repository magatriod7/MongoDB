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
import jQuery from "jquery"


const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);//초기값 부여 및 setIsOpen의 값이 변하면 isOpen의 값이 변한다
  const { isAuthenticated, user, userRole } = useSelector(//store에서 state를 가져온다. 즉, authenticated, user, userRole를 받아온다.
    (state) => state.auth//state.auth 받아 옴 
  );
  const [isWindowWidth, setWindowWidth] = useState(2);
  //console.log(userRole, "UserRole");

  window.$ = window.jQuery = jQuery;

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
    // console.log(isWindowWidth, "왜이러는거야 흑흑");
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
      <NavItem className="justify-content-center">
        <Form className="col mt-2">
          {user && user.name ? (
            <Link to={`/user/${user.name}/profile`}>
              <Button outline color="light" className="px-3" block>
                <strong>{user ? `${user.name}` : ""}</strong>
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



  if( window.$(window).scrollTop() == 0) {
    window.$(".AppNavbar_none").css("top", "0px");
    console.log("테스트중입니다.");
  }

  console.log(window.innerWidth);

  var lastScrollTop = 0, delta = 15;

  // window.$(".nav_main_link").click(function() {window.location.reload()})

  window.$(window).scroll(function () {
    var scrollTop = window.$(this).scrollTop() /* 스크롤바 수직 위치를 가져옵니다, 괄호 안에 값(value)이 있을 경우 스크롤바의 수직 위치를 정합니다. */
    // Math.abs: 주어진 숫자의 절대값을 반환(return)합니다.
    if (Math.abs(lastScrollTop - scrollTop) <= delta) // 스크롤 값을 받아서 ~
      return; // ~ 리턴

    if ((scrollTop > lastScrollTop) && (lastScrollTop > 0)) {
      /* 화면에 나오지 않을 때, top값은 요소가 보이지 않을 정도로 사용해야함 */
      window.$(".AppNavbar_none").css("top", "-100px");
    } else {
      window.$(".AppNavbar_none").css("top", "0px");
    }
    console.log("테스트중입니다.");
    lastScrollTop = scrollTop;
  });



  return (
    <Fragment>

      <div className="AppNavbar_none">
        {userRole === "MainJuin" ? (
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
        )}

        <div className="AppNavBar">
          <Navbar color="dark" dark expand="lg" className="sticky-top">
            <div className="nav_body">
              <Link to="/" className="text-white text-decoration-none nav_main_link">
                <h3>M</h3>
              </Link>
              <NavbarToggler onClick={handleToggle} />
              <Collapse className="Collapse_bar" isOpen={isOpen} navbar>
                {/* <SearchInput isOpen={isOpen} /> */}
                {isWindowWidth ? < MenuListWindow /> : < MenuList />}


                <Nav className="top_menu_nav testing" navbar>
                  {isAuthenticated ? authLink : guestLink}
                </Nav>
              </Collapse >
            </div >
          </Navbar >
        </div>
      </div>
    </Fragment >
  );
};

export default AppNavbar;