import { Image, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import serviceImage from '@/assets/images/service-img.webp';
import config from '@/config';
import { CartServiceInfo } from '@/pages/Customer/Cart/Cart.styled';

import { OrderItemType } from './Checkout.type';
import * as St from './Checkout.styled';

const { Text } = Typography;

const CheckoutColumn = () => {
    const columns: ColumnsType<OrderItemType> = [
        {
            title: 'Service',
            render: (record: OrderItemType) => (
                <CartServiceInfo to={`${config.routes.public.shop}/${record.service.serviceId}`}>
                    <Image
                        src={record.service.image || serviceImage}
                        alt={record.service.titleName}
                        preview={false}
                    />
                    <Text>{record.service.titleName}</Text>
                </CartServiceInfo>
            ),
        },
        {
            title: 'Variant',
            render: (record: OrderItemType) => (
                <St.CheckoutVariantName>{record.periodName}</St.CheckoutVariantName>
            ),
        },
        {
            title: 'Price',
            render: (record: OrderItemType) => (
                <St.CheckoutServicePrice>
                    {record.finalPrice.toLocaleString()}đ
                </St.CheckoutServicePrice>
            ),
        },
        {
            title: 'Quantity',
            render: (record: OrderItemType) => (
                <St.CheckoutServiceQuantity>{record.quantity}</St.CheckoutServiceQuantity>
            ),
        },
        {
            title: 'Total',
            render: (record: OrderItemType) => (
                <St.CheckoutServicePrice>
                    {(record.finalPrice * record.quantity).toLocaleString()}đ
                </St.CheckoutServicePrice>
            ),
        },
    ];

    return columns;
};

export default CheckoutColumn;
