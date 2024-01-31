import React, { useState } from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { monthNames, weekDays } from '../../constants/dates'
import { typography } from '../../theme/fonts'
import { palette } from '../../theme'

const getMonthDays = (year: number, month: number) => {
    return new Date(year, month, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay()
}

const generateMonthDays = (year: number, month: number) => {
    const numDays = getMonthDays(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    return Array.from({ length: numDays + firstDay }, (_, i) => {
        return i >= firstDay ? new Date(year, month - 1, i - firstDay + 1) : null
    })
}

const isPastDate = (date: Date | null) => {
    if (!date) {
        return false // If date is null, it's not a past date
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset today's time to midnight for accurate comparison
    return date < today
}

type DatePickerProps = {
    selectedValue: Date | null | undefined
    onDateChange: (date: Date) => void
    openedDate: boolean
    setOpenedDate: (openedDate: boolean) => void
}

export const DatePickerAndTime: React.FC<DatePickerProps> = ({
    selectedValue,
    onDateChange,
    openedDate,
    setOpenedDate
}) => {
    const validSelectedValue = selectedValue instanceof Date ? selectedValue : new Date()
    // Validate that selectedValue is a Date object

    const currentYear = validSelectedValue.getFullYear()
    const currentMonth = validSelectedValue.getMonth() + 1
    const days = generateMonthDays(currentYear, currentMonth)

    const changeMonth = (increment: number) => {
        const newDate = new Date(currentYear, currentMonth - 1 + increment, 1)
        const newDays = generateMonthDays(newDate.getFullYear(), newDate.getMonth() + 1)
        const firstFutureDate = newDays.find((day) => day && !isPastDate(day))

        if (firstFutureDate) {
            onDateChange(firstFutureDate) // Set to the first available day in the new month
        } else {
            onDateChange(newDate) // Fallback in case no future dates are available
        }
    }

    const currentMonthName = monthNames[currentMonth - 1]

    React.useEffect(() => {
        // If the selected date is in the past or null, update it to the current date or the first available future date
        if (!selectedValue || isPastDate(validSelectedValue)) {
            const today = new Date()
            if (today.getMonth() + 1 === currentMonth && today.getFullYear() === currentYear) {
                onDateChange(today) // If current month and year, set today
            } else {
                const firstFutureDate = days.find((day) => day && !isPastDate(day))
                if (firstFutureDate) {
                    onDateChange(firstFutureDate) // If not, set to the first available day in the new month
                }
            }
        }
    }, [])

    return (
        <Modal animationType='slide' transparent={true} visible={openedDate}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            marginBottom: '1%'
                        }}
                    >
                        <TouchableOpacity
                            style={styles.circleX}
                            onPress={() => setOpenedDate(false)}
                        >
                            <Text style={styles.x}>X</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.monthNavigation}>
                        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navButton}>
                            <Text style={styles.navButtonText}>{'<'}</Text>
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontFamily: typography.primary
                            }}
                        >{`${currentMonthName} ${currentYear}`}</Text>
                        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navButton}>
                            <Text style={styles.navButtonText}>{'>'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.weekDaysView}>
                        {weekDays.map((dayName, index) => (
                            <Text key={index} style={styles.weekDay}>
                                {dayName}
                            </Text>
                        ))}
                    </View>
                    <View style={styles.calendarView}>
                        {days.map((day, index) => {
                            const isSelected =
                                day &&
                                day.toISOString().split('T')[0] ===
                                    validSelectedValue.toISOString().split('T')[0]
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dayButton,
                                        day && isPastDate(day) && styles.pastDay,
                                        isSelected && styles.selectedDay
                                    ]}
                                    onPress={() => {
                                        if (day && !isPastDate(day)) {
                                            onDateChange(day)
                                        }
                                    }}
                                    disabled={day ? isPastDate(day) : true}
                                >
                                    <Text style={day && isPastDate(day) ? styles.pastDayText : {}}>
                                        <Text
                                            style={{
                                                fontFamily: typography.primary
                                            }}
                                        >
                                            {day ? day.getDate() : ''}
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    <TouchableOpacity
                        onPress={() => setOpenedDate(false)}
                        style={styles.confirmButton}
                    >
                        <Text
                            style={{
                                fontFamily: typography.primary,
                                fontSize: 16
                            }}
                        >
                            Confirm
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    confirmButton: {
        backgroundColor: palette.pastelLightGreen,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: '2%',
        marginTop: '2%'
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 4,
        marginBottom: 10
    },
    x: {
        fontFamily: typography.primary,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    circleX: {
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: palette.pastelLightGreen,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: 'white',
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: '5%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    pastDay: {
        backgroundColor: '#E0E0E0'
    },
    pastDayText: {
        color: '#A0A0A0'
    },
    monthNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        marginBottom: 20
    },
    dayButton: {
        width: '14.28%', // 100% / 7 days
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },
    calendarView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },
    weekDaysView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: '2%',
        backgroundColor: palette.pastelLightGreen,
        borderRadius: 5,
        marginBottom: '2%'
    },
    weekDay: {
        width: '14.28%',
        textAlign: 'center',
        fontFamily: typography.primary
    },
    navButton: {
        backgroundColor: palette.pastelLightGreen,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40
    },
    navButtonText: {
        fontSize: 16,
        fontFamily: typography.primary,
        fontWeight: 'bold',
        color: '#333333' // Choose color that matches your theme
    },
    selectedDay: {
        backgroundColor: palette.pastelLightGreen, // Light pastel green color
        borderRadius: 100 // To create a bubble-like shape
    }
})
