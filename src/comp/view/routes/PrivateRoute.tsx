import {observer} from "mobx-react";
import {JwtUtils} from "../utils/JwtUtils";
import {Navigate} from "react-router";
import {Component} from "react";
import {Route} from "react-router-dom";

const PrivateRoute = observer(
    (props : any) => {

        const access_token = props.token['access_token'];

        if(!JwtUtils.isAuth(access_token)){
            alert('로그인이 필요한 페이지입니다');
            return <Navigate to={`${props.path}`}/>;
        }

        return (
           props.component
        )

    }
)

export default PrivateRoute;