import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { TouchableOpacity } from 'react-native'
import { palette } from '../../src/theme'

interface CopyIconProps {
    fill?: string
    onPress?: () => void
}

const CopyIcon: React.FC<CopyIconProps> = (props, onPress) => {
    return (
        <TouchableOpacity onPress={onPress}>
        <Svg fill={palette.neutral800} height='30' width='30' viewBox='0 0 512 512' {...props}>
            <Path d="M35,270h45v45c0,8.284,6.716,15,15,15h200c8.284,0,15-6.716,15-15V75c0-8.284-6.716-15-15-15h-45V15
		c0-8.284-6.716-15-15-15H35c-8.284,0-15,6.716-15,15v240C20,263.284,26.716,270,35,270z M280,300H110V90h170V300z M50,30h170v30H95
		c-8.284,0-15,6.716-15,15v165H50V30z"></Path>
            <Path d='M155,120c-8.284,0-15,6.716-15,15s6.716,15,15,15h80c8.284,0,15-6.716,15-15s-6.716-15-15-15H155z'></Path>
            <Path d='M235,180h-80c-8.284,0-15,6.716-15,15s6.716,15,15,15h80c8.284,0,15-6.716,15-15S243.284,180,235,180z'></Path>
            <Path d='M235,240h-80c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h80c8.284,0,15-6.716,15-15C250,246.716,243.284,240,235,240z'></Path>
        </Svg>
        </TouchableOpacity>
    )
}

export default CopyIcon