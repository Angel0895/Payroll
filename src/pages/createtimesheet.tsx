import React from 'react';
import { SafeAreaView } from 'react-native';
import { getDBConnection, saveTimesheetData, getTimesheetDataById } from '../db/db-service';
import { TimesheetData } from '../models/models';
import ManageTimesheet from './managetimesheet';

/**
 * Create new timesheet for logged in user
 */
export default function CreateTimeSheet({ navigation, route }: any): React.JSX.Element {
    const userId = route.params.userId;

    const addTimesheet = async (userData: TimesheetData) => {
        try {
          const db = await getDBConnection();   
          await saveTimesheetData(db, userData);
    
          const storedTimesheet = await getTimesheetDataById(db, userId);
          console.log("### stored Timesheet by id: ", storedTimesheet);
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <SafeAreaView>
           <ManageTimesheet navigation={navigation} userId={userId} manageTimesheets={addTimesheet} />
        </SafeAreaView>
    )

    /*return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.titleContainer}><Text style={styles.title}>Registration</Text></View>
                    <View style={styles.innerContainer}>
                        <Text>Date: </Text>
                        <DatePicker mode="date" date={date} onDateChange={setDate} />
                    </View>
                   <View style={styles.innerContainer}>
                        <Text>Hours Worked On: </Text>

                    </View>
                    <View style={styles.innerContainer}>
                        <Text>Tasks Info: </Text>
                        <TextInput 
                            onChangeText={newText => setTaskInfo(newText)}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.innerContainer}>
                        <Text>Comment: </Text>
                        <TextInput 
                            onChangeText={newText => setComment(newText)}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.emptySpace}></View>
                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Submit"
                            onPress={() => createTimesheet()}
                        />
                    </View>
                </View>
        </SafeAreaView>
    )*/
}