import React, { Children } from 'react';
import {TouchableOpacity, StyleSheet } from 'react-native';
import { purple, white } from '../utils/colors';

function TextButton({onPress, children, style={}}) {
  return (
    <TouchableOpacity style={[styles.reset, style, {color: purple}]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple,
  }
})



export default TextButton;
