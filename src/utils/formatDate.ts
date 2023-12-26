export const formatDate = () => {
    const days = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = [
        'Jan.',
        'Feb.',
        'Mar.',
        'Apr.',
        'May',
        'June',
        'July',
        'Aug.',
        'Sep.',
        'Oct.',
        'Nov.',
        'Dec.'
    ]

    const date = new Date()
    const dayName = days[date.getDay()]
    const monthName = months[date.getMonth()]
    const dayNumber = date.getDate()

    return `${dayName}, ${monthName} ${dayNumber}`
}
