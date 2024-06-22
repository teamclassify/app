function convertHour12h (hours) {
  let hora12H = hours % 12
  const amPm = hours >= 12 ? 'pm' : 'am'

  if (hora12H === 0) {
    hora12H = 12
  }

  return `${hora12H} ${amPm}`
}

function isMayorDate (fecha1, fecha2) {
  const fecha1Milisegundos = fecha1.getTime()
  const fecha2Milisegundos = fecha2.getTime()

  return fecha1Milisegundos >= fecha2Milisegundos
}

export { convertHour12h, isMayorDate }
