/**
 * Author : Sashank Pindiproli
 * Date: 22/02/2020
 * Description: This component is used to maintain the logic to display IME and Keyboard
 */

import {
  BackHandler,
  LayoutAnimation,
  Platform,
  UIManager,
  View
} from 'react-native';
import React, { useState, useEffect } from 'react';

export const INPUT_METHOD = {
  NONE: 'NONE',
  KEYBOARD: 'KEYBOARD',
  CUSTOM: 'CUSTOM'
};

export default function MessageContainer({
  children,
  renderInputMethodEditor,
  inputMethod,
  containerHeight,
  contentHeight,
  keyboardHeight,
  keyboardWillShow,
  keyboardVisible,
  keyboardAnimationDuration,
  onChangeInputMethod
}) {
  const useContentHeight =
    keyboardWillShow || inputMethod === INPUT_METHOD.KEYBOARD;

  const containerStyle = {
    height: useContentHeight ? contentHeight : containerHeight
  };

  const showCustomInput =
    inputMethod === INPUT_METHOD.CUSTOM && !keyboardWillShow;

  const inputStyle = {
    height: showCustomInput ? keyboardHeight || 250 : 0
  };

  useEffect(() => {
    if (inputMethod !== INPUT_METHOD.CUSTOM)
      onChangeInputMethod(INPUT_METHOD.KEYBOARD);
    else {
      onChangeInputMethod(INPUT_METHOD.NONE);
    }

    const animation = LayoutAnimation.create(
      keyboardAnimationDuration,
      Platform.OS === 'android'
        ? LayoutAnimation.Types.easeInEaseOut
        : LayoutAnimation.Types.keyboard,
      LayoutAnimation.Properties.opacity
    );
    LayoutAnimation.configureNext(animation);
  }, [onChangeInputMethod, keyboardAnimationDuration, keyboardVisible]);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <View style={containerStyle}>
      {children}
      <View style={inputStyle}>{renderInputMethodEditor()}</View>
    </View>
  );
}
