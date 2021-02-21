import React from 'react';
import { Table, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Listdetail = ({ posts }) => {

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
                <div className="List_Top_Info">
                    <ul ClassName="List_ul">
                        <li className="table_name">제목</li>
                        <li className="table_creator">글쓴이</li>
                        <li className="table_date">날짜</li>
                        <li className="table_view">조회수</li>
                    </ul>
                </div>
                <div className="List_Bottom_Info">
                    {posts.map(posts =>
                        <ul key={posts._id}>
                            <li className="table_name">
                                <Link to={`/post/${posts._id}`} className="text-dark text-decoration-none">
                                    <div className="ellipse_list_name_s">{posts.title}</div>
                                </Link>
                            </li>
                            <li className="table_creator"> {posts.creator.name}</li>
                            <li className="table_date">{posts.date}</li>
                            <li className="table_view">{posts.views}</li>
                        </ul>
                    )}
                </div>
            </div>

        </div>
    );
};


export default Listdetail;



