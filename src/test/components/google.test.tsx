import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'

// Import your component
import GoogleSignIn from '../../components/google'

// Mock the navigation
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}))

describe('<GoogleSignIn />', () => {
    it('navigates to the Tabs screen when button is pressed', () => {

        // Mock the navigate method
        const navigate = jest.fn()
        ;(useNavigation as jest.Mock).mockReturnValue({ navigate })
        // Render the component
        const { getByText } = render(<GoogleSignIn onSignInSuccess={function (): void {
            throw new Error('Function not implemented.')
        } } onSignInFailure={function (): void {
            throw new Error('Function not implemented.')
        } } />)

        // Simulate a press on the button
        fireEvent.press(getByText('Sign in with Google'))

        // Check that the navigate method was called with the correct arguments
        expect(navigate).toHaveBeenCalledWith('Tabs')

    })
})
