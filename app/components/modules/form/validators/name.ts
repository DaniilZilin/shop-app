const nameRegex = new RegExp(/\d|[+/]/g)

const name = (value: string) => (nameRegex.test(value) ? 'Есть недопустимые символы' : undefined)

export default name