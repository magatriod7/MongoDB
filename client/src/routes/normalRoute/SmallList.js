import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CATEGORY_FIND_REQUEST, POSTS_WRITE_REQUEST } from "../../redux/types";
import PostCardOne from "../../components/post/PostCardOne";
import { Row } from "reactstrap";
import { Helmet } from "react-helmet";
import Listdetail from "../../components/list/Listdetail"
import { Link } from "react-router-dom";
import Pagination from "../../components/list/Pagination"
import SmallListDetail from "../../components/list/SmallListDetail"
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



const SmallList = ({ category }) => {
    //console.log(category, "카테고리 확인중입니당.")
    let categoryName = [category];
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)
    const { posts, categoryFindResult, loading, postCount } = useSelector(
        (state) => state.post
    );//값들을 다 받았음
    console.log(categoryFindResult.posts, "카테고리 값 확인");
    let listing = categoryFindResult.posts//.reverse()
    if (listing === undefined) { listing = [0] }
    const dispatch = useDispatch();
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    let totalpage = 0;


    totalpage = Math.ceil(listing.length / postsPerPage);


    function currentPosts(tmp) {
        console.log("currentPosts가 작동중")
        let currentPosts = 0;
        console.log(currentPage, "currentPage", totalpage, "totalpage")

        if (currentPage < 1) { setCurrentPage(1) }

        else if ((currentPage > totalpage) && totalpage !== 0) {
            console.log(currentPage, "currentPage", totalpage, "totalpage")
            setCurrentPage(totalpage)
        }
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }


    console.log(categoryFindResult);
    console.log(categoryName);
    // console.log(categoryFindResult.posts, "포스트")
    // console.log(posts, "포스트")
    // console.log(listing, "listing")
    // console.log(currentPage)


    useEffect(() => {
        dispatch({
            type: CATEGORY_FIND_REQUEST,
            payload: categoryName,
        });
    }, [category]);


    if (listing) {
        console.log(listing, "리스팅 확인중")

        listing = listing.reverse();
        return (

            <Fragment>
                <div>{categoryName}</div>
                <div className="border-black border-5">
                    <Helmet title="testing" />
                    <SmallListDetail posts={currentPosts(listing)}> </SmallListDetail>
                </div>
            </Fragment>
        );
    }
    else {
        console.log(listing, "리스팅 확인중")
        return (<div></div>)
    }
};

export default SmallList;