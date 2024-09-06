import { Button, Divider, Flex, Form, InputNumber, Select, Space, DatePicker, Result} from 'antd';
import React, { useContext, useRef, useState } from 'react';
import CryptoContext from '../context/CryptoContext';
import { Typography } from 'antd';
import CoinInfo from './CoinInfo';

export const AddAssetForm = ({onClose}) => {
    const [form] = Form.useForm()
    const {crypto, addAsset} = useContext(CryptoContext);
    const [coin, setCoin] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const assetRef = useRef();

    if (submitted) {
        return(
            <Result
                status="success"
                title="New Asset Added!"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                <Button type="primary" key="console" onClick={onClose}>
                    OK
                </Button>
                ]}
            />
        )
    }

    if (!coin) {
        return (
            <Select
            style={{width: '100%'}}
            onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
            value="Select Coin"
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
        )
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            number: '${label} is not valid number',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    function onFinish(values) {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date()
        }
        assetRef.current = newAsset;
        setSubmitted(true);
        addAsset(newAsset);
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue('price');
        form.setFieldsValue({
            total: +(value *price).toFixed(2)
        })
    }
    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount');
        form.setFieldsValue({
            total: +(value * amount).toFixed(2)
        })
    }

    return  (
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: '100%', textAlign: 'left' }}
            initialValues={{
                price: +coin.price.toFixed(2),
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        > 
            <CoinInfo coin={coin} />
            <Divider />
                <Form.Item name="amount" label={<b>Set Amount</b>} 
                rules={[{ 
                    required: true,
                    type: 'number',
                    min: 0,
                }]}>
                    <InputNumber style={{width: '100%'}} placeholder='Write count Amount' onChange={handleAmountChange}/>
                </Form.Item>
                <Form.Item name="price" label={<b>Price</b>}>
                    <InputNumber style={{width: '100%'}} onChange={handlePriceChange}/>
                </Form.Item>
                <Form.Item name="data" label={<b>Data & Time</b>}>
                    <DatePicker style={{width: '100%'}} showTime/>
                </Form.Item>
                <Form.Item name="total" label={<b>Total</b>}>
                    <InputNumber style={{width: '100%'}} disabled/>
                </Form.Item>
                <Button type="primary" htmlType="submit">Add Asset</Button>
        </Form>
    );
};