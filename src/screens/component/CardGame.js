import React from 'react';
import {View, Text, Image} from 'react-native';

const CardGame = ({game}) => {
  return (
    <View
      style={{
        backgroundColor: '#bdbdbd',
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 3,
      }}>
      <Image
        style={{width: 100, height: 50}}
        source={{uri: game.background_image}}
        resizeMode="stretch"
      />
      <Text style={{color: 'black'}}>{game.name}</Text>
    </View>
  );
};

export default CardGame;
