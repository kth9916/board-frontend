import {observer} from "mobx-react";
import {JwtUtils} from "../utils/JwtUtils";
import {Navigate} from "react-router";

const PrivateRouter = observer(
    (props : any) => {

        const token = props.token;

        if(!JwtUtils.isAuth(token)){
            alert('로그인이 필요한 페이지입니다');
            return <Navigate to={`${props.path}`}/>;
        }

        return (
            <props.RouteComponent>
            </props.RouteComponent>
        )
    }
)

export default PrivateRouter;