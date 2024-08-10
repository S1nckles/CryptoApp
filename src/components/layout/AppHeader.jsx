import { Button, Drawer, Layout, Modal, Select, Space } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import CryptoContext from '../../context/CryptoContext';
import { AddAssetForm } from '../AddAssetForm';
import { CoinInfoModal } from '../CoinInfoModal';

const headerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
    color: '#000000',
    backgroundColor: 'rgb(0 21 41)',
    height: 60,
    alignItems: 'center',
    paddingInline: 48,
    lineHeight: '64px',
};

const labelRender = (props) => {
    const { label, value } = props;
    if (label) return value;
    return <span>{value}</span>;
};

export const AppHeader = () => {
    const [select, setSelect] = useState(false);
    const [modal, setModal] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [coin, setCoin] = useState(null);
    const {crypto} = useContext(CryptoContext);

    useEffect(() => {
        const keypress = (e) => {
            if (e.key === '/') {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress);
    }, [])

    const handleSelect = (value) => {
        setCoin(crypto.find(c => c.id === value))
        setModal(true);
    }

    return <Layout.Header style={headerStyle}>
            <Select
            style={{
              width: '20%',
            }}
            open={select}
            onSelect={handleSelect}
            onClick={() => setSelect((prev) => !prev)}
            labelRender={labelRender}
            value="press / to open"
            options={crypto.map((coin) => ({
                label: coin.name,
                value: coin.id,
                icon: coin.icon,
            }))}
            optionRender={(option) => (
                <Space>
                    <img style={{width: 20}} src={option.data.icon} alt={option.data.label} /> {' '} 
                    {option.data.label}
                </Space>
            )}
        />

        <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>
                
        <Modal title="Coin" open={modal} onOk={() => setModal(false)} onCancel={() => setModal(false)}>
            <CoinInfoModal coin={coin} />
        </Modal>

        <Drawer width={600} title="Assets" onClose={() => setDrawer(false)} open={drawer}>
            <AddAssetForm />        
        </Drawer>
    </Layout.Header>
};
