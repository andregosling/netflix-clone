import React, { useState, useEffect } from 'react';

import styles from './main.module.scss'

import Logo from '../../assets/logo.png'

export const FirstHeader = (props: any) => {

    return (
        <header className={styles['page-header']} style={props.styles || {}}>
            <img src={Logo} alt='Application logo' />
        </header>
    )
}
