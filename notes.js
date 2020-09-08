const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {

    return 'Your notes are: '
}

const addNote =  (title, body) =>{
    const notes = loadNotes()

   // const duplicateNote = notes.find((note) => note.title === title)
   // stops when finding one duplicate, instead of continue searching for more
   

    const duplicateNotes = notes.filter ( (note) => 
    note.title === title
    )

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('Note added...'))
    } else {
        console.log(chalk.red.inverse('Note title already exists !'))
    }
    
}

const removeNote = (title) =>{
    const notes = loadNotes()
    const newNotes = notes.filter( (note)=> 
        note.title !== title
    )

    if (newNotes.length < notes.length) {
        saveNotes(newNotes)
        console.log(chalk.green.inverse('Note deleted...'))
    } else {
        console.log(chalk.red.inverse('That note does not exist'))
    }
    
}
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes...'))
    notes.forEach(note => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    noteMatch = notes.find((note) => note.title === title)
    
    if (noteMatch) {
        console.log(chalk.yellow.inverse(noteMatch.title))
        console.log(noteMatch.body)
    } else {
        console.log(chalk.red.inverse('There is no Note with that Title !'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)  
}

const loadNotes =  () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch(e) {
        return []

    }
    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}  