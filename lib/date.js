import { parseISO, format } from "date-fns"
//import { th } from "date-fns/locale"

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  const showDate = (
    <time dateTime={dateString}>
      {format(date, "eeee d LLLL yyyy, HH:mm:ss")}
    </time>
  )
  return showDate
}
