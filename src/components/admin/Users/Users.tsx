import { Descriptions, DescriptionsProps } from 'antd';
import classNames from 'classnames';
import './Users.scss';
import React from 'react';

type Props = React.HTMLAttributes<HTMLElement> & {};
const Users = ({ ...props }: Props) => {
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'UserName',
            children: <p>Zhou Maomao</p>,
        },
        {
            key: '2',
            label: 'Telephone',
            children: <p>1810000000</p>,
        },
        {
            key: '3',
            label: 'Live',
            children: <p>Hangzhou, Zhejiang</p>,
        },
        {
            key: '4',
            label: 'Remark',
            children: <p>empty</p>,
        },
        {
            key: '5',
            label: 'Address',
            children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
        },
    ];

    return (
        <div className={classNames('users', props.className)}>
            <Descriptions title="User Info" items={items} />;
            <Descriptions title="User Info">
                <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                <Descriptions.Item label="Remark">empty</Descriptions.Item>
                <Descriptions.Item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
            </Descriptions>
            ;
        </div>
    );
};
export default Users;
