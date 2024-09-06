import { Flex, Typography } from 'antd';
import React from 'react';

const CoinInfo = ({coin}) => {
    return (
        <Flex align={'center'}>
            <img src={coin.icon} alt={coin.name} style={{width: 40, marginRight: 10}}/>
            <Typography.Title level={2} style={{margin: '0', display: 'flex', columnGap: '5px'}}>
                <div>{coin.name}</div>
                <div>({coin.symbol})</div>
            </Typography.Title>
        </Flex>
    );
};

export default CoinInfo;