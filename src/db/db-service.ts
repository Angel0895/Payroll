import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import { UserData, TimesheetData } from '../models/models'

enablePromise(true);

const userTableName: string = "Users";
const timesheetTableName: string = "Timesheets";

/**
 * This service create tables for user and timesheet, interact with both tables, and open database for use
 */
export const getDBConnection = async () => {
    return openDatabase({name: 'payroll.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
    // create table if not exists
    const userQuery = `CREATE TABLE IF NOT EXISTS ${userTableName}(
          UserId varchar(255) NOT NULL, 
          Password varchar(255),
          FullName varchar(255)
      );`;
  
    await db.executeSql(userQuery);

    const timesheetQuery = `CREATE TABLE IF NOT EXISTS ${timesheetTableName}(
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      UserId varchar(255) NOT NULL, 
      Date int(255), 
      HoursWorked float(3, 2),
      TaskInfo varchar(255),
      Comment varchar(255)
    );`;

    await db.executeSql(timesheetQuery);
};

export const getUserData = async (db: SQLiteDatabase): Promise<UserData[]> => {
    try {
      const userData: UserData[] = [];
      const results = await db.executeSql(`SELECT * FROM ${userTableName}`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          userData.push(result.rows.item(index))
        }
      });
      return userData;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get user data!!!');
    }
  };

  export const saveUserData = async (db: SQLiteDatabase, userData: UserData) => {
    const insertQuery =
      `INSERT OR REPLACE INTO ${userTableName}(UserId, Password, FullName) values ` +
      `('${userData.UserId}', '${userData.Password}', '${userData.FullName}')`;
  
    return db.executeSql(insertQuery);
  };

  export const getTimesheetData = async (db: SQLiteDatabase): Promise<TimesheetData[]> => {
    try {
      const timesheetData: TimesheetData[] = [];
      const results = await db.executeSql(`SELECT * FROM ${timesheetData}`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          timesheetData.push(result.rows.item(index))
        }
      });
      return timesheetData;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get timesheet data!!!');
    }
  };

  export const getTimesheetDataById = async (db: SQLiteDatabase, userId: String): Promise<TimesheetData[]> => {
    try {
      const timesheetData: TimesheetData[] = [];
      const results = await db.executeSql(`SELECT * FROM ${timesheetTableName} WHERE UserId = "${userId}"`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          timesheetData.push(result.rows.item(index))
        }
      });
      return timesheetData;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get timesheet data!!!');
    }
  };

  export const saveTimesheetData = async (db: SQLiteDatabase, timesheetData: TimesheetData) => {
    const insertQuery =
      `INSERT OR REPLACE INTO ${timesheetTableName}(UserId, Date, HoursWorked, TaskInfo, Comment) values ` +
      `('${timesheetData.UserId}', ${timesheetData.Date}, ${timesheetData.HoursWorked}, '${timesheetData.TaskInfo}', '${timesheetData.Comment}')`;
  
    return db.executeSql(insertQuery);
  };

  export const deleteTimesheetData = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery = `DELETE from ${timesheetTableName} where Id = ${id}`;
    await db.executeSql(deleteQuery);
  };

  export const updateTimesheetData = async (db: SQLiteDatabase, timesheetData: TimesheetData) => {
    console.log("### timesheet: ", timesheetData);

    const updateQuery =
      `UPDATE ${timesheetTableName} 
        SET Date = ${timesheetData.Date}, 
        HoursWorked = ${timesheetData.HoursWorked}, 
        TaskInfo = '${timesheetData.TaskInfo}', 
        Comment = '${timesheetData.Comment}'  
        where Id = ${timesheetData.Id}`;

    console.log("### update query: ", updateQuery);
  
    return db.executeSql(updateQuery);
  };