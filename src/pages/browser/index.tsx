import React, { useState, useEffect } from 'react';

import styles from './main.module.scss'

import { connect } from 'react-redux'

import { FirstHeader } from '../../components/first-header';

import axios from 'axios';

import { Loading } from '../../components/loading';

type userObject = {
    name: string,
    image: string
}

const Component = ({ isLogged, dispatch, navigate }: any) => {
    // if (!isLogged)
    //     navigate('/login')

    const [moment, setMoment] = useState('');
    const [usersData, setUData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let str = '';

        const hours = new Date().getHours();

        if (hours >= 0 && hours < 6) {
            str = 'madrugada';
        } else if (hours >= 6 && hours < 12) {
            str = 'manhã';
        } else if (hours >= 12 && hours < 18) {
            str = 'tarde';
        } else if (hours >= 18 && hours < 24) {
            str = 'noite';
        }

        setMoment(str);

        axios.get('profiles.json').then((res: any) => {
            setUData(res.data.profiles);
            setLoading(false);
        })
    }, [])

    const selectProfile = (profile: number) => {
        dispatch({
            type: 'selectProfile',
            profile: profile
        });
        navigate('/home');
    }

    return (
        <>
            <FirstHeader styles={{ position: 'absolute' }} />
            <main className={styles['main-bg']}>
                <div className={styles['users-container']}>
                    <div>
                        <div className={styles['container-header']}>
                            <h1 className={styles['copy-selectUser']}>Quem terá a {moment} mais divertida?</h1>
                        </div>
                        <div className={styles['list-users']}>
                            {
                                loading ? <Loading type={'spin'} height={60} width={60} /> : <>
                                    <div className={styles['profiles-group']}>
                                        {
                                            usersData.map((v: userObject, k: number) => (
                                                <div className={styles['profiles-item']} onClick={() => selectProfile(k)}>
                                                    <img src={`${window.location.origin}/assets/${v.image}`} alt="" />
                                                    <p>{v.name}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export const Browser = connect((state: any) => ({ isLogged: state.isLogged }))(Component)