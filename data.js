
const templateCardHTML = (cards, board_id) => {
    return cards.map(({content, boardId, labels, _id}) => {
        if(boardId == board_id){
            return `
                <div class="card" draggable="true" data-id=${_id} data-board=${boardId}>
                    <div class="container-status">
                        ${labels.map(label => `<div class="status ${label}"></div>` ).join(' ')}
                    </div>
                    <div class="content">${content}</div>
                </div>
            `
        }else{
            return ''
        }
    }).join(' ')
} 


const templateBoardHTML = (boards, cards) => {
    return boards.map(board => {
        const { title, _id } = board 
        return `
            <div class="column">
                <div class="board" draggable="true" data-id=${_id}>
                    <h3 class="handle-drag-title">${title}</h3>
                    <div class="dropzone">${templateCardHTML(cards, _id)}</div>
                </div>
            </div>
        `
    }).join(' ')
}

class Kanban {
    constructor(container) {
        this.container = container
        this.boards = null
        this.cards = null
        this.labels = null
    }

    loadBoards = () => {
        const { boards, cards, container } = this
        let allBoards = templateBoardHTML(boards, cards)
        container.innerHTML = allBoards
    }

    getBoards = () => {
        const { boards } = localStorage
        this.boards = boards ? JSON.parse(boards) : null
    }

    getCards = () => {
        const { cards } = localStorage
        this.cards = cards ? JSON.parse(cards) : null
    }
}

const fake = {
    createBoards: () => {
        const boards = [
            { _id: 1, title: 'Todo' },
            { _id: 2, title: 'In progress' },
            { _id: 3, title: 'Done' }
        ]

        localStorage.boards = JSON.stringify(boards)
    },
    createCards: () => {
        const cards = [
            { _id: 1, content: 'Do vídeos', boardId: 1, labels: ['green', 'red'] },
            { _id: 2, content: 'Fórums', boardId: 2, labels: ['blue', 'red'] },
            { _id: 3, content: 'Next level week', boardId: 3, labels: ['red'] },
        ]

        localStorage.cards = JSON.stringify(cards)
    }
}


fake.createBoards()
fake.createCards()

const container = document.querySelector('.boards')
const kanban = new Kanban(container)

kanban.getBoards()
kanban.getCards()
kanban.loadBoards()