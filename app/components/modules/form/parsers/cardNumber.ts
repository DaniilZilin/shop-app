const cardNumber = (value: string) => {
  if (!value) {
      return value
  }
  const onlyCardNumber = value.replace(/[^\d]/g, '')

  return `${onlyCardNumber.slice(0, 4)} ${onlyCardNumber.slice(4, 8)} ${onlyCardNumber.slice(8, 12)} ${onlyCardNumber.slice(12, 16)}`.trim()
}

export default cardNumber