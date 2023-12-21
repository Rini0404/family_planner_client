import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors, palette } from '../../src/theme/colors'

interface BackArrowProps {
  }

export const BackArrowIcon: React.FC<BackArrowProps> = ({ ...props }) => {
    return (
        <Svg height={27} width={27} viewBox='0 0 20 20'>
            <Path d="M10 2 Q5 10 10 18 M10 2 L2 10 L10 18" fill='none' stroke={palette.neutral800} strokeWidth='2' />
        </Svg>
    )
}

