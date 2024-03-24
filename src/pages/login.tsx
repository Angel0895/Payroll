import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    SafeAreaView, StyleSheet, Text, TextInput, View,
  } from 'react-native';
import { UserData } from '../models/models';
import { getDBConnection, saveUserData, getUserData, createTable } from '../db/db-service';
import Home from './home';
import Register from './register';

type registerItem = {
    registerUser: Function
}

/**
 * In this page, user logs in with the username and password
 */
export default function Login({ navigation }: any ): React.JSX.Element {
//export default function Register(props: registerItem): React.JSX.Element {
    const [userid, setUserId] = useState('');
    const [password, setPassword] = useState('');

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
        setUserId('');
        setPassword('');
    }

    function navigateToHome() {
        let currentUserId = userid;
        clearEntry();

        return (
            navigation.navigate('Home', {
                userId: currentUserId
            })
        )
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text>Username: </Text>
                    <TextInput 
                        onChangeText={newText => setUserId(newText)}
                        style={styles.textInput}
                        value={userid}
                    />
                </View>
                <View style={styles.innerContainer}>
                    <Text>Password: </Text>
                    <TextInput 
                        onChangeText={newText => setPassword(newText)}
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
                        onPress={() => { navigation.navigate("Register")}} />
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
        //justifyContent: "flex-start",
        //alignItems: "flex-start",
        margin: 20
    },
    innerContainer: {
        flexDirection: 'row',
        //justifyContent: "flex-start",
        //alignItems: "flex-start",
        width: "100%",
        margin: 10
    },
    emptySpace: {
        margin: 10
    }, 
    buttonContainer: {
        flexDirection: "row",
        //alignItems: "center", 
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

