export default class Board {
    key?: string | null;
    title?: string;
    columns: Column[];
}

export class Column {
    key?: string | null;
    boardId?: string;
    title?: string;
    cards?: Card[];
}

export class Card {
    key?: string | null;
    boardId?: string;
    columnId?: string;
    title?: string;
    image?: string;
}