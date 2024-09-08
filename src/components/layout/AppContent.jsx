import React, { useContext } from 'react';
import { Layout, Typography } from 'antd';
import CryptoContext from '../../context/CryptoContext';
import { PortfolioChart } from './PortfolioChart';
import { AssetsTabel } from './AssetsTabel';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: 'white',
    backgroundColor: '#001529',
};

export const AppContent = () => {
    const {assets, crypto} = useContext(CryptoContext);

    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price;
        return acc;
    }, {})

    return <Layout.Content style={contentStyle}>
        <Typography.Title level={3} style={{color: 'white', textAlign: 'left'}}>
            Portfolio: {''} 
            {assets
            .map(asset => asset.amount * cryptoPriceMap[asset.id])
            .reduce((acc, v) => (acc += v), 0)
            .toFixed(2)}$ 
        </Typography.Title>
        <PortfolioChart />
        <AssetsTabel />
    </Layout.Content>
};