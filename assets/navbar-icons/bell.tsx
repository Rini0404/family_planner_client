import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors, palette } from '../../src/theme/colors'

interface BellProps {
  fill: string;
    testID: string;
}

const Bell: React.FC<BellProps> = ({ fill = colors.text, testID, ...props }) => {
    return (
        <Svg
            width={27}
            height={27}
            fill={fill}
            testID={testID}
            viewBox='0 0 16 16'
            {...props}
        >
            <Path
                d={
                    fill === palette.primary
                        ? 'M8 16a2 2 0 002-2H6a2 2 0 002 2zm.995-14.901a1 1 0 10-1.99 0A5.002 5.002 0 003 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z':
                        'M8 16a2 2 0 002-2H6a2 2 0 002 2zM8 1.918l-.797.161A4.002 4.002 0 004 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 00-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 111.99 0A5.002 5.002 0 0113 6c0 .88.32 4.2 1.22 6z'
                }
            />
        </Svg>
    )
}

export default Bell
