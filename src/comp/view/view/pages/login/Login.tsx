
import {redirect, useNavigate, useSearchParams} from "react-router-dom";
import * as Yup from 'yup';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {ErrorMessage, Formik} from "formik";
import {Button, TextField} from "@mui/material";
import TokenRdo from "../../../../api/feature/member/api-model/TokenRdo";
import {atom, useAtom} from "jotai";
import {useEffect} from "react";

interface Props{
    changeToken: (token: TokenRdo) => void,
    changeAccount: (access_token: string) => void
}
const loginAtom = atom(false);
const toastAtom = atom(false);

const Login = ({changeToken, changeAccount}:Props) => {
        const navigate = useNavigate();
        const [isLogin, setIsLogin] = useAtom(loginAtom);
        const [isTost, setIsToast] = useAtom(toastAtom);

        const [searchParams, setSearchParams] = useSearchParams();
        const validationSchema = Yup.object().shape({
            account : Yup.string()
                .required('아이디를 입력하세요.'),
            password : Yup.string()
                .required('비밀번호를 입력하세요.')
        });

        const submit = async (values: { account: any; password: any; }) => {
            const {account, password} = values;
            setIsToast(false);
            try{
                setIsLogin(true);
                const {data} = await axios.post('/member/login',{
                    account,
                    password,
                });
                changeToken(data.token);
                changeAccount(data.token.access_token);
                const redirectUrl = searchParams.get('redirectUrl');
                toast.success(<h3>로그인 성공 😁</h3>, {
                    position : 'top-center',
                    autoClose : 2000,
                });
                // redirectUrl이 쿼리스트링으로 존재하면 원래가고자 했던 페이지로 돌아가기
                setTimeout((redirectUrl)=>{
                    if(redirectUrl){
                        navigate(redirectUrl);
                    }else{
                        navigate('/');
                    }
                },2000);
            }catch (e : any){
                toast.error('로그인이 실패했습니다! ' + '🤣',{
                    position : 'top-center',
                    autoClose: 2000,
                });
                setTimeout(()=>{
                    toast.dismiss();
                    setIsToast(true);
                    setIsLogin(false);
                    navigate('/login');
                },2000);
            }
        };

        useEffect(()=>{
            setIsLogin(false);
            setIsToast(false);
        },[])

        return(<>

                <Formik
                    initialValues={{
                        account: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={submit}
                >
                    {({values, handleSubmit, handleChange}) => (
                        <div className='signup-wrapper'>
                            {isTost ? '' : <ToastContainer
                                autoClose={2000}
                            />}
                            {isLogin ? '' :
                                <form onSubmit={handleSubmit} autoComplete='off'>
                                    <div className='input-forms'>
                                        <div className='input-forms-item'>
                                            <div className='input-label'>ID</div>
                                            <TextField
                                                value={values.account}
                                                name='account'
                                                variant='outlined'
                                                onChange={handleChange}
                                            />
                                            <div className='error-message'>
                                                <ErrorMessage name='account'/>
                                            </div>
                                        </div>
                                        <div className='input-forms-item'>
                                            <div className='input-label'>비밀번호</div>
                                            <TextField
                                                value={values.password}
                                                name='password'
                                                variant='outlined'
                                                type='password'
                                                onChange={handleChange}
                                            />
                                            <div className='error-message'>
                                                <ErrorMessage name='password'/>
                                            </div>
                                        </div>
                                        <Button
                                            color='primary'
                                            variant='contained'
                                            fullWidth={true}
                                            type='submit'
                                        >
                                            로그인
                                        </Button>
                                    </div>
                                </form>
                            }
                        </div>
                    )}
                </Formik>
            </>
        )
    }


export default Login;