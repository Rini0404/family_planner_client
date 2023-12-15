import {
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold
} from '@expo-google-fonts/comfortaa'

export const fontsToLoad = {
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold
}

const fonts = {
    comfortaa: {
        light: 'Comfortaa_300Light',
        regular: 'Comfortaa_400Regular',
        medium: 'Comfortaa_500Medium',
        semiBold: 'Comfortaa_600SemiBold',
        bold: 'Comfortaa_700Bold'
    }
}
export const typography = {
    primary: fonts.comfortaa.regular,
    secondary: fonts.comfortaa.light,
    tertiary: fonts.comfortaa.medium,
    quaternary: fonts.comfortaa.bold
}
