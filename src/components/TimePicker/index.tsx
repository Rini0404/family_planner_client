import React, { useState, useRef } from 'react'
import { Animated } from 'react-native'
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import BackArrow from '../BackArrow'
import { typography } from '../../theme/fonts'
import { palette } from '../../theme'

export const TimePicker = () => {
    const [time, setTime] = useState(new Date())
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [is24HourFormat, setIs24HourFormat] = useState(true) // State to track 24-hour format
    const [isAM, setIsAM] = useState(time.getHours() < 12) // State to track AM/PM

    // Adjust hours based on the format
    const hours = is24HourFormat
        ? Array.from({ length: 24 }, (_, i) => i)
        : Array.from({ length: 12 }, (_, i) => i + 1)

    const minutes = Array.from({ length: 60 }, (_, i) => i)

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

    const amPmToggleAnimation = useRef(new Animated.Value(0)).current // Animation reference for AM/PM toggle

    const handleToggleAmPm = (isAm: boolean | ((prevState: boolean) => boolean)) => {
        setIsAM(isAm)
        Animated.timing(amPmToggleAnimation, {
            toValue: isAm ? 0 : 1, // Move the toggle based on AM/PM
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    // Style for the AM/PM toggle switch
    const amPmToggleStyle = {
        transform: [
            {
                translateX: amPmToggleAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [6, 55] // Adjust this range as needed
                })
            }
        ]
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Text>Time picker</Text>
                <Text>{time.toTimeString().split(' ')[0]}</Text>
            </TouchableOpacity>

            <Modal animationType='slide' transparent={true} visible={showTimePicker}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* Toggle for 24-hour and 12-hour formats */}

                        <View style={styles.toggleView}>
                            <TouchableOpacity onPress={() => handleToggleFormat(true)}>
                                <Text style={styles.toggleText}>24hr</Text>
                            </TouchableOpacity>
                            <Animated.View style={[styles.toggle, toggleStyle]} />
                            <TouchableOpacity onPress={() => handleToggleFormat(false)}>
                                <Text style={styles.toggleText}>12hr</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.timePickerView}>
                            <ScrollView
                                style={styles.timeScrollView}
                                showsVerticalScrollIndicator={false}
                            >
                                {hours.map((hour) => (
                                    <TouchableOpacity
                                        key={hour}
                                        style={styles.timePickerItem}
                                        onPress={() => {
                                            const newTime = new Date(time.setHours(hour))
                                            setTime(newTime)
                                        }}
                                    >
                                        <Text style={styles.timeText}>{hour}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <ScrollView
                                style={styles.timeScrollView}
                                showsVerticalScrollIndicator={false}
                            >
                                {minutes.map((minute) => (
                                    <TouchableOpacity
                                        key={minute}
                                        style={styles.timePickerItem}
                                        onPress={() => {
                                            const newTime = new Date(time.setMinutes(minute))
                                            setTime(newTime)
                                        }}
                                    >
                                        <Text style={styles.timeText}>{minute}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        {!is24HourFormat && (
                            <View style={styles.amPmToggle}>
                                <TouchableOpacity onPress={() => handleToggleAmPm(true)}>
                                    <Text style={styles.amPmText}>AM</Text>
                                </TouchableOpacity>
                                <Animated.View style={[styles.amPmToggleSwitch, amPmToggleStyle]} />
                                <TouchableOpacity onPress={() => handleToggleAmPm(false)}>
                                    <Text style={styles.amPmText}>PM</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                            <Text style={styles.confirmText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

// Add styles that match your date picker modal's theme
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
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
        height: '45%',
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
        fontFamily: typography.primary
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
