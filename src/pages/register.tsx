import React, { useState } from 'react';
import {
    Button,
    SafeAreaView, StyleSheet, Text, TextInput, View,
  } from 'react-native';
import { UserData } from '../models/models';
import { getDBConnection, saveUserData, getUserData } from '../db/db-service';

/**
 * In this page, user register for new account
 */
export default function Register({ navigation }: any ): React.JSX.Element {
    const [userid, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullName] = useState('');

    const addUser = async (userData: UserData) => {
        try {
          const db = await getDBConnection();
          await saveUserData(db, userData);
    
          const storedUsers = await getUserData(db);
        } catch (error) {
          console.error(error);
        }
      };

    function register() {
        let user:UserData = {
            UserId: userid,
            Password: password,
            FullName: fullname
        }

        addUser(user);
        navigation.navigate("Login")
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
                <View style={styles.innerContainer}>
                    <Text>Fullname: </Text>
                    <TextInput 
                        onChangeText={newText => setFullName(newText)}
                        style={styles.textInput}
                        value={fullname}
                    />
                </View>
                <View style={styles.emptySpace}></View>
                <View style={styles.buttonContainer}>
                    <Button 
                        title="Submit"
                        onPress={() => register()}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
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
        flex: 1,
        alignItems: "center",
        width: "100%"
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

