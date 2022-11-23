/**
 * Форматирование разрядов числа
 */
export default function numberFormat(value: number, options = {}) {
  return new Intl.NumberFormat("ru-RU", options).format(value);
}
