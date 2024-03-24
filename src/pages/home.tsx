import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

/**
 * This page is the first page after logged
 * This page has the menu to navigate to create timesheet, and to view, edit and delete timesheet
 */
export default function Home({ navigation, route }: any): React.JSX.Element {
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
    }
});