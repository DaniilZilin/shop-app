const emailRegEx = new RegExp('^.+@.+$')

const email = (value: string) => (emailRegEx.test(value))

export default email