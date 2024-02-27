export default function LimitText({ longText, limit = 200 }) {
  if (longText.length >= limit) {
    return longText.substring(0, limit) + "..."
  }
  return longText
}
