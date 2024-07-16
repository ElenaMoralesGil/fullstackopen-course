
const Filter = (props) => {
    return (
    <div>
        search: <input value={props.searchTerm} onChange={props.handleSearchChange}/>
    </div>
)
}

export default Filter;