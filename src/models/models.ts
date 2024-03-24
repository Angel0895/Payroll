/**
 * Data models for users and timesheet
 */

export type UserData = {
    UserId: string,
    Password: string,
    FullName: string
}

export type TimesheetData = {
    Id: number,
    UserId: string,
    Date: number,
    HoursWorked: number,
    TaskInfo: string,
    Comment: string
}