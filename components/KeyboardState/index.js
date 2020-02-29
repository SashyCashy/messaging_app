/**
 * Author : Sashank Pindiproli
 * Date: 19/02/2020
 * Description: This component is wrapper that contains custom Keyboard and calculates View are depending on KeyboardState
 */

import { Keyboard, Platform } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';

const INITIAL_ANIMATION_DURATION = 250;

export default function KeyboardState({ children, layout }) {
  let { height } = layout;
  const [contentHeight, setContentHeight] = useState(height);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardWillShow, setKeyboardWillShow] = useState(false);
  const [keyboardWillHide, setKeyboardWillHide] = useState(false);

  const [keyboardAnimationDuration, setKeyboardAnimationDuration] = useState(
    INITIAL_ANIMATION_DURATION
  );
  const [subscriptions, setSubscriptions] = useState(null);

  const measure = event => {
    if (!!event) {
      const {
        endCoordinates: { height, screenY },
        duration = INITIAL_ANIMATION_DURATION
      } = event;

      setContentHeight(screenY - layout.y);
      setKeyboardHeight(height);
      setKeyboardAnimationDuration(duration);
    }
  };

  const keyboardDidShowFn = event => {
    setKeyboardWillShow(false);
    setKeyboardVisible(true);
    console.log('Here in did show');
    measure(event);
  };

  const keyboardWillShowFn = event => {
    setKeyboardWillShow(true);
    measure(event);
  };

  const keyboardWillHideFn = event => {
    setKeyboardWillHide(true);
    measure(event);
  };

  const keyboardDidHideFn = event => {
    setKeyboardWillHide(false);
    console.log('Here in did hide');
    setKeyboardVisible(false);
    measure(event);
  };

  useLayoutEffect(() => {
    console.log('layout here ', layout);
    setSubscriptions([
      Keyboard.addListener('keyboardDidHide', keyboardDidHideFn),
      Keyboard.addListener('keyboardDidShow', keyboardDidShowFn)
    ]);
    if (Platform.OS === 'ios') {
      setSubscriptions([
        ...subscriptions,
        Keyboard.addListener('keyboardWillShow', keyboardWillShowFn),
        Keyboard.addListener('keyboardWillHide', keyboardWillHideFn)
      ]);
    }

    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, [layout]);

  return children({
    containerHeight: layout.height,
    contentHeight,
    keyboardHeight,
    keyboardVisible,
    keyboardWillShow,
    keyboardWillHide,
    keyboardAnimationDuration
  });
}
