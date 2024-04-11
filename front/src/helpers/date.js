const getDate = (date) => {
    const dateFormat = new Date(date)
    const day = dateFormat.getDate()
    const month = (dateFormat.getMonth() + 1).toString().padStart(2, '0')
    const year = dateFormat.getFullYear()
    const hours = dateFormat.getHours().toString().padStart(2, '0') + ':'
    const minutes = dateFormat.getMinutes().toString().padStart(2, '0')
    return day + '/' + month + '/' + year + ' à ' + hours + minutes
} 

export default getDate