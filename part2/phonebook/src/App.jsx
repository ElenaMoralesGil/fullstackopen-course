import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', id:'1' }
    ])
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        if( persons.some((person)=> person.name === newName) ){
            alert(`${newName} is already added to phonebook`);
        } else {
            const PersonObject = {
                name: newName,
                id: String(persons.length + 1),
            }
            setPersons(persons.concat(PersonObject))
            setNewName('')
        }
    }
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {
                persons.map((person) => (
                    <div key={person.id}> {person.name}</div>
                ))
            }
        </div>
    )
}

export default App