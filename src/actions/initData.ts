export const initData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-3', 'column-2', 'column-1'],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: 'Todo-1',
                    cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6'],
                    cards: [
                        {
                            id: 'card-1',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card 1',
                            image: 'data:image/png;base64,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'
                        },
                        {
                            id: 'card-2',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card 2',
                            image: null
                        },
                        {
                            id: 'card-3',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card 3',
                            image: null
                        },
                        {
                            id: 'card-4',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card 4',
                            image: null
                        },
                        {
                            id: 'card-5',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card 5',
                            image: null
                        },
                        {
                            id: 'card-6',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card 6',
                            image: null
                        },
                        {
                            id: 'card-6',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card 6',
                            image: null
                        },
                        {
                            id: 'card-6',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card 6',
                            image: null
                        }
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'Todo-2',
                    cardOrder: ['card-7', 'card-8', 'card-9'],
                    cards: [
                        {
                            id: 'card-7',
                            boardId: 'board-1',
                            columnId: 'column-2',
                            title: 'Title of card 7',
                            image: null
                        },
                        {
                            id: 'card-8',
                            boardId: 'board-1',
                            columnId: 'column-2',
                            title: 'Title of card 8',
                            image: null
                        },
                        {
                            id: 'card-9',
                            boardId: 'board-1',
                            columnId: 'column-2',
                            title: 'Title of card 9',
                            image: null
                        }
                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: 'Todo-3',
                    cardOrder: ['card-10', 'card-11'],
                    cards: [
                        {
                            id: 'card-10',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'Title of card 10',
                            image: null
                        },
                        {
                            id: 'card-11',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'Title of card 11',
                            image: null
                        }
                    ]
                }
            ]
        }
    ]
}