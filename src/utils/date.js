function convertHour12h (hours) {
  let hora12H = hours % 12
  const amPm = hours >= 12 ? 'pm' : 'am'

  if (hora12H === 0) {
    hora12H = 12
  }

  return `${hora12H} ${amPm}`
}

export { convertHour12h }
