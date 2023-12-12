import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { palette } from '../../src/theme/colors'

interface showProps {
    fill?: string
}

const ShowPassword: React.FC<showProps> = ({ fill = palette.neutral800, ...props }) => {
    return (
        <Svg width={16} height={16} fill={fill} viewBox='0 0 16 16' {...props}>
            <Path
                d={
                    'M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z'
                }
            />
        </Svg>
    )
}

export default ShowPassword
