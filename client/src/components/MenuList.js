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

const MenuList = () => {
    const [isOpen, setIsOpen] = useState(false);//초기값 부여 및 setIsOpen의 값이 변하면 isOpen의 값이 변한다
    const [isOpenBoard, setIsOpenBoard] = useState(false);
    const [isOpenCompetiton, setIsOpenCompetition] = useState(false);
    const [isOpenCompetiton_1, setIsOpenCompetiton_1] = useState(false);
    const [isOpenCompetiton_2, setIsOpenCompetiton_2] = useState(false);
    const [trigger, setTrigger] = useState(1);
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
        setIsOpenBoard(false);
    }, [user]);//유저가 변할 때 isopen이 꺼진다.


    const handleToggleBoard = () => {
        setIsOpenBoard(!isOpenBoard);
    };//isOpen의 값을 토글한다.



    const handleToggleCompetiton = () => {
        if (isOpenCompetiton == false)
            setIsOpenCompetition(!isOpenCompetiton);
    };//isOpen의 값을 토글한다.

    const handleToggleCompetitonClose = () => {
        if (isOpenCompetiton == true)
            setIsOpenCompetition(!isOpenCompetiton);
    };//isOpen의 값을 토글한다.



    const handleToggleCompetiton_1 = () => {
        console.log(isOpenCompetiton_1)
        setIsOpenCompetiton_1(!isOpenCompetiton_1);
    };//isOpen의 값을 토글한다.


    const handleToggleCompetiton_2 = () => {
        setIsOpenCompetiton_2(!isOpenCompetiton_2);
    };//isOpen의 값을 토글한다.


    return (
        <Fragment>
            <ul className="menu_list">
                <li> <Link to="/post/60208a813276140620c98e62" className="top_menu_link"> 소개 </Link> </ li>

                <li onClick={handleToggleBoard}> <Link to="" className="top_menu_link"> 게시판 </Link>
                    <Collapse isOpen={isOpenBoard} >
                        <ul>
                            <li>  <Link to="/post/list/공지사항" className="top_menu_link"> 공지사항 </Link> </ li>
                            <li>  <Link to="/post/list/자유게시판" className="top_menu_link"> 자유게시판 </Link> </ li>
                            <li>  <Link to="/post/list/손님게시판" className="top_menu_link"> 손님게시판 </Link> </ li>
                            {isAuthenticated ?
                                <li>  <Link to="/post/list/정회원게시판" className="top_menu_link"> 정회원게시판 </Link> </ li> : <div></div>}
                        </ ul>
                    </Collapse>
                </ li>
                <li onClick={handleToggleCompetiton}>
                    <Link to="" className="top_menu_link"> <div onClick={handleToggleCompetitonClose}>대회 및 전시회</div></Link>

                    <Collapse isOpen={isOpenCompetiton}>
                        <ul>
                            <li onClick={handleToggleCompetitonClose}>  <Link to="/post/list/MAZE전시회" className="top_menu_link"> MAZE 전시회 </Link> </ li>
                            <li onClick={handleToggleCompetiton_1}>
                                <Link to="" className="top_menu_link"> 단국대 대회 수상자</Link>
                                <ul >
                                    <Collapse isOpen={isOpenCompetiton_1}>
                                        <li onClick={handleToggleCompetitonClose}>  <Link to="/post/list/스텝 트레이서" className="top_menu_link"> 스텝 트레이서 </Link> </ li>
                                        <li onClick={handleToggleCompetitonClose}>  <Link to="/post/list/DC 트레이서" className="top_menu_link"> DC 트레이서 </Link> </ li >
                                        <li onClick={handleToggleCompetitonClose}>  <Link to="/post/list/마이크로 마우스" className="top_menu_link"> 마이크로 마우스 </Link> </ li >
                                    </Collapse>
                                </ ul >
                            </ li >
                            <li onClick={handleToggleCompetiton_2}>
                                <Link to="" className="top_menu_link"> sub nav </Link>
                                <ul >
                                    <Collapse isOpen={isOpenCompetiton_2}>
                                        <li onClick={handleToggleCompetitonClose}>  <Link to="" className="top_menu_link"> child </Link> </ li>
                                        <li onClick={handleToggleCompetitonClose}>  <Link to="" className="top_menu_link"> child </Link> </ li >
                                        <li onClick={handleToggleCompetitonClose}>  <Link to="" className="top_menu_link"> child </Link> </ li >
                                    </Collapse>
                                </ ul >
                            </ li >
                        </ ul >
                    </Collapse>
                </ li >
                <li>  <Link to="/test" className="top_menu_link"> 사진첩 </Link> </ li >
                <li>  <Link to="" className="top_menu_link"> 링크 </Link> </ li >
            </ ul >
        </Fragment >
    );
};

export default MenuList;