import * as React from 'react'
import Svg, { Path, SvgProps, G } from 'react-native-svg'
import { colors } from '../../src/theme/colors'

const DoneSvg: React.FC<SvgProps> = ({ fill = '#FFFF', testID, ...props }) => {
    return (
        <Svg
            width='29'
            height='29'
            viewBox='0 0 150 150'
            {...props}
            fill={'#FFFF'}
            stroke={'#FFFF'}
            strokeWidth={0.5}
        >
            <Path d='M64 0a64 64 0 1 0 64 64A64.07 64.07 0 0 0 64 0Zm0 122a58 58 0 1 1 58-58 58.07 58.07 0 0 1-58 58Z' />
            <Path d='M87.9 42.36 50.42 79.22 40.17 68.43a3 3 0 0 0-4.35 4.13l12.35 13a3 3 0 0 0 2.12.93h.05a3 3 0 0 0 2.1-.86l39.65-39a3 3 0 1 0-4.21-4.28Z' />
        </Svg>
    )
}

export default DoneSvg
