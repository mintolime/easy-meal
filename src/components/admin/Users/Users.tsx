import { Descriptions } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { formatDate } from '../../../utils/functions';
import './Users.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
    className?: string;
};
const Users = ({ ...props }: Props) => {
    return (
        <div className={classNames('users', props.className)}>
            <Descriptions className="users__description" title="test@example.com">
                <Descriptions.Item label="email">test@example.com</Descriptions.Item>
                <Descriptions.Item label="createData">{formatDate('2025-04-08T17:11:34.302Z')}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};
export default Users;
