import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import { observer } from 'startupjs'
import SHADOWS from './shadows'
import './index.styl'
function Div ({
  style,
  children,
  level,
  onPress,
  ...props
}) {
  let Wrapper = typeof onPress === 'function'
    ? TouchableOpacity
    : View

  return pug`
    Wrapper.root(
      style=[style, SHADOWS[level]]
      styleName=[{
        'with-shadow': !!level,
        clickable: typeof onPress === 'function'
      }]
      activeOpacity=0.25
      onPress=onPress
      ...props
    )
      = children
  `
}

Div.defaultProps = {
  level: 0
}

Div.propTypes = {
  level: PropTypes.oneOf(Object.keys(SHADOWS).map(k => +k)),
  onPress: PropTypes.func
}

export default observer(Div)
