import moment from 'moment'

const expirationDateValidator = (value: string) => (((moment(value, 'MM/YY').isAfter(moment()) && value.length === 5)) ? undefined : 'Неверная дата')

export default expirationDateValidator