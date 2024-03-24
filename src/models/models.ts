export type UserData = {
    UserId: String,
    Password: String,
    FullName: String
}

export type TimesheetData = {
    Id: number,
    UserId: string,
    Date: number,
    HoursWorked: number,
    TaskInfo: string,
    Comment: string
}