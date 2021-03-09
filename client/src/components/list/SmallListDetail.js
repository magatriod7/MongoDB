import React from 'react';
import { Table, Col } from "reactstrap";
import { Link } from "react-router-dom";

const SmallListDetail = ({ posts }) => {

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

            <div className="table_s">
                <div>
                    <div className="table_s_top">
                        <div className="table_name_s">제목</div>
                        <div className="table_date_s">날짜</div>
                    </div>
                </div>
                <div className="table_s_body">
                    {posts.map(posts =>
                        <div className="table_s_body_list" key={posts._id}>
                            <div className="table_name_s">
                                <Link to={`/post/${posts._id}`} className="text-dark text-decoration-none">
                                    <div className="ellipse_list_name_s">{posts.title}</div>
                                </Link>
                            </div>
                            <div className="table_date_s">{posts.date}</div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};


export default SmallListDetail;



