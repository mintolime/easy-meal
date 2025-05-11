import { Tabs } from 'antd';
import { useState } from 'react';
import RecipeForm from '../RecipeForm/RecipeForm';
import RecipesList from '../RecipesList/RecipesList';
import Users from '../admin/Users/Users';
import './AdminPanel.scss';

const AdminPanel = ({ recipes, usersAll, onCreateRecipe, onUpdateRecipe, onSetRecipe, onDeleteRecipe }) => {
    const [activeTab, setActiveTab] = useState('1');
    const [updatingRecipe, setUpdatingRecipe] = useState({});

    const onChangeTab = (key) => {
        setActiveTab(key);
    };

    const items = [
        {
            key: '1',
            label: `Все рецепты (${recipes.length})`,
            children: (
                <RecipesList
                    recipes={recipes}
                    onSetRecipe={onSetRecipe}
                    onDeleteRecipe={onDeleteRecipe}
                    onChangeTab={onChangeTab}
                    onSetUpdatingRecipe={setUpdatingRecipe}
                />
            ),
        },
        {
            key: '2',
            label: `Новый рецепт`,
            children: (
                <RecipeForm
                    onCreateRecipe={onCreateRecipe}
                    onUpdateRecipe={onUpdateRecipe}
                    updatingRecipe={updatingRecipe}
                    onSetUpdatingRecipe={setUpdatingRecipe}
                />
            ),
        },
        {
            key: '3',
            label: `Пользователи`,
            children: <Users users={usersAll} />,
        },
    ];

    return (
        <section className="admin">
            <Tabs
                // defaultActiveKey="1"
                activeKey={activeTab}
                items={items}
                onChange={onChangeTab}
            />
        </section>
    );
};

export default AdminPanel;
