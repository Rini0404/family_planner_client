import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors, palette } from '../../src/theme/colors'

interface HomeProps {
  fill: string;
    testID: string;
}

const Home: React.FC<HomeProps> = ({ fill = colors.text, testID, ...props }) => {
    return (
        <Svg
            width={26}
            height={28}
            fill={fill}
            viewBox='0 0 16 16'
            testID={testID}
            {...props}
        >
            <Path
                d={
                    fill === palette.primary
                        ? 'M8.707 1.5a1 1 0 00-1.414 0L.646 8.146a.5.5 0 00.708.708L8 2.207l6.646 6.647a.5.5 0 00.708-.708L13 5.793V2.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1.293L8.707 1.5z M8 3.293l6 6V13.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5V9.293l6-6z'
                        : 'M8.707 1.5a1 1 0 00-1.414 0L.646 8.146a.5.5 0 00.708.708L2 8.207V13.5A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5V8.207l.646.647a.5.5 0 00.708-.708L13 5.793V2.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1.293L8.707 1.5zM13 7.207V13.5a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5V7.207l5-5 5 5z'
                }
            />
        </Svg>
    )
}

export default Home
