import react from 'react';
import {Route,Navigate} from 'react-router-dom';
import { getToken } from '../Session/userSession';

const PublicRoute=({component:Component, ...rest})=>{
    return(
        <Route
            {...rest}
            render={props=>{
                return !getToken()? <Component{...props}/>:<Navigate replace to={{pathname:"/dashboard/home"}}/>;
            }}
        />
    );
}
export default PublicRoute;