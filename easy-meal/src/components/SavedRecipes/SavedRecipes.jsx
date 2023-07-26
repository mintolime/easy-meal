/* eslint-disable react/prop-types */
import Button from '../Button/Button';
import { message, Popconfirm } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import './SavedRecipes.css';

const SavedRecipes = ({ likedRecipes, onDeleteRecipe, onSetRecipe }) => {
  // console.log(likedRecipes);

  const confirm = (id) => {
    onDeleteRecipe(id);
    message.success('На одну вкусняшку стало меньше');
  };

  // const cancel = (e) => {
  //   console.log(e);
  //   message.error('Click on No');
  // };

  return (
    <div className="saved-recipes">
      {likedRecipes.length === 0 ? (
        <p>Здесь будут храниться все понравившиеся вам рецепты </p>
      ) : (
        ''
      )}
      <ul className="saved-recipes__container">
        {likedRecipes.map((recipe) => {
          return (
            <li
              key={recipe._id}
              className="saved-recipes__card recipe__box-shabow"
            >
              <img
                className="saved-recipes__card-image"
                onClick={() => onSetRecipe(recipe)}
                src={recipe.imageLink}
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
                <Popconfirm
                  // title="Delete the task"
                  placement="left"
                  description="Удалить рецепт?"
                  onConfirm={() => confirm(recipe._id)}
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

export default SavedRecipes;
