export default function divisibleByFive(num: number) {
  const numString = num.toString();
  const lastDigit = Number(numString[numString.length - 1]);

  const difference = 10 - lastDigit;

  if (difference > 5) {
    return num + 5 - lastDigit;
  }
  if (difference < 5) {
    return num + 10 - lastDigit;
  }
  return num;
}
