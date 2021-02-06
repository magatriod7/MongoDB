import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POSTS_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row } from "reactstrap";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import PostCardOne from "../../components/post/PostCardOne";

const PostCardList = () => {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  //console.log(posts, "posts")

  useEffect(() => {
    //console.log("포스트카드리스트 테스팅");
    dispatch({ type: POSTS_LOADING_REQUEST });
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet title="Home" />
      <Row>{posts ? <PostCardOne posts={posts} /> : GrowingSpinner}</Row>
    </Fragment>
  );
};

export default PostCardList;