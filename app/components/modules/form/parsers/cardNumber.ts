const cardNumber = (value: string) => {
  if (!value) {
      return value
  }
  const onlyCardNumber = value.replace(/^\d/g, '')

  return `${onlyCardNumber.slice(0, 16)}`.trim()
}

export default cardNumber