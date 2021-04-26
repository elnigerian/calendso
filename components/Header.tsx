import * as React from 'react';
import Head from 'next/head';

type HeaderProps = {
    title?: string;
    options?: any;
}

const Header: React.FunctionComponent<HeaderProps> = ({title = 'Schedularly', options = {}}) => {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}

export default Header;
