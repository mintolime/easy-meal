import { Descriptions } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { formatDate } from '../../../utils/functions';
import './Users.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
    className?: string;
    users: Array<{
        _id: string;
        createData: string;
        email: string;
        isAdmin: boolean;
    }>;
};
const Users = ({ users, ...props }: Props) => {
  
    return (
        <div className={classNames('users', props.className)}>
            <h2 className="users__title">Пользователи</h2>

            {users.map((user, index) => (
                <Descriptions key={index} className="users__description" title={user.email}>
                    <Descriptions.Item label="id">{user._id}</Descriptions.Item>
                    <Descriptions.Item label="email">{user.email}</Descriptions.Item>
                    <Descriptions.Item label="createData">{formatDate(user.createData)}</Descriptions.Item>
                </Descriptions>
            ))}
        </div>
    );
};
export default Users;
