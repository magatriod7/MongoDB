import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POSTS_LOADING_REQUEST, POSTS_WRITE_REQUEST, CATEGORY_FIND_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row, Form} from "reactstrap";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import PostCardOne from "../../components/post/PostCardOne";
import Category from "../../components/post/Category";
import {Link} from "react-router-dom"
const PostCardList = () => {
  const { posts, categoryFindResult, loading, postCount } = useSelector(
    (state) => state.post
  );//값들을 다
  const dispatch = useDispatch();
  console.log(posts,"포스트 카드 리스트 확인 용");
  useEffect(() => {
    // console.log("posts");
    dispatch({ 
      type: POSTS_LOADING_REQUEST,

      // type: CATEGORY_FIND_REQUEST,
      // payload: "사진첩"
     });
  }, [dispatch]);



  const addPostClick = () => {
    console.log("POSTS_WRITE_REQUEST")
    dispatch({
        type: POSTS_WRITE_REQUEST,
        payload: "사진첩"
    });
};


  return (
    <Fragment>

      <Form className="col mt-2 mb-5">
                        <Link
                            to={`/post/list/사진첩/post`}
                            className="btn btn_color block text-white px-3"
                            onClick={addPostClick}
                        >
                         Add Post
                        </Link>
                    </Form>
      <Helmet title="Home" />
      <Row className="border-bottom border-top border-primary py-2 mb-3">
        {/* <Category posts={categoryFindResult} /> */}
      </Row>

      <Row>{posts ? <PostCardOne posts={posts} /> : GrowingSpinner}</Row>
    </Fragment>
  );
};

export default PostCardList;