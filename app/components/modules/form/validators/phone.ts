const phoneRegEx = new RegExp(/[_]/g)

const phone = (value: string) => (phoneRegEx.test(value) ? undefined : '123123')

export default phone