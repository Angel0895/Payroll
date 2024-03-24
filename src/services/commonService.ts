/*
* This service contains commonly used functions 
*/

// Convert timestamp to date for datepicker and for display
export const convertTimestampToDate = (timestamp: number) => {
    if(timestamp === 0){
        return new Date();
    } else {
        return new Date(timestamp);
    }
}

// format duration for display
export const displayDuration = (hours: number) => {
    let durationArray: Array<String> = hours.toString().split(".");
    let formattedString: String = '';
    
    if (durationArray.length > 1) {
        let minutesLength: number = durationArray[1].length;
        let minutes:String = minutesLength === 1 && Number(durationArray[1]) < 10 ? durationArray[1] + "0" : durationArray[1];
        formattedString = durationArray[0] + " hr(s) " + minutes + " min(s)";
    } else {
        formattedString = durationArray[0] + " hr(s)";
    }

    return formattedString;
}
