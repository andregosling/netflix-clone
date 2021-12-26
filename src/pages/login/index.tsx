import React, { useState, useEffect } from 'react';

import styles from './main.module.scss'

import Logo from '../../assets/logo.png';

import Loading from 'react-loading';

import { connect } from 'react-redux'

import { FirstHeader } from '../../components/first-header';

const ErrorIcon = (props: any) => {
    return (
        <svg {...props} aria-hidden="true" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
    )
}

const LoginComponent = ({ storage, dispatch, navigate }: any) => {

    const [showPassword, toggleShowPassword] = useState(true);
    const [inputsFocus, setInputsFocus] = useState({ email: false, password: false });
    const [inputValues, setInputValues] = useState({ email: '', password: '' });
    const [confirmRead, setConfirmRead] = useState(false);
    const [inputErrors, setInputErros] = useState({ email: '', password: '', confirm: '' });
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)

        return () => {
            setLoading(true)
        }
    }, []);

    const inputChanged = (e: any) => {

        if (e.target.value !== '')
            setInputsFocus({
                ...inputsFocus,
                [e.target.name]: true
            })

        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        })
    }

    const inputFocus = (e: any) => {
        setInputsFocus({ ...inputsFocus, [e.target.name]: true });
    }

    const inputBlur = (e: any) => {
        if (e.target.value === '')
            setInputsFocus({ ...inputsFocus, [e.target.name]: false });
    }

    const submitLogin = (e: any) => {
        e.preventDefault()

        let inputErros = { email: '', password: '', confirm: '' }

        if (!inputValues.password || inputValues.password == '') {
            inputErros.password = 'Insira uma senha.'
        }

        if (!inputValues.email || inputValues.email == '') {
            inputErros.email = 'Email inválido.'
        }

        if (!confirmRead)
            inputErros.confirm = 'Este campo é obrigatório.'

        setInputErros(inputErros)

        if (inputErros.password || inputErros.email || inputErros.confirm) return;

        dispatch({
            type: 'finishLogin',
            module: true
        })

        setLoginLoading(true)

        setTimeout(() => {
            setLoginLoading(false)
            navigate('/browse');
        }, 1500)
    }

    return loading ? (
        <>
            <FirstHeader styles={{ backgroundColor: 'unset', position: 'absolute' }} />
            <main className={styles['login-main']}>
                <div className={styles['login-body']}>''
                    <div className={`${styles['login-container']} ${styles['loading-content']}`}>
                        <Loading type={'spinningBubbles'} color={'#FFFF'} height={250} width={'30%'} />
                    </div>
                </div>
            </main>
        </>
    ) : (
        <>
            <FirstHeader styles={{ backgroundColor: 'unset', position: 'absolute' }} />
            <main className={styles['login-main']}>
                <div className={styles['login-body']}>
                    <div className={styles['login-container']}>
                        <div className={styles['container-content']}>
                            <form onSubmit={submitLogin}>
                                <div className={styles['login-header']}>
                                    <h1>Entrar</h1>
                                </div>
                                <div className={styles['login-inputs']}>
                                    <div>
                                        <div className={styles['input-area']}>
                                            <div className={`${styles['input-area']} ${inputErrors.email ? styles['input-with-error'] : ''}`}>
                                                <div>
                                                    <input type='email' className={styles['password-input']} id='id_email' name='email' onChange={inputChanged}
                                                        onFocus={inputFocus}
                                                        onBlur={inputBlur}
                                                    />
                                                    <label htmlFor="id_email" className={`${styles['placeLabel']} ${inputsFocus.email ? styles['focusLabel'] : ''}`} >
                                                        Email
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles['input-error']} ${inputErrors.email ? '' : styles['sr']}`}>
                                            <ErrorIcon className={styles['error-icon']} />
                                            <span>{inputErrors.email}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={styles['input-area']}>
                                            <div className={`${inputErrors.password ? styles['input-with-error'] : ''}`}>
                                                <div>
                                                    <input type={showPassword ? 'password' : 'text'} autoComplete='current-password' className={styles['password-input']} id='id_password' name='password' onChange={inputChanged}
                                                        onFocus={inputFocus}
                                                        onBlur={inputBlur}
                                                    />
                                                    <label htmlFor="id_password" className={`${styles['placeLabel']} ${inputsFocus.password ? styles['focusLabel'] : ''}`} >
                                                        Senha
                                                    </label>
                                                </div>
                                                {
                                                    inputsFocus.password ? <i className={showPassword ? 'far fa-eye-slash' : 'far fa-eye'} onClick={(e: any) => {
                                                        toggleShowPassword(!showPassword)
                                                    }}></i> : null
                                                }
                                            </div>
                                        </div>
                                        <div className={`${styles['input-error']} ${inputErrors.password ? '' : styles['sr']}`}>
                                            <ErrorIcon className={styles['error-icon']} />
                                            <span>{inputErrors.password}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={styles['check-area']}>
                                            <label className={styles['checkbox']}>
                                                <span>Confirmo ter lido lido o texto de refêrencia de portifólio.</span>
                                                <input type="checkbox" onChange={(e: any) => (setConfirmRead(e.target.checked))} />
                                            </label>
                                            <div className={`${styles['input-error']} ${inputErrors.confirm ? '' : styles['sr']}`}>
                                                <ErrorIcon className={styles['error-icon']} />
                                                <span>{inputErrors.confirm}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['login-confirm']}>
                                    <button type='submit' disabled={loginLoading}>{
                                        loginLoading ? <div className={styles['align-loading']}>
                                            <Loading type={'spin'} color={'#FFFF'} height={'25px'} width={'25px'} />
                                        </div> : 'Entrar'
                                    }</button>
                                </div>
                            </form>
                            <div className={styles['informations-container']}>
                                <h5>Referência de portifólio:</h5>
                                <p>Este site não possui nenhuma relação com a <b>Netflix</b>, é apenas um <b>Clone</b> usado de portifólio e feito por <b>André Gosling Dias</b>.
                                    <br /> <b>Não coloque</b> seu login/senha original da Netflix. Você pode colocar <b>dados aleatórios</b>. Esta página é <b>apenas uma simulação</b>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export const Login = connect(state => ({ storage: state }))(LoginComponent)