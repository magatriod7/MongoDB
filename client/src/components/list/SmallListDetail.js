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

            <table className="table_s">
                <thead>
                    <tr>
                        <th className="table_name_s">제목</th>
                        <th className="table_date_s">날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(posts =>
                        <tr key={posts._id}>
                            <td className="table_name_s">
                                <Link to={`/post/${posts._id}`} className="text-dark text-decoration-none">
                                    <div className="ellipse_list_name_s">{posts.title}</div>
                                </Link>
                            </td>
                            <td className="table_date_s">{posts.date}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
};


export default SmallListDetail;



