
import {JwtUtils} from "../utils/JwtUtils";
import {Navigate} from "react-router";
import {useAtom} from "jotai";
import {tokenAtom} from "../AppContainer";

interface Props{
    path: string,
    component: JSX.Element,
}

const PrivateRoute = ({path, component}:Props) => {

        const [token, setToken] = useAtom(tokenAtom);

        const access_token = token['access_token'];

        if(!JwtUtils.isAuth(access_token)){
            alert('로그인이 필요한 페이지입니다');
            return <Navigate to={`${path}`}/>;
        }

        return (
           component
        )

    }


export default PrivateRoute;