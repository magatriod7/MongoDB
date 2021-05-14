import React, { useState, useEffect, Fragment } from "react";
import { Container } from "reactstrap";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSpring, animated} from 'react-spring'


const Main_Page_1 = () => {
    const [counter, setCounter] = useState(0);
    
    return (
        <Fragment>
             <div>
                    <h2>Maze_page_1</h2>
            </div>
        </Fragment>
    )
};

export default Main_Page_1;