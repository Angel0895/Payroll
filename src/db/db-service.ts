import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import { UserData } from '../models/models'

enablePromise(true);

/*type UserData = {
    UserId: String,
    Password: String,
    FullName: String
}*/

const userTableName: string = "Users";

export const getDBConnection = async () => {
    return openDatabase({name: 'payroll.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${userTableName}(
          UserId varchar(255) NOT NULL, 
          Password varchar(255),
          FullMame varchar(255)
      );`;
  
    await db.executeSql(query);
};

/*export const getUserData = async (db: SQLiteDatabase): Promise<UserData[]> => {
    try {
      const userData: UserData[] = [];
      const results = await db.executeSql(`SELECT UserId as id, Password, FullName FROM ${userTableName}`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          userData.push(result.rows.item(index))
        }
      });
      return userData;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get todoItems !!!');
    }
  };*/

  export const saveUserData = async (db: SQLiteDatabase, userData: UserData[]) => {
    const insertQuery =
      `INSERT OR REPLACE INTO ${userTableName}(UserId, Password, FullName) values` +
      userData.map(i => `('${i.UserId}', '${i.Password}'m ), '${i.FullName}'`).join(',');
  
    return db.executeSql(insertQuery);
  };