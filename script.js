

const cards = document.querySelectorAll('.card')
const dropzones = document.querySelectorAll('.dropzone')

cards.forEach(card => {
    card.addEventListener('dragstart', dragstart) // começou a arrastar
    card.addEventListener('drag', drag) // arrastando
    card.addEventListener('dragend', dragend) // soltou, deixou de soltar
})


function dragstart(){
    // console.log('CARD: Start dragging')
    dropzones.forEach(dropzone => dropzone.classList.add('highlight'))

    this.classList.add('is-dragging')
}

function drag(){
    // console.log('CARD: Is dragging')
}

function dragend(){
    // console.log('CARD: Stop dragging')
    dropzones.forEach(dropzone => dropzone.classList.remove('highlight'))
    this.classList.remove('is-dragging')
}

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragenter', dragenter)
    dropzone.addEventListener('dragover', dragover)
    dropzone.addEventListener('dragleave', dragleave)
    dropzone.addEventListener('drop', drop)
    dropzone.addEventListener('dragdrop', drop)
})


function dragenter(){
    // console.log('DROPZONE: Enter in zone') // entrou na zona
}

function dragover(){
    this.classList.add('over')
    // console.log('DROPZONE: Over') // estou dentro na zona

    const cardBeingDragged = document.querySelector('.is-dragging')
    this.appendChild(cardBeingDragged)
}

function dragleave(){
    // console.log('DROPZONE: Leave') // sai da zona
    this.classList.remove('over')
}

function drop(){
    console.log('DROPZONE: Dropped') // soltei algo na zona
    this.classList.remove('over')
}
