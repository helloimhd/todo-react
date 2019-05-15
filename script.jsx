
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

          <input onChange={this.changeHandler} value={this.state.word} onKeyDown={this.takeItemOnEnter}/>
          <button onClick={this.takeItem}>add item</button>

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

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);