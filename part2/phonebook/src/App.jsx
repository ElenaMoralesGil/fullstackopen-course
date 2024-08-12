import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState( [])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        personService.getAll()
            .then(response => {
                setPersons(response)
            })
    }, [])


    const addPerson = (event) => {
        event.preventDefault()

        const personExists = persons.find(person => person.name === newName);
        if (personExists) {
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                const updatedPerson = { ...personExists, number: newNumber };
                personService.update(personExists.id, updatedPerson)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== personExists.id ? person : response));
                        setNewName('');
                        setNewNumber('');
                    })
                    .catch(error => {
                        console.error('Failed to update person:', error);
                    });
            }
        } else {
            const PersonObject = {
                name: newName,
                number: newNumber,
                id: String(persons.length + 1)
            }
            personService
                .create(PersonObject)
                .then(response => {
                    setPersons(persons.concat(response))
                    setNewName('')
                    setNewNumber('');
                })
        }
    }

    const deletePerson = (id) => {
        if (window.confirm('Are you sure you want to delete this person?')) {
            personService.remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id));
                })
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
            <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
        </div>
    )
}

export default App