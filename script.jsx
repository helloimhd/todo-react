/////////////////////////////////////////////
class Form extends React.Component {
    render() {
        return (
            <div>
                <input onChange={this.props.changeHandler}onKeyDown={this.props.takeItemOnEnter}/>
                <button type="button">Add Item</button>
            </div>
        )
    }
}

////////////////////////////////////////////
class ItemList extends React.Component {
    constructor() {
        super();
        this.state = {
            list: []
        }
    }

    storeInList = () => {
        let currentWord = this.props.word;
        if (currentWord !== "") {
            this.state.list.push(currentWord)
        }
    }

    render() {
        {this.storeInList()}
        console.log(this.state.list)
        let allItems = this.state.list.map((list, index) => {
            return (
                <tr>
                    <td>{list}</td>
                    <td>{index}</td>
                </tr>
            )
        }) // end of map
        return (
            <table>
                <thead>
                    <tr>
                        <th>Items</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {allItems}
                </tbody>
            </table>

        )
    }
}

//////////////////////////////////////////
class TodoItem extends React.Component {
    constructor() {
        super();
        this.state = {
            word: ""
        }
        this.setWord = this.setWord.bind( this );
    }

    setWord(word) {
        this.setState({word: word})
    }

    render() {
        return (
            <div>
                <App setWord={this.setWord} />
                <ItemList word={this.state.word} />
            </div>
        )
    }
}

//////////////////////////////////////////////
class App extends React.Component {
    changeHandler = e => {
        //console.log(e.target.value)
    }

    takeItemOnEnter = e => {
        if (e.key === 'Enter') {
           // console.log(e.target.value)
            this.props.setWord(e.target.value)
            e.target.value = "";
        }
    }

    render() {
        return (
            <Form
                changeHandler={this.changeHandler}
                takeItemOnEnter={this.takeItemOnEnter}>
            </Form>
        )
    }
}

ReactDOM.render(
    <TodoItem />,
    document.getElementById('root')
);