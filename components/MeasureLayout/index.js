/**
 * Author : Sashank Pindiproli
 * Date: 22/02/2020
 * Description: This component is wrapper that contains custom Keyboard and calculates View are depending on KeyboardState
 */

import { Constants } from '../../Constants';
import { Platform, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

export default function MeasureLayout({ children }) {
  const [layout, setLayout] = useState(null);

  const handleLayout = event => {
    const { nativeEvent } = event;

    if (nativeEvent !== undefined) {
      const { layout } = nativeEvent;
      setLayout({
        ...layout,
        y:
          layout.y + (Platform.OS === 'android' ? Constants.statusBarHeight : 0)
      });
    }
  };

  if (!layout) {
    return (
      <View
        onLayout={event => handleLayout(event)}
        style={styles.container}
      ></View>
    );
  }

  return children(layout);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
