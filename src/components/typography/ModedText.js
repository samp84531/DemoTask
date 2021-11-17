import React from 'react';
import { Text, StyleSheet } from 'react-native';
// import { fontFamilyBold, fontFamilyBoldItalic, fontFamilyItalic, fontFamilyLight, fontFamilyLightItalic, fontFamilyRegular } from '../../config/constants';

const ModedText = (props) => {
  const { fontWeight, ...rest}  = props.style;
  if (props.style.fontWeight && props.style.fontWeight == "bold") {
    // rest.fontFamily = fontFamilyBold
  } else {
    rest.fontWeight = props.style.fontWeight
  }

  return (
    <Text {...props} style={{...styles.baseStyle, ...rest }}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  baseStyle: {
    // fontFamily: fontFamilyRegular
  },
  bold: {
    // fontFamily: fontFamilyBold
  },
  boldItalic: {
    // fontFamily: fontFamilyBoldItalic
  },
  italic: {
    // fontFamily: fontFamilyItalic
  }
})

ModedText.defaultProps = {
  style: {
    fontWeight: 'normal'
  }
}

export default ModedText