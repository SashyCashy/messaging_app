/**
 * Author : Sashank Pindiproli
 * Date: 17/02/2020
 * Description: This component is used to customize the inbuilt Status Bar of iPhone or Android phone
 */

import { Constants } from '../../Constants';
import React, { useState, useEffect } from 'react';
import {
  NetInfo,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function Status() {
  const [isConnected, setIsConnected] = useState(false);
  const backgroundColor = isConnected ? 'white' : 'red';

  const statusBar = (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? 'dark-content' : 'light-content'}
      animated={false}
    />
  );

  const handleConnectionChange = isConnected => {
    setIsConnected(isConnected);
  };

  const addConnectionListener = () => {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleConnectionChange
    );
  };

  const removeConnectionListener = () => {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      handleConnectionChange
    );
  };

  const fetchConnectionStatus = async () => {
    let connectionStatus = NetInfo.isConnected.fetch();
    setIsConnected(connectionStatus);
    addConnectionListener();
  };

  useEffect(() => {
    fetchConnectionStatus();
    return () => removeConnectionListener();
  }, [NetInfo]);
  const messageContainer = (
    <View style={styles.messageContainer} pointerEvents="none">
      {statusBar}
      {!isConnected && (
        <View style={styles.bubble}>
          <Text style={styles.text}>No Network connection</Text>
        </View>
      )}
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.status, { backgroundColor }]}>
        {messageContainer}
      </View>
    );
  }
  return null;
}
const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;
const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 50,
    alignItems: 'center'
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  text: {
    color: 'white'
  }
});
