import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery '; 
// import App from "./App.jsx";
// ReactDOM.render(<App />, document.getElementById("root"));

// import React, { Component} from "react";
// import "./App.css";

// class App extends React.Component{
//   render(){
//     return(
//       <div className="App">
//         <h1> Hello, World! </h1>
//       </div>
//     );
//   }
// }

// export default App;

// import signup from './components/signup.jsx';
// import signin from './components/signin.jsx';




class App extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: "",
        password: "",
        email: "" //|| null
      };
    }

    onClick(eve) {
        let object = {
            username : this.state.username,
            password : this.state.password,
            email : this.state.email
        };
        // $.post("../server.js", {data:object});
        // retriveData () {
        //   var that = this;
        //   $.ajax({
        //     type: 'POST',
        //     url: '/signup',
        //     success: function (data) {
        //       that.updateState(data);
        //       console.log(data)
        //     },
        //     error: function (request, status, error) {
        //       console.log(error);
        //     }
        //   })
        // }

    }

    handleChange(event) {
      this.setState({username : event.target.username, 
        password : event.target.password,
        email : event.target.email  
      });
    }

    render() {
        return (
            <div className="homepage">
            <h1> Welcome {this.props.username}</h1>
             
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
// export default App;