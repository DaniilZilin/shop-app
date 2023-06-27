import moment from 'moment'

const expDate = (value: string) => (((moment(value, 'MM/YY').isAfter(moment()) && value.length === 5)) ? undefined : 'Неверная дата')

export default expDate