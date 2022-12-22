import React, {useState} from 'react';
import {Block, Text} from 'galio-framework';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {useSelector} from 'react-redux';
import BannerProfile from '../images/banner_profile.jpg';
import {getAllData} from '../context/SliceUser';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {auth} from '../authentication/firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useEffect} from 'react';
const EditProfile = () => {
  const list = useSelector(getAllData);
  const [username, setUsername] = useState('');
  const [downloadURL, setDownloadURL] = useState('');
  const [spin, setSpin] = useState(false);
  console.log(spin);

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
        setSpin(true);
        const reference = storage().ref(media.fileName);
        const task = reference.putFile(media.uri);
        task.then(async () => {
          const downloadURL = await reference.getDownloadURL();
          setDownloadURL(downloadURL);
        });
        setSpin(false);
      }
    } catch (error) {
      setSpin(false);
      console.log(error);
    }
  };

  const handleUsernamChange = text => {
    setUsername(text);
  };

  const handleUpdate = async () => {
    try {
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

  useEffect(() => {
    if (list.images && list.username) {
      setDownloadURL(list.images);
      setUsername(list.username);
    }
  }, []);

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
              ? downloadURL
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
              {!spin ? (
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
              ) : (
                <MaterialCommunityIcons
                  name="loading"
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
              )}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Block>
      {spin ? (
        <Text style={{marginHorizontal: 15, color: 'white', marginTop: 15}}>
          Loading
        </Text>
      ) : null}
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
          placeholder="Username"
          autoCorrect={false}
          onChangeText={handleUsernamChange}
          style={styles.input}
          value={username}
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
    color: 'black',
  },
});

export default EditProfile;
