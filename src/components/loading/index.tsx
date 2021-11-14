import React from 'react';
import styles from './main.module.scss'

import LoadingElement from 'react-loading'

export const Loading = (props: any) => {
    return (
        <div className={styles['align-loading']}>
            <LoadingElement type={'spin'} color={'#FFFF'} height={'75px'} width={'75px'} {...props} />
        </div>
    );
}

