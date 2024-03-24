import React from 'react';
import { SafeAreaView } from 'react-native';
import { getDBConnection, saveTimesheetData, updateTimesheetData, getTimesheetDataById } from '../db/db-service';
import { TimesheetData } from '../models/models';
import ManageTimesheet from './managetimesheet';

/**
 * Edit the existing timesheet for logged in user
 */
export default function EditTimeSheet({ navigation, route }: any): React.JSX.Element {
    const userId = route.params.userId;
    const item = route.params.item;

    const editTimesheet = async (timesheetData: TimesheetData) => {
        try {
          const db = await getDBConnection();   
          await updateTimesheetData(db, timesheetData);
    
          const storedTimesheet = await getTimesheetDataById(db, userId);
          console.log("### stored Timesheet by id: ", storedTimesheet);
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <SafeAreaView>
           <ManageTimesheet navigation={navigation} item={item} userId={userId} manageTimesheets={editTimesheet} />
        </SafeAreaView>
    )
}