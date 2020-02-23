/**
 * Author : Sashank Pindiproli
 * Date: 19/02/2020
 * Description: This component displays Grid
 */

import React from 'react';
import { Dimensions, FlatList, PixelRatio } from 'react-native';

export default function Grid({
  data,
  itemMargin,
  numColumns,
  renderItem,
  onEndReached
}) {
  /**
   *
   * @param {Object} info ----- It contains image information
   *
   */
  /**
   ------- SAMPLE IMAGE OBJECT INFORMATION -------
   {
    "index": 1,
    "item": Object {
      "uri": "https://picsum.photos/600/600?images=30",
    },
    "separators": Object {
      "highlight": [Function highlight],
      "unhighlight": [Function unhighlight],
      "updateProps": [Function updateProps],
   },
}
  */
  const renderGridItem = info => {
    const { index } = info;
    const { width } = Dimensions.get('window');
    const size = PixelRatio.roundToNearestPixel(
      (width - itemMargin * (numColumns - 1)) / numColumns
    );

    const marginLeft = index % numColumns === 0 ? 0 : itemMargin;
    const marginTop = index < numColumns ? 0 : itemMargin;

    return renderItem({ ...info, size, marginLeft, marginTop });
  };
  return (
    <FlatList
      data={data}
      renderItem={renderGridItem}
      numColumns={numColumns}
      onEndReached={() => onEndReached()}
      keyExtractor={({ uri }) => uri}
    />
  );
}
