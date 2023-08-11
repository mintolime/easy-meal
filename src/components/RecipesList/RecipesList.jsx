import Button from '../Button/Button';
import { message, Popconfirm, Button as AntButton } from 'antd';
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';

import './RecipesList.css';
import { useNavigate, useLocation } from 'react-router-dom';

const RecipesList = ({
  recipes,
  onDeleteRecipe,
  onSetRecipe,
  onChangeTab,
  onSetUpdatingRecipe
}) => {
  // console.log(recipes);
  const navigate = useNavigate();
  const location = useLocation();

  const confirm = (recipe) => {
    onDeleteRecipe(recipe);
    message.success('На одну вкусняшку стало меньше');
  };

  return (
    <div className="saved-recipes">
      {recipes.length === 0 ? (
        <div className="saved-recipes__start-container">
          <p>Здесь будут храниться все понравившиеся вам рецепты </p>

          <AntButton
            style={{ maxWidth: '146px', margin: '0 auto' }}
            size="large"
            onClick={() => navigate('/recipe')}
          >
            За вкусняшкой!
          </AntButton>
        </div>
      ) : (
        ''
      )}
      <ul className="saved-recipes__container">
        {recipes.map((recipe) => {
          return (
            <li
              key={recipe._id}
              className="saved-recipes__card recipe__box-shabow"
            >
              <img
                className="saved-recipes__card-image"
                onClick={() => onSetRecipe(recipe)}
                src={recipe.imageLink || recipe.imageUrl}
                alt={recipe.mealName}
              />
              <h2
                className="saved-recipes__card-title"
                onClick={() => onSetRecipe(recipe)}
              >
                {recipe.mealName}
              </h2>
              <p className="saved-recipes__card-category">
                {recipe.mealCategory}
              </p>

              <div className="saved-recipes__card-trash">
                {location.pathname === '/admin' && (
                  <Button
                    btnText={
                      <EditOutlined
                        style={{
                          fontSize: '20px',
                          color: 'green',
                          marginRight: '12px'
                        }}
                      />
                    }
                    onClick={() => {
                      onChangeTab('2');
                      onSetUpdatingRecipe(recipe);
                    }}
                  />
                )}

                <Popconfirm
                  // title="Delete the task"
                  placement="left"
                  description="Удалить рецепт?"
                  onConfirm={() => confirm(recipe)}
                  // onCancel={cancel}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button
                    btnText={
                      <DeleteTwoTone
                        twoToneColor="crimson"
                        style={{ fontSize: '20px' }}
                      />
                    }
                  />
                </Popconfirm>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecipesList;
