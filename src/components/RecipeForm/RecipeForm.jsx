import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import React from 'react';
import { layout, validateMessages } from '../../utils/configAntDesign';

const RecipeForm = ({ onCreateRecipe, updatingRecipe, onUpdateRecipe, onSetUpdatingRecipe }) => {
    const [form] = Form.useForm();

    React.useEffect(() => {
        if (!updatingRecipe) {
            return;
        } else {
            form.setFieldsValue(updatingRecipe);
        }
    }, [updatingRecipe]);

    const onFinish = (values) => {
        if (updatingRecipe._id !== undefined) {
            onUpdateRecipe(updatingRecipe._id, values);
            onSetUpdatingRecipe({});
        } else {
            onCreateRecipe(values);
        }
        form.resetFields();

        console.log(values);
    };

    return (
        <Form
            form={form}
            className="form"
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            validateMessages={validateMessages}
        >
            <h2 className="form__title">{updatingRecipe._id ? 'Редактировать рецепт' : 'Создать рецепт'}</h2>

            <Form.Item name="mealAuthor" label="Автор">
                <Input />
            </Form.Item>

            <Form.Item name="mealName" label="Блюдо" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="mealCategory" label="Категория">
                {/* <Input /> */}
                <Select>
                    <Select.Option value="Салат">Салат</Select.Option>
                    <Select.Option value="Выпечка">Выпечка</Select.Option>
                    <Select.Option value="Закуски">Закуски</Select.Option>
                    <Select.Option value="Паста и крупы">Паста и крупы</Select.Option>
                    <Select.Option value="Мясо и птица">Мясо и птица</Select.Option>
                    <Select.Option value="Супы">Супы</Select.Option>
                    <Select.Option value="Напитки">Напитки</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="mealSourceUrl"
                label="Ссылка на источник"
                rules={[{ type: 'url' }, { type: 'string', min: 6 }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="imageUrl"
                label="Ссылка на изображение"
                rules={[
                    {
                        required: true,
                    },
                    { type: 'url' },
                    { type: 'string', min: 6 },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="youtubeUrl" label="Ссылка на видео" rules={[{ type: 'url' }, { type: 'string', min: 6 }]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="instructions"
                label="Способ приготовления"
                rules={[
                    {
                        required: true,
                        message: 'Это поле пропущено',
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item name="ingredients" label="Ингредиенты" rules={[{ required: true }]}>
                <Form.List name="ingredients">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                    }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'ingredient']}
                                        // name='Продукт'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Это поле пропущено',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Продукт" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'measure']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Это поле пропущено',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Граммовка" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Добавить ингредиент
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>

                <Button
                    htmlType="button"
                    onClick={() => {
                        form.resetFields();
                        onSetUpdatingRecipe({});
                    }}
                >
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RecipeForm;
