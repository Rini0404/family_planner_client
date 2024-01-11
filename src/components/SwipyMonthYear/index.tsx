import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler'
import { typography } from '../../theme/fonts'

type SwipableMonthYearProps = {
    currentDate: Date
    setCurrentDate: (date: Date) => void
}

export const SwipableMonthYear: React.FC<SwipableMonthYearProps> = ({
    currentDate,
    setCurrentDate
}) => {
    const translateX = useRef(new Animated.Value(0)).current // For animation

    const getNextMonthDate = () => {
        let nextMonthDate = new Date(currentDate)
        nextMonthDate.setMonth(currentDate.getMonth() + 1)
        return nextMonthDate
    }

    const handleSwipe = (direction: string) => {
        let newDate = new Date(currentDate)
        if (direction === 'left') {
            newDate.setMonth(newDate.getMonth() + 1)
        } else if (direction === 'right') {
            newDate.setMonth(newDate.getMonth() - 1)
        }
        setCurrentDate(newDate)
        // Reset animation
        Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true
        }).start()
    }

    const onGestureEvent = Animated.event([{ nativeEvent: { translationX: translateX } }], {
        useNativeDriver: true
    })

    const onHandlerStateChange = (event: { nativeEvent: { velocityX: number; state: number } }) => {
        const { velocityX, state } = event.nativeEvent
        const swipeThreshold = 0.3 // Adjust swipe sensitivity

        if (state === 5) {
            // State 5 is 'end'
            if (velocityX > swipeThreshold) {
                handleSwipe('right')
            } else if (velocityX < -swipeThreshold) {
                handleSwipe('left')
            } else {
                // Reset position if not swiped enough
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true
                }).start()
            }
        }
    }

    const nextMonthDate = getNextMonthDate()

    return (
        <GestureHandlerRootView
            style={{
                height: '10%'
            }}
        >
            <PanGestureHandler
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={onHandlerStateChange}
            >
                <Animated.View
                    style={[styles.container, { transform: [{ translateX: translateX }] }]}
                >
                    <Text style={styles.currentDateText}>
                        {`${currentDate.toLocaleString('default', {
                            month: 'long'
                        })} ${currentDate.getFullYear()}`}
                    </Text>
                    <Text style={styles.nextDateText}>
                        {`${nextMonthDate.toLocaleString('default', { month: 'long' })}`}
                    </Text>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '150%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '8%'
    },
    currentDateText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: typography.quaternary,
        color: '#fff',
        width: '50%'
    },
    nextDateText: {
        fontSize: 30,
        color: '#aaa',
        fontFamily: typography.quaternary,
        width: '50%'
    }
})
