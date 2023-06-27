const expirationDate = (value: string) => {
  if (!value) {
    return value
  }

  const expirationDate = value.replace(/[^\d]/g, '')

  if (value.length < 3) {
    return `${expirationDate.slice(0,2)}`
  } else {
    return `${expirationDate.slice(0, 2)}/${expirationDate.slice(2, 4)}`.trim()
  }
}

export default expirationDate