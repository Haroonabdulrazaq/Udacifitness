import React, { Children } from 'react';
import {TouchableOpacity} from 'react-native';

function TextButton({onPress, children}) {
  return (
    <TouchableOpacity onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

export default TextButton;
