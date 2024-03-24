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
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <SafeAreaView>
           <ManageTimesheet navigation={navigation} userId={userId} manageTimesheets={addTimesheet} />
        </SafeAreaView>
    )
}