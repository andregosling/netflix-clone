import React, { useState, useEffect } from 'react';
import styles from './main.module.scss'

import { connect } from 'react-redux'

const Component = ({ isLogged, profile, dispatch, navigate }: any) => { 

    // if (!isLogged)
    //     navigate('/login')

    if (!profile)
        navigate('/browse')

    return (
        <main>
            <div>

            </div>
        </main>
    )
}

export const Home = connect((state: any) => ({ isLogged: state.isLogged, profile: state.profile }))(Component)

// export default 