export default function LimitText({ longText }) {
  if (longText.length >= 200) {
    return longText.substring(0, 200) + '...'
  }
  return longText
}
