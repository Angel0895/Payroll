import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TimesheetData } from '../models/models';
import DatePicker from 'react-native-date-picker'
import { TimerPickerModal } from "react-native-timer-picker";
import { convertTimestampToDate, displayDuration } from '../services/commonService';

type timesheetItem = {
    item?: TimesheetData
    navigation: any
    userId: string
    manageTimesheets: Function
}

type durationFormat = {
    hours: number
    minutes: number
    seconds: number
}

/*
 * This page contains the fields for timesheet submission and update
 */
export default function ManageTimesheet(props: timesheetItem): React.JSX.Element {
    const item: TimesheetData | undefined = props.item;
    let initialDate: number = item !== undefined ? item.Date : 0;
    let initialHoursWorked: number = item !== undefined ? item.HoursWorked : 0.0;
    let initialTaskInfo: string = item !== undefined ? item.TaskInfo : '';
    let initialComment: string = item !== undefined ? item.Comment : '';

    const [date, setDate] = useState(initialDate);
    const [hoursWorked, setHoursWorked] = useState(initialHoursWorked);
    const [taskInfo, setTaskInfo] = useState(initialTaskInfo);
    const [comment, setComment] = useState(initialComment);
    const [showPicker, setShowPicker] = useState(false);

    function makeTimesheet() {
        let timesheet:TimesheetData = {
            Id: item !== undefined ? item.Id : 0,
            UserId: props.userId,
            Date: date,
            HoursWorked: hoursWorked,
            TaskInfo: taskInfo,
            Comment: comment
        }

        console.log("### timesheet: ", timesheet);

        props.manageTimesheets(timesheet);
        props.navigation.goBack();
    }

    function saveDate(date: Date) {
        let timestamp:number = convertDate(date);
        setDate(timestamp);
    }

    function convertDate(date: Date) {
        return date.getTime();
    }

    function formatTime(duration: durationFormat) {
        let minutes:String = duration.minutes < 10 ? "0" + duration.minutes.toString() : duration.minutes.toString();
        let formattedTime: number = Number(duration.hours + "." + minutes);
        return formattedTime;
    }

    function initialMinutes(hours: number){
        let durationArray: Array<String> = hours.toString().split(".");
        
        if (durationArray.length > 1) {
            let minutesLength: number = durationArray[1].length;
            let minutes:String = minutesLength === 1 && Number(durationArray[1]) < 10 ? durationArray[1] + "0" : durationArray[1];
            return Number(minutes)
        }
    
        return 0;
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text>Date: </Text>
                <DatePicker mode="date" date={convertTimestampToDate(date)} onDateChange={saveDate} />
            </View>
            <View style={styles.innerContainer}>
                <Text>Hours Worked On: </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShowPicker(true)}>
                    <View style={{alignItems: "center"}}>
                        {hoursWorked !== null ? (
                            <Text style={{color: "#808080", fontSize: 16}}>
                                {displayDuration(hoursWorked)}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setShowPicker(true)}>
                            <View style={{marginTop: 30}}>
                                <Text
                                    style={{
                                        paddingVertical: 10,
                                        paddingHorizontal: 18,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        fontSize: 12,
                                        overflow: "hidden",
                                        borderColor: "#A3A3A3",
                                        color: "#A3A3A3"
                                    }}>
                                    Set Hours Worked
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <TimerPickerModal 
                    visible = {showPicker}
                    setIsVisible={ setShowPicker }
                    onConfirm={(pickedDuration) => {
                        setHoursWorked(formatTime(pickedDuration));
                        console.log("### pickedDuration: ", pickedDuration);
                        setShowPicker(false);
                    }}
                    onCancel={()=>setShowPicker(false)}
                    hideSeconds={true}
                    initialHours={Number(hoursWorked.toString().split(".")[0])}
                    initialMinutes={initialMinutes(hoursWorked)}
                    styles={{
                        theme: "light",
                        text: {
                            color: "#808080"
                        }
                    }}
                />
            </View>
            <View style={styles.innerContainer}>
                <Text>Tasks Info: </Text>
                <TextInput 
                    onChangeText={newText => setTaskInfo(newText)}
                    style={styles.textInput}
                    value={taskInfo}
                />
            </View>
            <View style={styles.innerContainer}>
                <Text>Comment: </Text>
                <TextInput 
                    onChangeText={newText => setComment(newText)}
                    style={styles.textInput}
                    value={comment}
                />
            </View>
            <View style={styles.emptySpace}></View>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Submit Timesheet"
                    onPress={() => makeTimesheet()}
                />
            </View>
        </View>
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
    innerContainer: {
        flexDirection: 'row',
        width: "100%",
        margin: 10
    },
    emptySpace: {
        margin: 10
    }, 
    buttonContainer: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    titleContainer: {
        alignItems: "center",
        width: "100%"
    },
    textInput: {
        borderColor: "#C9C9C9",
        borderWidth: 1,
        opacity: 0.5,
        marginLeft: 20,
        width: 200,
        padding: 0
    },
  });