import { Layout } from 'antd';
import React from 'react';

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 60,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#313131',
};

export const AppHeader = () => {
    return <Layout.Header style={headerStyle}>Header</Layout.Header>
};
