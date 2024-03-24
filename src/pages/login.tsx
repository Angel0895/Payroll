import React, { useEffect } from 'react';
import {
    Alert,
    Button,
    SafeAreaView, StyleSheet, Text, TextInput, View,
  } from 'react-native';
import { getDBConnection, saveUserData, getUserData, createTable } from '../db/db-service';
import { CommonActions } from '@react-navigation/native';
import type { RootState } from '../store/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { setUserId, setPassword } from '../slices/userSlice';

/**
 * In this page, user logs in with the username and password
 */
export default function Login({ navigation }: any ): React.JSX.Element {
    const dispatch = useDispatch();
    const userid = useSelector((state: RootState) => state.users.UserId);
    const password = useSelector((state: RootState) => state.users.Password);
   
    //const [userid, setUserId] = useState('');
    //const [password, setPassword] = useState('');

    const login = async () => {
        try {
          const db = await getDBConnection();
          const storedUsers = await getUserData(db);

          let loginSuccess = false;

          for( let i=0; i < storedUsers.length; i++ ) {
            if ( storedUsers[i].UserId === userid && storedUsers[i].Password === password ) {
                loginSuccess = true;
                navigateToHome();
            }
          }

          if ( !loginSuccess ) {
            Alert.alert("Invalid credentials!");
          }

        } catch (error) {
          console.error(error);
        }
    };

    function clearEntry() {
        dispatch(setUserId(''));
        dispatch(setPassword(''));
    }

    function navigateToHome() {
        let currentUserId = userid;
        clearEntry();

        navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'Home',
                  params: { userId: currentUserId },
                },
              ],
            })
          );
    }

    useEffect(() => {
        navigation.addListener(
            'focus', () => clearEntry()
        )
    });

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text>Username: </Text>
                    <TextInput 
                        onChangeText={newText => dispatch(setUserId(newText))}
                        style={styles.textInput}
                        value={userid}
                    />
                </View>
                <View style={styles.innerContainer}>
                    <Text>Password: </Text>
                    <TextInput 
                        onChangeText={newText => dispatch(setPassword(newText))}
                        style={styles.textInput}
                        secureTextEntry={true}
                        value={password}
                    />
                </View>
                <View style={styles.emptySpace}></View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonInnerContainer}>
                        <Button 
                            title="Login"
                            onPress={() => login()}
                        />
                    </View>
                    
                    <View style={styles.buttonInnerContainer}>
                        <Button 
                        title="register"
                        onPress={() => { 
                            clearEntry();
                            navigation.navigate("Register")
                        }} />
                    </View>
                </View>
            </View>
           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: "100%",
        margin: 20
    },
    innerContainer: {
        flexDirection: 'row',
        width: "100%",
        margin: 10
    },
    emptySpace: {
        margin: 10
    }, 
    buttonContainer: {
        flexDirection: "row",
        width: "100%"
    },
    buttonInnerContainer: {
        flex: 0.5,
        margin: 10
    }, 
    titleContainer: {
        alignItems: "center",
        width: "100%"
    },
    textInput: {
        borderColor: "#C9C9C9",
        borderWidth: 1,
        opacity: 0.5,
        marginLeft: 20,
        width: 200,
        padding: 0
    },
  });

