/**
 * Author : Sashank Pindiproli
 * Date: 17/02/2020
 * Description: This component enables the user to type messages and contains Toolbar component
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import ToolbarButton from './ToolbarButton';

export default function Toolbar({
  onPressCamera,
  onPressLocation,
  onSubmit,
  onChangeFocus,
  isFocused
}) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const [inputRefVal, setInputRefVal] = useState(inputRef);
  const handleFocus = () => {
    onChangeFocus(true);
    inputRefVal.focus();
  };

  const handleBlur = () => {
    onChangeFocus(false);
    inputRefVal.blur();
    setText('');
  };

  useEffect(() => {
    return () => {
      if (isFocused) handleBlur();
    };
  }, [isFocused]);

  return (
    <View style={styles.toolbar}>
      <ToolbarButton title={'📷'} onPress={onPressCamera} />
      <ToolbarButton title={'⛱ '} onPress={onPressLocation} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          underlineColorAndroid={'transparent'}
          placeholder={'Type Something'}
          value={text}
          onChangeText={input => setText(input)}
          onSubmitEditing={() => onSubmit(text)}
          ref={input => {
            setInputRefVal(input);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: 'white'
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.02)'
  },
  input: {
    flex: 1,
    fontSize: 18
  }
});
