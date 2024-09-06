import { Card, Layout, List, Statistic, Tag, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

import { UpperWord } from '../../utils';
import { useContext } from 'react';
import CryptoContext from '../../context/CryptoContext';

const siderStyle = {
    padding: '1rem'
};


export const AppSider = () => {
    
    const {loading, assets} = useContext(CryptoContext)
    
    return <Layout.Sider width="25%" style={siderStyle}>
        {assets.map((asset) => {
            return <Card key={assets.id} style={{ marginBottom: '1rem'}}>    
                <Statistic
                title={UpperWord(asset.id)}
                value={asset.totalAmount}
                precision={2}
                valueStyle={{
                    color: assets.grow ? 'green' : 'red'
                }}
                prefix={ assets.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                suffix="$"
                />
                <List
                size="small"
                dataSource={[
                    {title: 'Total Profit', value: asset.totalProfit, withTag: true},
                    {title: 'Asset Amount', value: asset.amount, isPlain: true},
                    // {title: 'Difference', value: asset.growPrecent},
                ]}
                renderItem={(item) => (
                    <List.Item>
                        <span>{item.title}</span>
                        <span>
                            {item.withTag && <Tag color={asset.grow ? "green" : "red"}>{asset.growPrecent}%</Tag>}
                            {item.isPlain && item.value}
                            {!item.isPlain && (
                                <Typography.Text type={asset.grow ? "success" : "danger"}> {item.value.toFixed(2)}$ </Typography.Text>
                            )}
                        </span>
                    </List.Item>
                )}
                />
            </Card>
        })}
    </Layout.Sider>
}