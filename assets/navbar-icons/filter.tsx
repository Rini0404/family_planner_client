import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { TouchableOpacity } from 'react-native'
import { colors } from '../../src/theme'

interface FilterIconProps {
    fill?: string
}

const FilterIcon: React.FC<FilterIconProps> = (props) => {
    return (
        <Svg fill='none' height='30' width='30' viewBox='0 0 24 24' {...props}>
            <Path
                d='M4 8V5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V8M4 8H20M4 8L9.28632 14.728C9.42475 14.9042 9.5 15.1218 9.5 15.3459V18.4612C9.5 19.1849 10.2449 19.669 10.9061 19.375L13.4061 18.2639C13.7673 18.1034 14 17.7453 14 17.3501V15.3699C14 15.1312 14.0854 14.9004 14.2407 14.7191L20 8'
                stroke={colors.text}
                stroke-width='2'
                stroke-linecap='round'
            ></Path>
        </Svg>
    )
}

export default FilterIcon
