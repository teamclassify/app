function convertDateRoom (date, day, startHour, endHour) {
  const currentDate = new Date(date)
  const currentDay = date.getDay()

  let daysToSum = 0

  // TODO: Refactoring this

  switch (day.toLowerCase()) {
    case 'lunes':
      daysToSum = 1 - currentDay
      break
    case 'martes':
      daysToSum = 2 - currentDay
      break
    case 'miercoles':
      daysToSum = 3 - currentDay
      break
    case 'jueves':
      daysToSum = 4 - currentDay
      break
    case 'viernes':
      daysToSum = 5 - currentDay
      break
    case 'sabado':
      daysToSum = 6 - currentDay
      break
    case 'domingo':
      daysToSum = 7 - currentDay
      break
  }

  currentDate.setDate(currentDate.getDate() + daysToSum)

  currentDate.setHours(startHour, 0, 0, 0)
  const endDate = new Date(currentDate)
  endDate.setHours(endHour, 0, 0, 0)

  return { start: currentDate, end: endDate }
}

export { convertDateRoom }
