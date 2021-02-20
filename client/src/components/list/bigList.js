import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POSTS_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row } from "reactstrap";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import PostCardOne from "../../components/post/PostCardOne";
import Category from "../../components/post/Category";
import Listdetail from "./Listdetail"
import Pagination from "./Pagination"
import { Link } from "react-router-dom";
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
import { LOGOUT_REQUEST, POSTS_WRITE_REQUEST } from "../../redux/types";


const BigList = () => {
    //const [nameofList, setnameofList] = useState(ListName)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)
    const { posts, categoryFindResult, loading, postCount } = useSelector(
        (state) => state.post
    );//값들을 다 받았음

    const state = useSelector(
        (state) => state
    );//값들을 다 받았음
    //console.log(posts, "ddd")
    //console.log(categoryFindResult, "dddd")
    const dispatch = useDispatch();

    const addPostClick = () => {
        console.log("POSTS_WRITE_REQUEST")
        dispatch({
            type: POSTS_WRITE_REQUEST,
        });
    };


    useEffect(() => {
        dispatch({ type: POSTS_LOADING_REQUEST });
    }, []); /* 새로 추가한 부분 */




    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const totalpage = Math.ceil(posts.length / postsPerPage);
    function currentPosts(tmp) {
        let currentPosts = 0;
        if (currentPage < 1) { setCurrentPage(1) }
        else if ((currentPage > totalpage) && totalpage !== 0) { setCurrentPage(totalpage) }
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }
    /*                 */
    console.log(posts, "뭐가 들어 있을까용 ");
    //console.log(action.payload)
    return (

        <Fragment>
            <div className="border-black border-5">
                <Helmet title="testing" />
                <Listdetail posts={currentPosts(posts)}> </Listdetail>
                <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={setCurrentPage} currentPage={currentPage}> </Pagination>
            </div>
            <Form className="col mt-2">
                <Link
                    to="/post"
                    className="btn btn-success block text-white px-3"
                    onClick={addPostClick}
                >
                    Add Post
            </Link>
            </Form>
        </Fragment>

    );
};

export default BigList;