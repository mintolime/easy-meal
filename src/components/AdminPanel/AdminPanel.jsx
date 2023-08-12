import React, { useState } from "react";
import "./AdminPanel.css";
import { Tabs } from "antd";
import RecipeForm from "../RecipeForm/RecipeForm";
import RecipesList from "../RecipesList/RecipesList";

const AdminPanel = ({
  recipes,
  onCreateRecipe,
  onUpdateRecipe,
  onSetRecipe,
  onDeleteRecipe,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [updatingRecipe, setUpdatingRecipe] = useState({});

  const onChangeTab = (key) => {
    setActiveTab(key);
  };

  const items = [
    {
      key: "1",
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
      key: "2",
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
      key: "3",
      label: `Tab 3`,
      children: <Boobies />,
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

const Boobies = () => {
  return <h2>( • ) ( • )-----(≖_≖)</h2>;
};

export default AdminPanel;
