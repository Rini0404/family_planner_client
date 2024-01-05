import React, { useState, useRef } from 'react'
import { Animated } from 'react-native'
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import BackArrow from '../BackArrow'
import { typography } from '../../theme/fonts'
import { palette } from '../../theme'

type TimePickerProps = {
    selectedValue: Date | null | undefined
    onTimeChange: (newTime: Date) => void
    openedTime: boolean
    setOpenedTime: (openedTime: boolean) => void
    dateChose: Date | null | undefined
}

export const TimePicker: React.FC<TimePickerProps> = ({
    selectedValue,
    onTimeChange,
    openedTime,
    setOpenedTime,
    dateChose
}) => {
    const [is24HourFormat, setIs24HourFormat] = useState(true)

    const validSelectedValue = selectedValue instanceof Date ? selectedValue : new Date()

    // Determine if it's AM or PM based on validSelectedValue
    const [isAM, setIsAM] = useState(validSelectedValue.getHours() < 12)

    // Adjust hours based on the format
    const hours = is24HourFormat
        ? Array.from({ length: 24 }, (_, i) => i)
        : Array.from({ length: 12 }, (_, i) => i + 1)

    const minutes = [0, 30]

    const toggleAnimation = useRef(new Animated.Value(0)).current // Animation reference

    const handleToggleFormat = (format24Hour: boolean | ((prevState: boolean) => boolean)) => {
        setIs24HourFormat(format24Hour)
        Animated.timing(toggleAnimation, {
            toValue: format24Hour ? 0 : 1, // Animate to the right for 12hr format
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const toggleStyle = {
        transform: [
            {
                translateX: toggleAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 30] // Adjust this range as needed
                })
            }
        ]
    }

    // const amPmToggleAnimation = useRef(new Animated.Value(0)).current // Animation reference for AM/PM toggle

    // const handleToggleAmPm = (isAm: boolean | ((prevState: boolean) => boolean)) => {
    //     setIsAM(isAm)
    //     Animated.timing(amPmToggleAnimation, {
    //         toValue: isAm ? 0 : 1, // Move the toggle based on AM/PM
    //         duration: 300,
    //         useNativeDriver: true
    //     }).start()
    // }

    // Style for the AM/PM toggle switch
    // const amPmToggleStyle = {
    //     transform: [
    //         {
    //             translateX: amPmToggleAnimation.interpolate({
    //                 inputRange: [0, 1],
    //                 outputRange: [6, 55] // Adjust this range as needed
    //             })
    //         }
    //     ]
    // }

    const isSelectedTime = (hour: number, minute: number) => {
        return validSelectedValue.getHours() === hour && validSelectedValue.getMinutes() === minute
    }

    const convertTo24HourFormat = (hour: number, isAm: boolean) => {
        if (!is24HourFormat) {
            // In 12-hour format, adjust hours for AM/PM
            if (isAm && hour === 12) {
                // 12 AM is 0 in 24-hour format
                return 0
            } else if (!isAm && hour !== 12) {
                // PM times other than 12 should be hour + 12
                return hour + 12
            }
        }
        return hour // No change for 24-hour format or 12 PM
    }

    const isTimeInPast = (hour: number, minute: number) => {
        const now = new Date()

        if (dateChose && dateChose.toDateString() !== now.toDateString()) {
            // If the chosen date is not today, do not mark any time as past
            return false
        }

        const timeToCheck = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute)
        return timeToCheck < now
    }

    React.useEffect(() => {
        const now = new Date()
        if (dateChose && dateChose > now) {
            // If the chosen date is in the future, set the time to 00:00
            const newTime = new Date(dateChose)
            newTime.setHours(0, 0, 0, 0) // Set to 00:00
            onTimeChange(newTime)
        }
    }, [dateChose, onTimeChange])

    return (
        <Modal animationType='slide' transparent={true} visible={openedTime}>
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
                            onPress={() => setOpenedTime(false)}
                        >
                            <Text style={styles.x}>X</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Toggle for 24-hour and 12-hour formats */}

                    {/* <View style={styles.toggleView}>
                            <TouchableOpacity onPress={() => handleToggleFormat(true)}>
                                <Text style={styles.toggleText}>24hr</Text>
                            </TouchableOpacity>
                            <Animated.View style={[styles.toggle, toggleStyle]} />
                            <TouchableOpacity onPress={() => handleToggleFormat(false)}>
                                <Text style={styles.toggleText}>12hr</Text>
                            </TouchableOpacity>
                        </View> */}

                    <View style={styles.timePickerView}>
                        <View style={styles.columnWithLabel}>
                            <Text style={styles.columnLabel}>Hours</Text>
                            <ScrollView
                                style={styles.timeScrollView}
                                showsVerticalScrollIndicator={false}
                            >
                                {hours.map((hour) => {
                                    const isPast = isTimeInPast(
                                        hour,
                                        validSelectedValue.getMinutes()
                                    )
                                    return (
                                        <TouchableOpacity
                                            key={hour}
                                            style={[
                                                styles.timePickerItem,
                                                isSelectedTime(
                                                    hour,
                                                    validSelectedValue.getMinutes()
                                                ) && styles.selectedTime,
                                                isPast && styles.pastTime // Add a style for past times
                                            ]}
                                            onPress={() => {
                                                if (!isPast) {
                                                    const newTime = new Date(
                                                        validSelectedValue.setHours(hour)
                                                    )
                                                    onTimeChange(newTime)
                                                }
                                            }}
                                            disabled={isPast} // Disable the button if the time is in the past
                                        >
                                            <Text
                                                style={[
                                                    styles.timeText,
                                                    isPast && styles.pastTimeText
                                                ]}
                                            >
                                                {hour}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </View>
                        <View style={styles.columnWithLabel}>
                            <Text style={styles.columnLabel}>Minutes</Text>
                            <ScrollView
                                style={styles.timeScrollView}
                                showsVerticalScrollIndicator={false}
                            >
                                {minutes.map((minute) => (
                                    <TouchableOpacity
                                        key={minute}
                                        style={[
                                            styles.timePickerItem,
                                            isSelectedTime(validSelectedValue.getHours(), minute) &&
                                                styles.selectedTime
                                        ]}
                                        onPress={() => {
                                            const newTime = new Date(
                                                validSelectedValue.setMinutes(minute)
                                            )
                                            onTimeChange(newTime)
                                        }}
                                    >
                                        <Text style={styles.timeText}>{minute}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                    {/* {!is24HourFormat && (
                            <View style={styles.amPmToggle}>
                                <TouchableOpacity onPress={() => handleToggleAmPm(true)}>
                                    <Text style={styles.amPmText}>AM</Text>
                                </TouchableOpacity>
                                <Animated.View style={[styles.amPmToggleSwitch, amPmToggleStyle]} />
                                <TouchableOpacity onPress={() => handleToggleAmPm(false)}>
                                    <Text style={styles.amPmText}>PM</Text>
                                </TouchableOpacity>
                            </View>
                        )} */}
                    <TouchableOpacity onPress={() => setOpenedTime(false)}>
                        <Text style={styles.confirmText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

// Add styles that match your date picker modal's theme
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 4,
        marginBottom: 10
    },
    pastTime: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    pastTimeText: {
        color: '#a0a0a0'
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
    selectedTime: {
        backgroundColor: palette.pastelLightGreen,
        borderRadius: 100, // Rounded corners for the highlight
        padding: 10
    },
    columnWithLabel: {
        flex: 1,
        alignItems: 'center'
    },
    columnLabel: {
        fontFamily: typography.primary,
        fontSize: 16,
        marginBottom: 10,
        borderWidth: 1,
        padding: 5,
        borderColor: palette.pastelLightGreen,
        borderRadius: 10
    },

    amPmToggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        width: 100,
        height: 30,
        paddingHorizontal: 5,
        marginVertical: 10
    },
    amPmToggleSwitch: {
        position: 'absolute',
        width: '38%',
        height: '80%',
        borderRadius: 12.5,
        backgroundColor: palette.pastelLightGreen,
        margin: 2.5
    },
    modalView: {
        backgroundColor: 'white',
        width: '100%',
        height: '43%',
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
    timePickerView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: '2%',
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: '2%'
    },
    timeScrollView: {
        height: 150
    },
    timePickerItem: {
        padding: 10,
        alignItems: 'center'
    },
    timeText: {
        fontFamily: typography.primary,
        margin: 2
    },
    confirmText: {
        paddingTop: '3%',
        fontFamily: typography.primary
    },
    toggleView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        width: '100%',
        height: '10%'
    },
    toggle: {
        position: 'absolute',
        width: '15%',
        height: 25,
        borderRadius: 12.5,
        backgroundColor: palette.pastelLightGreen,
        margin: 2.5,
        zIndex: 0,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    toggleText: {
        fontFamily: typography.primary,
        marginHorizontal: 10,
        fontSize: 16,
        zIndex: 1
    },
    amPmText: {
        fontFamily: typography.primary,
        marginHorizontal: 10,
        fontSize: 16
    }
})
