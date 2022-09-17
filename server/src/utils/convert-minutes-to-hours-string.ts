
export function convertMinutesToHoursString(minutes: number) {

    const hour = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${String(hour).padStart(2, '0')}:${String(min).padEnd(2, '0')}`
}