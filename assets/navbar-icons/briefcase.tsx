import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors, palette } from '../../src/theme/colors'

interface BriefcaseProps {
  fill: string;
    testID: string;
}

const Briefcase: React.FC<BriefcaseProps> = ({ fill = colors.text, testID, ...props }) => {
    return (
        <Svg
            width={33}
            height={27}
            fill={fill}
            viewBox='0 0 16 16'
            testID={testID}
            {...props}
        >
            <Path d= {
                fill === palette.primary
                    ? 'M6.5 1A1.5 1.5 0 005 2.5V3H1.5A1.5 1.5 0 000 4.5v1.384l7.614 2.03a1.5 1.5 0 00.772 0L16 5.884V4.5A1.5 1.5 0 0014.5 3H11v-.5A1.5 1.5 0 009.5 1h-3zm0 1h3a.5.5 0 01.5.5V3H6v-.5a.5.5 0 01.5-.5z M0 12.5A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5V6.85L8.129 8.947a.5.5 0 01-.258 0L0 6.85v5.65z'
                    :'M6.5 1A1.5 1.5 0 005 2.5V3H1.5A1.5 1.5 0 000 4.5v8A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-8A1.5 1.5 0 0014.5 3H11v-.5A1.5 1.5 0 009.5 1h-3zm0 1h3a.5.5 0 01.5.5V3H6v-.5a.5.5 0 01.5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5V7.15l6.614 1.764a1.5 1.5 0 00.772 0zM1.5 4h13a.5.5 0 01.5.5v1.616L8.129 7.948a.5.5 0 01-.258 0L1 6.116V4.5a.5.5 0 01.5-.5z'
            }
            />
        </Svg>
    )
}

export default Briefcase

