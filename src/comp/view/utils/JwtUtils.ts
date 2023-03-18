import jwtDecode from "jwt-decode";

export class JwtUtils{
    // 토큰 유효성 검사
    static isAuth(token : string){
        if(token === ''){
            return false;
        }
        const decoded : any = jwtDecode(token);
        if(decoded.exp > new Date().getTime() / 1000){
            return true;
        }else{
            return false;
        }
    }
    // 토큰에서 유저 account 가져오기
    static getAccount(token : string){
        const decoded : any = jwtDecode(token);
        return decoded.sub;
    }
}

// 커스텀훅 =>