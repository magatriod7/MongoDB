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



const List = () => {


    const addPostClick = () => {
        console.log("POSTS_WRITE_REQUEST")
        dispatch({
            type: POSTS_WRITE_REQUEST,
            payload: categoryName
        });
    };

    let { categoryName } = useParams();
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)
    const { posts, categoryFindResult, loading, postCount } = useSelector(
        (state) => state.post
    );//값들을 다 받았음

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
    console.log(categoryFindResult.posts, "포스트")
    console.log(posts, "포스트")
    console.log(listing, "listing")
    console.log(currentPage)


    useEffect(() => {
        dispatch({
            type: CATEGORY_FIND_REQUEST,
            payload: categoryName,
        });
    }, [dispatch, categoryName]);


    if (listing) {
        console.log(totalpage, "여기인가")

        listing = listing.reverse();
        return (

            <Fragment>
                <Button className="mb-3" color="info">
                    {categoryName}
                </Button>

                <div className="border-black border-5">
                    <Helmet title="testing" />
                    <Listdetail posts={currentPosts(listing)}> </Listdetail>
                    <Pagination postsPerPage={postsPerPage} totalPosts={listing.length} paginate={setCurrentPage} currentPage={currentPage}> </Pagination>
                </div>

                <Form className="col mt-2 mb-5">
                    <Link
                        to={`/post/list/${categoryName}/post`}
                        className="btn btn-success block text-white px-3"
                        onClick={addPostClick}
                    >
                        Add Post
            </Link>
                </Form>
            </Fragment>
        );
    }
    else return (<div></div>)
};

export default List;