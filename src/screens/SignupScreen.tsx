import React, { useState } from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native'
import { palette, colors } from '../theme/colors'
import CustomTextInput from '../components/CustomTextInput'
import DropDownPicker from 'react-native-dropdown-picker'
import { AppStackScreenProps } from '../navigators'
import { typography } from '../theme/fonts'
import { BackDrop } from '../components/BackDropGreen'
import { OptionSignup } from '../components/OptionSignup'
import { SignupForm } from '../components/SignupForm'
import BackArrow from '../components/BackArrow'

interface SignupProps extends AppStackScreenProps<'Signup'> {}

export enum OptionChosen {
    Creator = 'Creator',
    Member = 'Member'
}

export const SignupScreen: React.FC<SignupProps> = ({ navigation }) => {
    const [optionChosen, setOptionChosen] = useState<OptionChosen | null>(null)

    console.log('Option Chosen: ', optionChosen)

    const handleBackPress = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackArrow onPress={handleBackPress} />
                <Text style={styles.headerText}>Register</Text>
            </View>
            <BackDrop />

            {!optionChosen && (
                <OptionSignup optionChosen={optionChosen} setOptionChosen={setOptionChosen} />
            )}

            {optionChosen && <SignupForm optionChosen={optionChosen} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerText: {
        fontFamily: typography.tertiary,
        fontSize: 30,
        textAlign: 'left',
        paddingLeft: '5%'
    },
    header: {
        height: '10%',
        top: '10%',
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default SignupScreen

// ==============
// import React, { useState } from 'react'
// import {
//     Text,
//     TouchableOpacity,
//     View,
//     StyleSheet,
//     KeyboardAvoidingView,
//     ScrollView,
//     StatusBar,
//     Platform
// } from 'react-native'
// import { palette, colors } from '../theme/colors'
// import CustomTextInput from '../components/CustomTextInput'
// import HidePassword from '../../assets/password-icons/hide-password'
// import ShowPassword from '../../assets/password-icons/show-password'
// import LoadingOverlay from '../components/LoadingOverlay'
// import RadioButton from '../components/RadioButton'
// import DropDownPicker from 'react-native-dropdown-picker'
// import { AppStackScreenProps } from '../navigators'
// import PrimaryButton from '../components/PrimaryButton'

// interface SignupProps extends AppStackScreenProps<'Signup'> {}

// export const SignupScreen: React.FC<SignupProps> = () => {
//     const [email, setEmail] = React.useState<string>('')
//     const [password, setPassword] = React.useState<string>('')
//     const [firstName, setFirstName] = React.useState<string>('')
//     const [lastName, setLastName] = React.useState<string>('')
//     const [error, setError] = React.useState<string | null>(null)
//     const [isLoading, setIsLoading] = React.useState(false)
//     const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
//     const [userRole, setUserRole] = React.useState<string | null>(null)
//     const [familyName, setFamilyName] = React.useState('')
//     const [memberType, setMemberType] = useState(null);

//     const handleSubmit = () => {
//         const userInfo = {
//             email,
//             password,
//             firstName,
//             lastName,
//             userRole,
//             ...(userRole === 'Creator' && { familyName }),
//             ...(userRole === 'Member' && { memberType }),
//         };

//         console.log(userInfo)
//     }
//     const MyDropdown = () => {
//         const [open, setOpen] = useState(false)
//         const [items, setItems] = useState([
//             { label: 'Guest', value: 'guest' },
//             { label: 'Family Member', value: 'familyMember' }
//         ])

//         return (
//             <DropDownPicker
//                 open={open}
//                 value={memberType}
//                 items={items}
//                 setOpen={setOpen}
//                 setValue={setMemberType}
//                 setItems={setItems}
//                 dropDownDirection='BOTTOM'
//                 placeholder='Select Member Type'
//             />
//         )
//     }

//     const renderAdditionalInput = () => {
//         if (userRole === 'Creator') {
//             return (
//                 <View style={styles.inputContainer}>
//                     <CustomTextInput
//                         label='Family Name'
//                         placeholder='Family Name'
//                         placeholderTextColor={palette.secondary100}
//                         value={familyName}
//                         onChangeText={setFamilyName}
//                     />
//                 </View>
//             )
//         } else if (userRole === 'Member') {
//             return (
//                 <View style={styles.inputContainer}>
//                     <Text style={{ color: colors.text, fontSize: 16, marginLeft: 10 }}>
//                         Member Type
//                     </Text>
//                     <MyDropdown />
//                 </View>
//             )
//         }
//         return null
//     }

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             style={{ flex: 1 }}
//         >
//             {isLoading && <LoadingOverlay isVisible={isLoading} />}
//             <ScrollView
//                 keyboardShouldPersistTaps='handled'
//                 contentContainerStyle={styles.scrollviewContainer}
//             >
//                 <View style={styles.contentContainer}>
//                     <View style={styles.roleContainer}>
//                         <View style={styles.roleWrapper}>
//                             <RadioButton
//                                 isSelected={userRole === 'Creator'}
//                                 onPress={() => setUserRole('Creator')}
//                             />
//                             <Text style={styles.roleText}>Creator</Text>
//                         </View>
//                         <View style={styles.roleWrapper}>
//                             <RadioButton
//                                 isSelected={userRole === 'Member'}
//                                 onPress={() => setUserRole('Member')}
//                             />
//                             <Text style={styles.roleText}>Member</Text>
//                         </View>
//                     </View>
//                     <View style={styles.inputContainer}>
//                         <CustomTextInput
//                             label='First Name'
//                             placeholder='First Name'
//                             placeholderTextColor={palette.neutral800}
//                             autoCorrect={false}
//                             value={firstName}
//                             onChangeText={(text) => {
//                                 setFirstName(text)
//                                 setError(null)
//                             }}
//                             error={error}
//                         />
//                     </View>
//                     <View style={styles.inputContainer}>
//                         <CustomTextInput
//                             label='Last Name'
//                             placeholder='Last Name'
//                             placeholderTextColor={palette.neutral800}
//                             autoCorrect={false}
//                             value={lastName}
//                             onChangeText={(text) => {
//                                 setLastName(text)
//                                 setError(null)
//                             }}
//                             error={error}
//                         />
//                     </View>
//                     <View style={styles.inputContainer}>
//                         <CustomTextInput
//                             label='Email'
//                             placeholder='Email'
//                             placeholderTextColor={palette.neutral800}
//                             keyboardType='email-address'
//                             autoCapitalize='none'
//                             autoCorrect={false}
//                             value={email}
//                             onChangeText={(text) => {
//                                 setEmail(text)
//                                 setError(null)
//                             }}
//                             error={error}
//                         />
//                     </View>
//                     <View style={styles.inputContainer}>
//                         <View style={styles.inputWrapper}>
//                             <CustomTextInput
//                                 label='Password'
//                                 placeholder='Password'
//                                 placeholderTextColor={palette.neutral800}
//                                 autoCapitalize='none'
//                                 autoCorrect={false}
//                                 value={password}
//                                 onChangeText={(text) => {
//                                     setPassword(text)
//                                     setError(null)
//                                 }}
//                                 isPassword={true}
//                                 isPasswordVisible={isPasswordVisible}
//                                 error={error}
//                             />
//                             <TouchableOpacity
//                                 style={styles.iconContainer}
//                                 onPress={() => setIsPasswordVisible(!isPasswordVisible)}
//                             >
//                                 {isPasswordVisible ? <HidePassword /> : <ShowPassword />}
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                     {renderAdditionalInput()}
//                     <PrimaryButton
//                         onPress={handleSubmit}
//                         title='Sign Up'
//                         style={{ marginTop: 10 }}
//                     />
//                 </View>
//             </ScrollView>
//         </KeyboardAvoidingView>
//     )
// }

// const styles = StyleSheet.create({
//     scrollviewContainer: {
//         paddingTop: StatusBar.currentHeight
//     },
//     contentContainer: {
//         alignItems: 'center',
//         paddingHorizontal: 20,
//         height: '100%',
//         paddingTop: '8%',
//         paddingBottom: '30%'
//     },
//     roleContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 10
//     },
//     roleWrapper: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginRight: 20
//     },
//     roleText: {
//         color: colors.text,
//         fontSize: 16
//     },
//     inputContainer: {
//         width: '90%',
//         marginBottom: 5
//     },
//     inputWrapper: {
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     iconContainer: {
//         marginTop: 20,
//         right: 25
//     }
// })

// export default SignupScreen
