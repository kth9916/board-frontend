import {useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {Formik} from "formik";
import {Button, TextField} from "@mui/material";
import '../../../css/SignUp.scss'
import {useAtom} from "jotai";
import {atom} from "jotai";
import {useMutation} from "react-query";
import React from "react";

const SignUp = () => {
        const navigate = useNavigate();

        const registerMember = async (values: any) => {
            const { account, password, nickname, name, email } = values;
            const response = await axios.post('/member/register',{
                account,
                password,
                nickname,
                name,
                email,
            });
            return response.data;
        }

        const registerMutation = useMutation(registerMember, {
            onSuccess: () => {
                toast.success(<h3>회원가입이 완료되었습니다. <br/> 로그인 하세요 😍</h3>, {
                    position: "top-center",
                    autoClose: 2000,
                });
                setTimeout(() => {
                    navigate('/login');
                },2000);
            },
            onError: (error: any) => {
                toast.error(error.respons.data.message + '😢', {
                    position: 'top-center',
                });
            },
        });

        const {mutate, isLoading} = registerMutation;

        const handleSubmit = (values: any) => {
            const { account, password, nickname, name, email } = values;
            registerMutation.mutate({
                account,
                password,
                nickname,
                name,
                email,
            });
        };


        const validationSchema = Yup.object().shape({
            account: Yup.string()
                .min(1, '아이디는 최소 1자리 이상입니다.')
                .max(16, '아이디는 최대 16자리 입니다.')
                .matches(
                    /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]*$/,
                    '아이디에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다.'
                )
                .required('아이디를 입력하세요!'),
            password: Yup.string()
                .min(8, '비밀번호는 최소 8자리 이상입니다.')
                .max(16, '비밀번호는 최대 16자리 입니다.')
                .required('패스워드를 입력해주세요')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])\S*$/,
                    "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!"
                ),
            password2: Yup.string()
                .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
                .required('필수 입력 값입니다.'),
            nickname: Yup.string()
                .min(2, '닉네임은 최소 2글자 이상입니다.')
                .max(10, '닉네임은 최대 10글자입니다.')
                .matches(
                    /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]*$/,
                    '닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다.'
                )
                .required('닉네임을 입력하세요'),
            name: Yup.string()
                .min(2, '이름은 최소 2글자 이상입니다.')
                .max(6, '이름은 최대 6글자입니다.')
                .matches(
                    /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]*$/,
                    '이름에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다.'
                )
                .required('이름을 입력하세요'),
            email: Yup.string()
                .email('올바른 이메일 형식이 아닙니다.')
                .required('이메일을 입력하세요'),
        });



        return (
            <Formik
                initialValues={{
                    account: '',
                    password: '',
                    password2 : '',
                    nickname: '',
                    name: '',
                    email: '',
                }}

                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnMount={true}
            >
                {({values, handleSubmit, handleChange, errors}) => (
                    <div className='signup-wrapper'>
                        <ToastContainer/>
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
                                        {errors.account}
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
                                        {errors.password}
                                    </div>
                                </div>
                                <div className='input-forms-item'>
                                    <div className='input-label'>비밀번호 확인</div>
                                    <TextField
                                        value={values.password2}
                                        name='password2'
                                        variant='outlined'
                                        type='password'
                                        onChange={handleChange}
                                        />
                                    <div className='error-message'>
                                        {errors.password2}
                                    </div>
                                </div>
                                <div className='input-forms-item'>
                                    <div className='input-label'>닉네임</div>
                                    <TextField
                                        value={values.nickname}
                                        name='nickname'
                                        variant='outlined'
                                        onChange={handleChange}
                                    />
                                    <div className='error-message'>
                                        {errors.nickname}
                                    </div>
                                </div>
                                <div className='input-forms-item'>
                                    <div className='input-label'>이름</div>
                                    <TextField
                                        value={values.name}
                                        name='name'
                                        variant='outlined'
                                        onChange={handleChange}
                                    />
                                    <div className='error-message'>
                                        {errors.name}
                                    </div>
                                </div>
                                <div className='input-forms-item'>
                                    <div className='input-label'>이메일</div>
                                    <TextField
                                        value={values.email}
                                        name='email'
                                        variant='outlined'
                                        onChange={handleChange}
                                    />
                                    <div className='error-message'>
                                        {errors.email}
                                    </div>
                                </div>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    fullWidth={true}
                                    type='submit'>
                                    회원가입
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </Formik>
        );
    }


export default SignUp;