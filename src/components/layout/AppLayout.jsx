import { Layout, Spin } from 'antd';
import React, { useContext } from 'react';
import CryptoContext from '../../context/CryptoContext';
import { AppContent } from './AppContent';
import { AppHeader } from './AppHeader';
import { AppSider } from './AppSider';

export const AppLayout = () => {
    const {loading} = useContext(CryptoContext);
    if (loading) return <Spin fullscreen />
    return (
        <Layout>
            <AppHeader />
            <Layout>
              <AppSider />
              <AppContent />
            </Layout>
        </Layout>
    );
};