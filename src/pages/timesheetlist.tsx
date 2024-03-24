import React, { useEffect, useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getDBConnection, getTimesheetDataById, deleteTimesheetData } from '../db/db-service';
import { TimesheetData } from '../models/models';
import { convertTimestampToDate, displayDuration } from '../services/commonService';

/**
 * The list of timesheets available for the logged in user. Update and deletion of timesheet is done here as well
 */
export default function TimesheetList({ navigation, route }: any): React.JSX.Element {
    const userId: String = route.params.userId;
    const [listData, setListData] = useState<TimesheetData[]>([]);

    const getTimesheetData = async (userId: String) => {
        try {
          const db = await getDBConnection();   
          const storedTimesheet = await getTimesheetDataById(db, userId);

          setListData(storedTimesheet);
        } catch (error) {
          console.error(error);
          throw Error('Failed to get timesheet data!!!');
        }
    };

    const deleteTimesheet = async (id:number) => {
        try {
            const db = await getDBConnection();
            await deleteTimesheetData(db, id);

            getTimesheetData(userId);
        } catch (error) {
            console.error(error);
        }
    }

    function formatDateDisplay(timestamp: number){
        let convertedDate: Date = convertTimestampToDate(timestamp);
        let month: string = convertedDate.getMonth() + 1 < 10 ? "0" + (convertedDate.getMonth() + 1) : (convertedDate.getMonth() + 1).toString();
        let tdate: string = convertedDate.getDate() < 10 ? "0" + convertedDate.getDate() : convertedDate.getDate().toString();
        let displayDate: String = convertedDate.getFullYear() + " - " + month + " - " + tdate;

        return displayDate;
    }

    useEffect(() => {
        getTimesheetData(userId);

        navigation.addListener(
            'focus',
            () => getTimesheetData(userId)
        )

    }, [userId]);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                { listData.length > 0 ?
                   ( <FlatList
                        data={listData}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.listviewItemWrapper}>
                                     <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => navigation.navigate("EditTimesheet", {
                                            userId: userId,
                                            item: item
                                        })}>
                                        <View style={styles.listviewItem}>
                                            <Text style={styles.listviewTitle}>{item.TaskInfo}</Text>
                                            <Text>Date: {formatDateDisplay(item.Date)}</Text>
                                            <Text>Duration: {displayDuration(item.HoursWorked)}</Text>
                                            <TouchableOpacity 
                                                style={styles.deleteButton}
                                                onPress={() => deleteTimesheet(item.Id)}>
                                                <View>
                                                    <Text style={styles.deleteText}>Delete</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                        
                                    
                                </View>
                            )
                        }}
                    />
                   )
                   : (
                    <Text>No Timesheet!</Text>
                   )} 
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
    listviewItemWrapper: {
        flexDirection: 'row',
        margin: 2
    },
    listviewTitle: {
        fontWeight: "bold",
        fontSize: 15
    },
    listviewItem: {
        borderColor: "#C7C7C7",
        borderWidth: 1,
        padding: 10,
        width: "100%",
        minWidth: "100%",
        flex: 1
    },
    deleteButton: {
        backgroundColor: "#FF1B1B",
        borderWidth: 1,
        borderRadius: 5,
        overflow: "hidden",
        borderColor: "#FF1B1B",
        width: 100,
        marginTop: 30
    },
    deleteText: {
        color: "#ffffff",
        textAlign: "center",
        fontWeight: "500"
    }
  });