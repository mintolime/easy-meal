/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss',
  ],
  rules: {
    // Отключаем стандартное правило для медиазапросов
    'media-feature-range-notation': null, // или 'context', если хотим явно разрешить такой синтаксис
    
    // Разрешаем @include (отключаем проверку неизвестных at-правил для SCSS)
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['include', 'mixin', 'content', 'use', 'forward', 'if', 'else', 'each', 'for', 'while'],
      },
    ],

    // Другие важные правила
    'selector-class-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$', // kebab-case
    'declaration-block-no-duplicate-properties': true,
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'display',
      'flex-direction',
      'justify-content',
      'align-items',
      'width',
      'height',
      'margin',
      'padding',
      'color',
      'background',
      'border',
      'box-shadow',
      'font-size',
    ],
  },
  ignoreFiles: ['**/node_modules/**', '**/dist/**'],
};