import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])


    const addPerson = (event) => {
        event.preventDefault()

        if( persons.some((person)=> person.name === newName) ){
            alert(`${newName} is already added to phonebook`);
        } else {
            const PersonObject = {
                name: newName,
                number: newNumber,
                id: String(persons.length + 1)
            }
            setPersons(persons.concat(PersonObject))
            setNewName('')
            setNewNumber('');
        }
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }
    const personsToShow = searchTerm
        ? persons.filter((person) =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : persons;
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleSearchChange={handleSearchChange} searchTerm={searchTerm} />
            <h2>Add a new Contact</h2>
            <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
                        newName={newName} newNumber={newNumber} addPerson={addPerson} />
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} />
        </div>
    )
}

export default App