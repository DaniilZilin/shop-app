const emailRegEx = new RegExp('^.+@.+$')

const email = (value: string) => (emailRegEx.test(value) ? undefined : 'Неверный адрес электронной почты')

export default email