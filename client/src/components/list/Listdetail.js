import React from 'react';
import { Table, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Listdetail = ({ posts }) => {


    console.log("posts.creator.name", posts)
    if (posts[0] == 0) return <div></div>
    console.log(posts, "리스트 내부 확인용")
    return (
        <div>
            {/* <ul>
                <li></li>
                {posts.map(post => (
                    <li key={post._id}>
                        {post.title}
                    </li>
                ))}
            </ul> */}

            <div className="List_table">
                {/* <div className="List_Top_Info">
                    <div className="List_div">
                        <div className="table_name_top">제목</div>
                        <div className="table_creator_top">글쓴이</div>
                        <div className="table_date_top">날짜</div>
                        <div className="table_view_top">조회수</div>
                    </div>
                </div> */}
                <div className="List_Bottom_Info">
                    {posts.map(posts =>
                        <div className="List_div" key={posts._id}>
                            <div className="table_name">
                                <Link to={`/post/${posts._id}`} className="text-dark text-decoration-none">
                                    <div className="ellipse_list_name_s">{posts.title}</div>
                                </Link>
                            </div>
                            <div className="table_creator"> {posts.creatorName}</div>
                            <div className="table_date">{posts.date}</div>
                            <div className="table_view">{posts.views}</div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};


export default Listdetail;



