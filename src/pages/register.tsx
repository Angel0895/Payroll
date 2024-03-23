import React from 'react';
import {
    SafeAreaView, StyleSheet, View,
  } from 'react-native';
import { UserData } from '../models/models'

type registerItem = {
    userData: UserData,
    deleteItem: Function
}

export default function Register(props: registerItem): React.JSX.Element {
    return (
        <SafeAreaView>
            <View>
                
            </View>
        </SafeAreaView>
    )
}

