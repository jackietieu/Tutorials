import React from "react";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: props.age,
      homeLink: this.props.initialLinkName
    }
    console.log("Constructor")
  }

  componentWillMOunt() {
    console.log("Component will mount")
  }

  componentDidMount() {
    console.log("Component did mount")
  }

  componentWillReceiveProps(nextProps) {
    console.log("Component will receive props", nextProps)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Should component update", nextProps, nextState)
    return true;
  }

  componentWIllUpdate(nextProps, nextState) {
    console.log("Component will update", nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component did update", prevProps, prevState)
  }

  componentWillUnmount() {
    console.log("Component will unmount")
  }

  onMakeOlder() {
    this.setState({
      age: this.state.age + 3
    })
  }

  onChangeLinkName() {
    this.props.changeLink(this.state.homeLink);
  }

  onHandleChange(e) {
    this.setState({
      homeLink: e.target.value
    })
  }

  render() {
    return(
      <div>
        <p>In a new Component!</p>
        <p>Your name is {this.props.name}, your age is {this.state.age}</p>
        <hr/>
        <button onClick={this.onMakeOlder.bind(this)} className="btn btn-primary">Make me older!</button>
        <hr/>
        <button onClick={this.props.greet} className="btn btn-primary">Greet</button>
        <hr/>
        <input type="text" 
          value={this.state.homeLink} 
          onChange={this.onHandleChange.bind(this)} />
        <button onClick={this.onChangeLinkName.bind(this)} className="btn btn-primary">Change Header Link</button>
      </div>
    );
  }
}