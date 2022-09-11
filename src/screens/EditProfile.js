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
  Alert,
} from 'react-native';
import ProfilePic from '../images/user.png';
import {useSelector} from 'react-redux';
import BannerProfile from '../images/banner_profile.jpg';
import {getAllData} from '../context/SliceUser';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {auth} from '../authentication/firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
const EditProfile = () => {
  const list = useSelector(getAllData);
  const [username, setUsername] = useState('');
  const [downloadURL, setDownloadURL] = useState();
  console.log(downloadURL);

  const onSelectImagePress = async () => {
    try {
      launchImageLibrary({mediaType: 'image'}, onMediaSelect);
    } catch (error) {
      console.log(error);
    }
  };
  const onMediaSelect = async media => {
    try {
      if (!media.didCancel) {
        const reference = storage().ref(media.fileName);
        const task = reference.putFile(media.uri);
        task.then(async () => {
          const downloadURL = await reference.getDownloadURL();
          setDownloadURL(downloadURL);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (downloadURL === null && list.images) {
        setDownloadURL(list.images);
      }
      if (username == null && list.username) {
        setUsername(list.username);
      }
      await firestore()
        .collection('favorites')
        .doc(auth.currentUser.uid)
        .update({
          username: username,
          images: downloadURL,
        })
        .then(() => {
          console.log('User updated!');
          Alert.alert('User updated!');
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Block style={{flex: 1, backgroundColor: '#1C3F60'}}>
      <Block
        middle
        style={{
          flex: 0.2,
          backgroundImage: BannerProfile,
        }}>
        <ImageBackground
          source={{
            uri: list.images
              ? list.images
              : 'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top',
          }}
          style={{width: 100, height: 100}}
          imageStyle={{borderRadius: 50}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={onSelectImagePress}>
              <MaterialCommunityIcons
                name="camera"
                size={35}
                color="#fff"
                style={{
                  opacity: 0.7,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: '#fff',
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Block>
      <Block style={{flex: 0.8}}>
        <Text
          style={{
            marginHorizontal: 10,
            fontWeight: 'bold',
            padding: 10,
            color: 'white',
            fontSize: 20,
          }}>
          Edit your profile :
        </Text>
        <Text style={{marginHorizontal: 15, color: 'white', marginTop: 15}}>
          Username
        </Text>
        <TextInput
          placeholder={list.username}
          autoCorrect={false}
          onChangeText={text => setUsername(text)}
          style={styles.input}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <TouchableOpacity
            onPress={handleUpdate}
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)',
              padding: 10,
              borderRadius: 5,
              width: 100,
              alignItems: 'center',
              borderColor: 'white',
              borderWidth: 1,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                borderColor: 'white',
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </Block>
    </Block>
  );
};

var styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 10,
  },
});

export default EditProfile;
