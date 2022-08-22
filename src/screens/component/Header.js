import {View, Text} from 'react-native';
import React from 'react';

function Header({props}) {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#337bff',
          paddingHorizontal: 20,
          paddingVertical: 15,
          elevation: 10,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
          Discover
        </Text>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
          {props}
        </Text>
      </View>
    </View>
  );
}

export default Header;
