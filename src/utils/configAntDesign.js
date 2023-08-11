export const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
export const validateMessages = {
  required: '${label} обязательно к заполнению!',
  // types: {
  //   email: '${label} is not a valid email!',
  //   number: '${label} is not a valid number!',
  // },
  number: {
    range: '${label} символов не должно быть меньше ${min}',
  },
};
