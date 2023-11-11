import { Modal, TablePaginationConfig, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useEffect, useRef, useState } from 'react';

import { useDocumentTitle } from '@/hooks';
import { CustomerParams, banAccount, getCustomerTable } from '@/utils/dashboardAPI';
import { OrderBy } from '@/utils/enums';

import CustomerColumns from './ManageCustomer.columns';
import { ManageCustomerTable } from './ManageCustomer.styled';
import { CustomerColumnType } from './ManageCustomer.type';

type CustomerType = {
    data: CustomerColumnType[];
    totalPage: number;
};

const ManageCustomer = () => {
    useDocumentTitle('Quản Lý Khách Hàng | HouseMate');

    // Show toast
    const [api, contextHolderNotification] = notification.useNotification({
        top: 100,
    });
    const [modal, contextHolderModal] = Modal.useModal();

    // Params for search, filter, pagination, sort
    const [tableParams, setTableParams] = useState<CustomerParams>({
        searchCustomerName: '',
    });
    const currentPage = useRef<number>(1);
    const [customer, setCustomer] = useState<CustomerType>({
        data: [],
        totalPage: 0,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const { data } = await getCustomerTable(
                    {
                        size: 5,
                        page: currentPage.current,
                    },
                    tableParams,
                );

                setCustomer(data);
            } catch (error: any) {
                api.error({
                    message: 'Lỗi',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [reload]);

    const confirm = (userId: number) => {
        modal.confirm({
            centered: true,
            title: 'Bạn có muốn cấm tài khoản người dùng này?',
            icon: <ExclamationCircleOutlined />,
            content:
                'Tài khoản người dùng sau khi bị xóa sẽ bị ẩn khỏi hệ thống và ngưng các hoạt động.',
            okText: 'Quay lại',
            onCancel: () => handleDeleteCustomer(userId),
            cancelText: 'Xác nhận',
        });
    };

    const handleTableChange = (
        pagination: TablePaginationConfig,
        _: Record<string, FilterValue | null>,
        sorter: SorterResult<CustomerColumnType> | SorterResult<CustomerColumnType>[],
    ) => {
        const { columnKey, order } = sorter as SorterResult<CustomerColumnType>;

        currentPage.current = pagination.current as number;

        if (sorter) {
            setTableParams({
                searchCustomerName: tableParams.searchCustomerName,
                [columnKey as string]:
                    order === 'ascend'
                        ? OrderBy.ASC
                        : order === 'descend'
                        ? OrderBy.DESC
                        : OrderBy.NONE,
            });
        }

        setReload(!reload);
    };

    const handleDeleteCustomer = async (userId: number) => {
        try {
            setLoading(true);

            await banAccount(userId);

            api.success({
                message: 'Thành công',
                description: 'Cấm tài khoản người dùng thành công.',
            });

            setReload(!reload);
        } catch (error: any) {
            api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSearchCustomer = (selectedKeys: string[]) => {
        const data = selectedKeys.toString().trim();

        setTableParams({
            ...tableParams,
            searchCustomerName: data,
        });
        setReload(!reload);
    };

    return (
        <>
            {contextHolderNotification}

            <ManageCustomerTable
                loading={loading}
                columns={CustomerColumns(confirm, handleSearchCustomer, false)}
                dataSource={customer.data.map((item) => ({ ...item, key: item.userId }))}
                pagination={{
                    current: currentPage.current,
                    pageSize: 5,
                    total: customer.totalPage * 5,
                    hideOnSinglePage: true,
                }}
                scroll={{ x: 800 }}
                onChange={handleTableChange}
            />

            {contextHolderModal}
        </>
    );
};

export default ManageCustomer;
