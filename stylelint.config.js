/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard-scss", // Базовая конфигурация для SCSS
    "stylelint-config-recess-order", // Порядок свойств
  ],
  plugins: [
    "stylelint-order", // Плагин для порядка свойств
    "stylelint-scss", // Плагин для SCSS
  ],
  rules: {
    // Общие правила
    "color-no-invalid-hex": true, // Запрет невалидных HEX-цветов
    "block-no-empty": true, // Запрет пустых блоков
    "no-duplicate-selectors": true, // Запрет дублирования селекторов
    "no-extra-semicolons": true, // Запрет лишних точек с запятой
    "no-invalid-double-slash-comments": true, // Запрет невалидных комментариев //

    // SCSS-специфичные правила
    "scss/at-rule-no-unknown": true, // Запрет неизвестных @-правил
    "scss/at-import-partial-extension-blacklist": ["scss"], // Запрет указания расширения .scss в @import

    // Порядок свойств
    "order/order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      "rules",
      "at-rules",
    ],
    "order/properties-order": [
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "display",
      "flex-direction",
      "justify-content",
      "align-items",
      "width",
      "height",
      "margin",
      "padding",
      "color",
      "background",
      "border",
      "box-shadow",
      "font-size",
    ],
  },
  ignoreFiles: ["**/node_modules/**", "**/dist/**", "**/vendor/**"], // Игнорируемые файлы
};