import { View, Text, Platform, StyleSheet, StatusBar, Modal, TextInput } from 'react-native'
import React from 'react'
import { AppStackParamList, AppStackScreenProps } from '../navigators'
import { palette } from '../theme'
import { typography } from '../theme/fonts'
import BackArrow from '../components/BackArrow'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

interface SettingsProps extends AppStackScreenProps<'Settings'> {}

export const Settings: React.FC<SettingsProps> = () => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()

    const { family } = useSelector((state: any) => state.family)
    const { tasks } = useSelector((state: any) => state.tasks)
    const { user } = useSelector((state: any) => state.user)

    const handleBackPress = () => {
        navigation.goBack()
    }

    const [isNameModalVisible, setIsNameModalVisible] = React.useState(false)
    const [isPasswordModalVisible, setIsPasswordModalVisible] = React.useState(false)
    const [isLeaveFamilyModalVisible, setIsLeaveFamilyModalVisible] = React.useState(false)
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const toggleNameModal = () => {
        setIsNameModalVisible(!isNameModalVisible)
    }

    const togglePasswordModal = () => {
        setIsPasswordModalVisible(!isPasswordModalVisible)
    }

    const toggleLeaveFamilyModal = () => {
        setIsLeaveFamilyModalVisible(!isLeaveFamilyModalVisible)
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackArrow onPress={handleBackPress} />
                    <Text style={styles.headerText}>Settings</Text>
                </View>
                <View style={styles.userInfoCard}>
                    <Text style={styles.cardTitleText}>User Information</Text>
                    <TouchableOpacity style={styles.row} onPress={toggleNameModal}>
                        <Text style={styles.cardSubChangableText}>
                            Name: {user.firstName} {user.lastName}
                        </Text>
                        <View style={{ marginTop: 5 }}>
                            <Icon name='chevron-right' size={20} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={togglePasswordModal}>
                        <Text style={styles.cardSubChangableText}>Password: ********</Text>
                        <View style={{ marginTop: 5 }}>
                            <Icon name='chevron-right' size={20} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.nonChangeable}>
                        <Text style={styles.cardSubText}>Email:</Text>
                        <Text style={styles.cardSubText}>{user.email}</Text>
                    </View>
                    <View style={styles.nonChangeable}>
                        <Text style={styles.cardSubText}>Role:</Text>
                        <Text style={styles.cardSubText}>{user.role}</Text>
                    </View>
                </View>

                <View style={styles.familyCard}>
                    <Text style={styles.cardTitleText}>Family Information</Text>
                    <View style={styles.nonChangeable}>
                        <Text style={styles.cardSubText}>Family Name:</Text>
                        <Text style={styles.cardSubText}> {family.familyName}'s</Text>
                    </View>
                    <View style={styles.nonChangeable}>
                        <Text style={styles.cardSubText}>Invite Code:</Text>
                        <Text style={styles.cardSubText}>{family.invitationCode}</Text>
                    </View>
                    <View style={styles.nonChangeable}>
                        <Text style={styles.cardSubText}>Members:</Text>
                        <Text style={styles.cardSubText}>{family.members.length}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={toggleLeaveFamilyModal}>
                        <Text style={styles.buttonText}>Leave this Family</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {isNameModalVisible && (
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={isNameModalVisible}
                    onRequestClose={toggleNameModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={toggleNameModal}>
                                    <Text style={styles.modalHeaderText}>Cancel</Text>
                                </TouchableOpacity>
                                <Text style={styles.modalHeaderTitle}>Edit Info</Text>
                                <TouchableOpacity onPress={() => {}}>
                                    <Text style={styles.modalHeaderText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={user.firstName}
                                    value={firstName}
                                    onChangeText={(text) => setFirstName(text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder={user.lastName}
                                    value={lastName}
                                    onChangeText={(text) => setLastName(text)}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
            {isPasswordModalVisible && (
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={isPasswordModalVisible}
                    onRequestClose={togglePasswordModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={togglePasswordModal}>
                                    <Text style={styles.modalHeaderText}>Cancel</Text>
                                </TouchableOpacity>
                                <Text style={styles.modalHeaderTitle}>Edit Info</Text>
                                <TouchableOpacity onPress={() => {}}>
                                    <Text style={styles.modalHeaderText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Password'
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChangeText={(text) => setConfirmPassword(text)}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
            {isLeaveFamilyModalVisible && (
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={isLeaveFamilyModalVisible}
                    onRequestClose={toggleLeaveFamilyModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={toggleLeaveFamilyModal}>
                                    <Text style={styles.modalHeaderText}>Cancel</Text>
                                </TouchableOpacity>
                                <Text style={styles.modalHeaderTitle}>Leave Family</Text>
                                <TouchableOpacity onPress={() => {}}>
                                    <Text style={styles.modalHeaderText}>Leave</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalContent}>
                                <Text style={{ fontFamily: typography.primary, fontSize: 16 }}>
                                    Are you sure you want to leave this family?
                                </Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : '10%',
        paddingHorizontal: 10
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: {
        width: '95%',
        height: '90%',
        backgroundColor: palette.neutral100,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
    },
    modalHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    modalHeaderTitle: {
        fontSize: 18,
        fontFamily: typography.tertiary,
        textAlign: 'center'
    },
    modalHeaderText: {
        fontSize: 16,
        color: 'blue',
        fontFamily: typography.tertiary
    },
    modalContent: {
        width: '100%'
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: palette.neutral700,
        borderRadius: 5,
        fontFamily: typography.primary
    },
    headerText: {
        fontFamily: typography.tertiary,
        fontSize: 30,
        textAlign: 'left',
        paddingLeft: '5%'
    },
    header: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nonChangeable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        width: '95%',
        alignSelf: 'center'
    },
    userInfoCard: {
        height: '25%',
        width: '95%',
        alignSelf: 'center',
        backgroundColor: palette.neutral100,
        borderRadius: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        alignSelf: 'center',
        padding: 5
    },
    cardTitleText: {
        fontSize: 18,
        fontFamily: typography.quaternary,
        color: palette.neutral800,
        marginBottom: 2,
        borderBottomColor: palette.neutral700,
        borderBottomWidth: 1,
        padding: 5,
        textAlign: 'center'
    },
    cardSubText: {
        fontSize: 16,
        fontFamily: typography.primary,
        color: palette.neutral800,
        justifyContent: 'space-between'
    },
    cardSubChangableText: {
        fontSize: 16,
        fontFamily: typography.primary,
        color: palette.neutral800
    },
    familyCard: {
        height: '28%',
        width: '95%',
        alignSelf: 'center',
        backgroundColor: palette.neutral100,
        borderRadius: 20,
        marginTop: 10
    },
    button: {
        backgroundColor: palette.angry500,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 18,
        width: '95%',
        alignSelf: 'center'
    },
    buttonText: {
        color: palette.neutral100,
        fontFamily: typography.tertiary,
        fontSize: 16
    }
})
