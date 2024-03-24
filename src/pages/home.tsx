import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * This page is the first page after logged in
 * This page has the menu to navigate to create timesheet, to view timesheet, and to log out
 */
export default function Home({ navigation, route }: any): React.JSX.Element {
    function logout() {
        navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'Login'
                },
              ],
            })
          );
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonInnerContainer}>
                        <Button 
                            title="Create New Timesheet"
                            onPress={() => { navigation.navigate("CreateTimesheet", {
                                userId: route.params.userId
                            }) } }
                        />
                    </View>
                    <View style={styles.buttonInnerContainer}>
                        <Button 
                        title="Timesheet History"
                        onPress={() => { navigation.navigate("TimesheetList", {
                            userId: route.params.userId
                        })}} />
                    </View>
                   
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                                style={styles.logoutButton}
                                onPress={() => logout()}>
                                    <View>
                                        <Text style={styles.logoutText}>Log Out</Text>
                                    </View>
                        </TouchableOpacity>
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
    emptySpace: {
        margin: 10
    }, 
    buttonContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-start"
    },
    buttonInnerContainer: {
        margin: 5
    }, 
    titleContainer: {
        alignItems: "center",
        width: "100%"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12
    },
    logoutButton: {
        backgroundColor: "#FF3131",
        borderWidth: 1,
        borderRadius: 5,
        overflow: "hidden",
        borderColor: "#FF1B1B",
        height: 40,
        marginTop: 50,
        justifyContent: "center"
    },
    logoutText: {
        color: "#ffffff",
        textAlign: "center",
        fontWeight: "500"
    }
});