import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Block, Text} from 'galio-framework';
import {keluarDariAplikasi} from '../authentication/firebase';
import {
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  View,
  Button,
} from 'react-native';
import ProfilePic from '../images/user.png';
import {useSelector} from 'react-redux';
import {FlatGrid} from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import BannerProfile from '../images/banner_profile.jpg';
import {getAllData} from '../context/SliceUser';
import {auth} from '../authentication/firebase';
import {signOut} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const list = useSelector(getAllData);
  const navigation = useNavigation();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => navigation.reset({index: 0, routes: [{name: 'Home'}]}));

      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Block style={{flex: 1, backgroundColor: '#0B1320'}}>
      <Block
        middle
        style={{
          flex: 0.6,
          backgroundImage: BannerProfile,
          backgroundColor: 'gray',
        }}>
        <Image
          source={BannerProfile}
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: 1,
            position: 'absolute',
          }}
        />
        <Image
          source={{
            uri: list.images
              ? list.images
              : 'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top',
          }}
          style={{width: 80, height: 80, borderRadius: 50, elevation: 10}}
        />
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 18,
            elevation: 10,
            marginVertical: 10,
          }}>
          {list.username ? list.username : 'No Name'}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Edit')}
            style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.OutlineText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogOut}
            style={[styles.button, styles.buttonOutlineDanger]}>
            <Text style={styles.OutlineTextDanger}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Block>
      <Block>
        <Text
          style={{
            marginHorizontal: 10,
            fontWeight: 'bold',
            padding: 10,
            color: 'white',
            fontSize: 20,
          }}>
          My games :
        </Text>
      </Block>

      <FlatGrid
        data={list.game}
        keyExtractor={item => item.id}
        style={{flex: 1, borderRadius: 5}}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Detail', {
                  paramKey: item.id,
                })
              }
              style={{
                backgroundColor: 'white',
                height: 200,
                borderRadius: 10,
              }}>
              <Image
                source={{uri: item.background_image}}
                style={{
                  position: 'absolute',
                  width: 165,
                  height: 200,
                  borderRadius: 10,
                }}
              />
              <LinearGradient
                colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)', 'rgb(0,0,0)']}
                style={styles.linearGradient}>
                <Text
                  style={{
                    color: 'white',
                    flex: 1,
                    justifyContent: 'flex-end',
                    textAlignVertical: 'bottom',
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    fontWeight: 'bold',
                  }}>
                  {item.name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        }}
      />
    </Block>
  );
};

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: 'white',
    backgroundColor: 'transparent',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 5,
    padding: 6,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  buttonOutline: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginTop: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  buttonOutlineDanger: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginTop: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  buttonText: {
    color: 'rgba(0,0,0,0.4)',
    fontWeight: '700',
    fontSize: 16,
  },
  OutlineText: {
    color: 'white',
    fontWeight: 'light',
    fontSize: 16,
  },
  OutlineTextDanger: {
    color: 'white',
    fontWeight: 'light',
    fontSize: 16,
  },
});

export default Profile;
