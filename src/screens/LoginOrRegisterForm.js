import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  BackHandler,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useAuthState} from 'react-firebase-hooks/auth';
import {
  auth,
  db,
  app,
  registerDenganEmailDanPassword,
  loginDenganEmailDanPassword,
  resetPassword,
} from '../authentication/firebase';
import firestore from '@react-native-firebase/firestore';
import Logo from '../images/logo.png';

const LoginOrRegisterForm = ({loginOrRegister}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const [spin, setSpin] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async (e, p) => {
    try {
      setSpin(true);
      await registerDenganEmailDanPassword(e, p);
      await firestore()
        .collection('favorites')
        .doc(auth.currentUser.uid)
        .set({
          username: username,
          email: email,
          game: [],
          uid: auth.currentUser.uid,
          images: null,
        })
        .then(() => {
          console.log('User added!');
        });
      setSpin(false);
    } catch (error) {
      setSpin(false);
      console.log(error);
    }
  };

  const handleLogin = async (e, p) => {
    try {
      setSpin(true);
      loginDenganEmailDanPassword(e, p);
      setSpin(false);
    } catch (error) {
      setSpin(false);
      console.log(error);
    }
  };

  const handleReset = async e => {
    try {
      setSpin(true);
      resetPassword(e);
      setSpin(false);
      navigation.navigate('Login');
    } catch (error) {
      setSpin(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to quit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    if (user) {
      navigation.navigate('Home');
    }
    return () => backHandler.remove();
  }, [user]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        source={Logo}
        style={{resizeMode: 'contain', flex: 0.3, width: 300}}
      />
      <Text style={{color: 'black'}}>
        {loginOrRegister === 'login'
          ? 'Login Page'
          : loginOrRegister === 'register'
          ? 'Register Page'
          : 'Reset Password'}
      </Text>
      <View style={styles.inputContainer}>
        {loginOrRegister === 'register' ? (
          <TextInput
            placeholder="Username"
            autoCorrect={false}
            onChangeText={text => setUsername(text)}
            style={styles.input}
          />
        ) : null}

        <TextInput
          placeholder="Email"
          autoCorrect={false}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        {loginOrRegister === 'login' || loginOrRegister === 'register' ? (
          <TextInput
            placeholder="Password"
            autoCapitalize={false}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            style={styles.input}
          />
        ) : null}
      </View>
      {loginOrRegister == 'login' && (
        <TouchableOpacity onPress={() => navigation.navigate('reset')}>
          <Text style={{color: 'black', marginTop: 10}}>forgot password?</Text>
        </TouchableOpacity>
      )}
      <View style={styles.buttonContainer}>
        {loginOrRegister === 'login' ? (
          <TouchableOpacity
            onPress={() => handleLogin(email, password)}
            style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.OutlineText}>Login</Text>
          </TouchableOpacity>
        ) : loginOrRegister == 'register' ? (
          <TouchableOpacity
            onPress={() => handleSignUp(email, password)}
            style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.OutlineText}>Register</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleReset(email)}
            style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.OutlineText}>Reset Password</Text>
          </TouchableOpacity>
        )}
      </View>
      {loginOrRegister === 'login' ? (
        <TouchableOpacity
          style={{marginVertical: 5}}
          onPress={() => navigation.navigate('Register')}>
          <Text style={{color: 'black'}}>
            Do not have account?, Register here.
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{marginVertical: 5}}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{color: 'black'}}>
            Already have account?, Login here
          </Text>
        </TouchableOpacity>
      )}
      {spin ? <ActivityIndicator size="small" color="#0000ff" /> : null}
    </KeyboardAvoidingView>
  );
};

export default LoginOrRegisterForm;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    color: 'black',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#0782f9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782f9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  OutlineText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
});
