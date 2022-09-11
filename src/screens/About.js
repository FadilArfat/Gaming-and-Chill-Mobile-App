import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import photo from '../images/PP.png';
import Icon from 'react-native-vector-icons/FontAwesome';

const About = () => {
  const d = new Date();
  let year = d.getFullYear();
  const handleLink = link => {
    Linking.openURL(link).catch(err => console.log(err));
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B1320',
      }}>
      <Image
        source={photo}
        style={{
          width: 150,
          height: 150,
          resizeMode: 'cover',
          marginVertical: 10,
        }}
      />
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 21}}>
        Muhammad Fadilah Arfat
      </Text>
      <Text style={{color: 'white', fontWeight: 'bold'}}>(Developer)</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '50%',
          marginVertical: 15,
        }}>
        <TouchableOpacity
          onPress={() => handleLink('https://github.com/FadilArfat')}>
          <Icon name={'github'} size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleLink(
              'https://www.instagram.com/fadil991407/?__coig_restricted=1',
            )
          }>
          <Icon name={'instagram'} size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLink('https://www.linkedin.com/in/fadilarfat/')}>
          <Icon name={'linkedin'} size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLink('https://fadilarfat.netlify.app/')}>
          <Icon name={'globe'} size={30} color={'white'} />
        </TouchableOpacity>
      </View>
      <Text style={{color: 'white', fontSize: 16}}>App version : 1.0</Text>
      <Text style={{color: 'white', fontSize: 16}}>
        Copyright &copy; {year} NF.ID
      </Text>
    </View>
  );
};

export default About;
