import * as React from 'react'
import Svg, { Path, SvgProps, G } from 'react-native-svg'
import { colors } from '../../src/theme/colors'

const Overdue: React.FC<SvgProps> = ({ fill = colors.text, testID, ...props }) => {
    return (
        <Svg
            width='29'
            height='29'
            viewBox='0 0 60 60'
            {...props}
            fill={'#FFFF'}
            stroke={'#FFFF'}
            strokeWidth={0.5}
        >
            <G id='Icon-Exclamation' transform='translate(228 278)'>
                <Path
                    id='Fill-49'
                    d='M-196-222.1c-13.2 0-23.9-10.7-23.9-23.9s10.7-23.9 23.9-23.9 23.9 10.7 23.9 23.9-10.7 23.9-23.9 23.9zm0-45.2c-11.7 0-21.3 9.6-21.3 21.3s9.6 21.3 21.3 21.3 21.3-9.6 21.3-21.3-9.6-21.3-21.3-21.3z'
                />
                <Path id='Fill-50' d='M-197.4-236.1h2.8v2.8h-2.8z' />
                <Path id='Fill-51' d='M-195.2-238.9h-1.6l-.6-11.3v-8.5h2.8v8.5l-.6 11.3' />
            </G>
        </Svg>
    )
}

export default Overdue
