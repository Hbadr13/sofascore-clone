import { EventAPIJson } from "./event";

export interface IRecentFormAPIJson {
    events: EventAPIJson[]
    points: { [eventId: string]: number }
}