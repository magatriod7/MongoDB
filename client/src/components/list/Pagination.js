import React from 'react';
import styled from 'styled-components';


const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];

    const totalList = Math.ceil(totalPosts / postsPerPage)
    //console.log(postsPerPage, "postsPerPage")
    //console.log(totalPosts, "totalPosts")
    //console.log(totalList, "토탈리스트")
    //console.log(currentPage, "커렌트 페이징 확인용")
    if (totalList < 10) {
        for (let i = 1; i <= totalList; i++) {
            pageNumbers.push(i);
        }
    }
    else if (Math.floor((currentPage - 1) / 10) >= Math.floor(totalList / 10)) {
        for (let i = Math.floor(currentPage / 10) * 10 + 1; i <= totalList; i++) {
            pageNumbers.push(i);
        }
    }
    else {
        for (let i = Math.floor((currentPage - 1) / 10) + 1; i <= Math.floor((currentPage - 1) / 10) * 10 + 10; i++) {
            pageNumbers.push(i);
        }
    }
    console.log(pageNumbers, "페이지 넘버")


    return (
        <div className="maze_page">

            <ul className="maze_pagination maze_modal">
                <li>
                    <span className="maze_first maze_last" onClick={() => paginate(1)}>
                        처음페이지
                    </span>
                </li>
                <li>
                    <span className="maze_arrow-left maze_list_etc" onClick={() => paginate(currentPage - 1)}>
                        &lt;
                    </span>
                </li>
                {pageNumbers.map(number => (
                    <li key={number}>
                        { number === currentPage ?
                            <span className="maze_num_current" onClick={() => paginate(number)}>
                                {number}
                            </span>
                            :
                            <span className="maze_num" onClick={() => paginate(number)}>
                                {number}
                            </span>

                        }
                    </li>
                ))}

                <li>
                    <span className="maze_arrow-right maze_list_etc" onClick={() => paginate(currentPage + 1)}>
                        &gt;
                    </span>
                </li>

                <li >
                    <span className="maze_last maze_last" onClick={() => paginate(totalList)}>
                        끝페이지
                    </span>
                </li>
            </ul>

        </div >
    );
};

export default Pagination;


