export function convertHoursStringToMinutes(hourString: string) {
    const [hours, minutes] = hourString.split(':').map(Number);

    let minutesAmount = hours * 60 + minutes;

    return minutesAmount;
}