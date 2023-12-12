import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from '../../src/theme/colors'

interface PlusProps {
  fill: string;
    testID: string;
}

const Plus: React.FC<PlusProps> = ({ fill = colors.text, testID, ...props }) => {
    return (
        <Svg
            width={34}
            height={34}
            fill={fill}
            viewBox='0 0 16 16'
            testID={testID}
            {...props}
        >
            <Path d='M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm6.5 4.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3a.5.5 0 011 0z' fill={fill}/>

        </Svg>
    )
}

export default Plus