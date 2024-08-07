export interface CustomDate {
    date?: string;
    week: string;
    day: string | number;
    state: string;
}

export function stringfyDate(date: Date): string {
    return date.toISOString().slice(0, 10)
}

export function stringfyTime(date: Date): string {
    return date.toISOString().slice(11, 19)
}

export function floatTime(date: Date): number {
    return date.getHours() + date.getMinutes()/60 + date.getSeconds()/3600
}