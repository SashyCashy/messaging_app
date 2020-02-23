/**
 * Author : Sashank Pindiproli
 * Date: 19/02/2020
 * Description: This component displays image grid
 */

import React, { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions';
import { CameraRoll, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Grid from './index';

export default function ImageGrid({ onPressImage }) {
  const [images, setImages] = useState([
    { uri: 'https://picsum.photos/600/600?images=10' },
    { uri: 'https://picsum.photos/600/600?images=20' },
    { uri: 'https://picsum.photos/600/600?images=30' },
    { uri: 'https://picsum.photos/600/600?images=40' }
  ]);

  const [cursor, setCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getImages(cursor);
  }, []);

  const getImages = async after => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      console.log('Camera roll permission denied');
      return;
    }

    if (isLoading) return;

    const results = await CameraRoll.getPhotos({ first: 20, after });
    const {
      edges,
      page_info: { has_next_page, end_cursor }
    } = results;

    if (has_next_page === false) return;

    const loadedImages = edges.map(item => item.node.image);
    setImages(loadedImages);
    setIsLoading(false);
    setCursor(has_next_page ? end_cursor : null);
  };

  const renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const style = {
      width: size,
      height: size,
      marginTop: marginTop,
      marginLeft: marginLeft
    };

    return (
      <TouchableOpacity
        key={uri}
        activeOpacity={0.75}
        onPress={() => onPressImage(uri)}
        style={style}
      >
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <Grid
      data={images}
      renderItem={renderItem}
      numColumns={4}
      itemMargin={4}
      onEndReached={() => getImages(cursor)}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1
  }
});
