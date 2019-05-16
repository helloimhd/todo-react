
class List extends React.Component {
        constructor(){
    super()
    this.state = {
        list: [],
        word: ""
    }


    this.changeHandler = this.changeHandler.bind( this );

    this.takeItem = this.takeItem.bind( this );

    this.takeItemOnEnter = this.takeItemOnEnter.bind( this );

    this.remove = this.remove.bind( this );
  }



  changeHandler(event){
    this.setState({word:event.target.value});
    console.log("change", event.target.value);
  }

  takeItemOnEnter(e) {
    let word = e.target.value
    //console.log(word.length)

    if (e.key === 'Enter') {
        if (word.length == 1 || word.length > 10) {
            alert("Word must be more that 1 and less than 10 characters")
        } else {
            let listObj = {}
           // console.log(this.state.word)
            const list = this.state.list
            let word = this.state.word

            listObj["word"] = word;
            listObj["moment"] = moment().format('MMMM Do YYYY, h:mm:ss a');

            list.push(listObj)

            // clear the input
            this.setState({word: ""})
        }
    }
  }

  takeItem() {
    let listObj = {}
    const list = this.state.list
    let word = this.state.word

    listObj["word"] = word;
    listObj["moment"] = moment().format('MMMM Do YYYY, h:mm:ss a');

    list.push(listObj)

    // clear the input
    this.setState({word: ""})
  }

  remove(e) {
    var list = this.state.list
    //document.getElementById("itemTable").deleteRow(parseInt(e.target.id) +   1)
    //alert("click", e.id)
    list.splice(e.target.id, 1)
    console.log(list)
    this.setState({list: list})

  }

  render() {
      // render the list with a map() here
      let allItems = this.state.list.map( (obj, index) => {
            return <tr>
            <td>{obj.word}</td>
            <td><button id={index} onClick={this.remove}>❌</button></td>
            <td>{obj.moment}</td>
            </tr>
        }) // end of map

      //console.log("rendering");
      return (
        <div className="list">



          <table id="itemTable">
            <thead>
                <tr>
                    <th>Items</th>
                    <th>Delete</th>
                    <th>Moment</th>
                </tr>
            </thead>
            <tbody>
                {allItems}
            </tbody>
          </table>
        </div>
      );
  }
}

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
        let listObj = {}
        let currentWord = this.props.word;
        if (currentWord !== "") {
            // put inside obj first
            listObj["word"] = currentWord

            // push the obj into the array so its
            this.state.list.push(currentWord)
            console.log(this.state.list)
        }
    }

    render() {
        {this.storeInList()}

        let allItems = this.state.list.map( (obj, index) => {
            return <tr>
            <td>{obj.word}</td>
            <td><button id={index} onClick={this.remove}>❌</button></td>
            <td>{obj.moment}</td>
            </tr>
        }) // end of map
        return (
            <div>
                {this.state.list}
            </div>
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