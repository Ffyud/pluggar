import { Reply } from "./reply.enum";

export interface Card {
    sideA: string,
    sideB: string,
    answer?: Reply
}