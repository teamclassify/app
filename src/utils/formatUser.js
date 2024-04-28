export const formatUsername = (username) => {
  return username.toLowerCase().split(' ').join('-')
}

export const formatEmail = (email) => {
  return email
    .toLowerCase()
    .slice(0, email.indexOf('@'))
    .split('')
    .filter((char) => char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122)
    .join('')
}
