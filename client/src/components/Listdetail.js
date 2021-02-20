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

            <table className="table">
                <thead>
                    <tr>
                        <th className="table_name">제목</th>
                        <th className="table_creator">글쓴이</th>
                        <th className="table_date">날짜</th>
                        <th className="table_view">조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(posts =>
                        <tr key={posts._id}>
                            <td className="table_name">
                                <Link to={`/post/${posts._id}`} className="text-dark text-decoration-none">
                                    <div className="ellipse_list_name_s">{posts.title}</div>
                                </Link>
                            </td>
                            <td className="table_creator"> {posts.creator.name}</td>
                            <td className="table_date">{posts.date}</td>
                            <td className="table_view">{posts.views}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
};


export default Listdetail;



