
let boards = document.querySelectorAll('.board')
let columns = document.querySelectorAll('.column')

let titles = document.querySelectorAll('.handle-drag-title')

titles.forEach(title => {
    title.addEventListener('mousedown', () => {
        boards.forEach(board => {
            board.addEventListener('dragstart', dragstart) 
            board.addEventListener('drag', drag) 
            board.addEventListener('dragend', dragend) 
        })

        columns.forEach(column => {
            column.addEventListener('dragenter', dragenter)
            column.addEventListener('dragover', dragover)
            column.addEventListener('dragleave', dragleave)
            column.addEventListener('drop', drop)
        })  
    })


    title.addEventListener('mouseout', () => {
        boards.forEach(board => {
            board.removeEventListener('dragstart', dragstart) 
            board.removeEventListener('drag', drag) 
            board.removeEventListener('dragend', dragend) 
        })

        columns.forEach(column => {
            column.removeEventListener('dragenter', dragenter)
            column.removeEventListener('dragover', dragover)
            column.removeEventListener('dragleave', dragleave)
            column.removeEventListener('drop', drop)
        })
    })
})

function dragstart(e) {
    columns.forEach(column => column.classList.add('highlight'))

    let cloneBoard = this.cloneNode(true);

    cloneBoard.style.opacity = "1"
    cloneBoard.style.transform = "translateY(900px)";
    document.querySelector('body').appendChild(cloneBoard)

    e.dataTransfer.setDragImage(cloneBoard, 0, 0);

    setTimeout(() => {
        cloneBoard.parentNode.removeChild(cloneBoard);
    }, 1000);


    let sourceColumn = this.closest('.column')

    sourceColumn.classList.add('source')
    this.classList.add('is-dragging')
}

function drag() {}

function dragend() {
    columns.forEach(column => column.classList.remove('highlight'))
    this.classList.remove('is-dragging')
}

function dragenter() {  
}

function dragover(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'

    this.classList.add('over')

    const cardBeingDragged = document.querySelector('.is-dragging')
    
    this.appendChild(cardBeingDragged)
    
}

function dragleave() {
    this.classList.remove('over')
}

function drop() {
    let sourceColumn = document.querySelector('.source')

    let targetBoards = this.children

    if (targetBoards.length != 1) {
        sourceColumn.appendChild(targetBoards[0])
    }

    sourceColumn.classList.remove('source')
    this.classList.remove('over')
}