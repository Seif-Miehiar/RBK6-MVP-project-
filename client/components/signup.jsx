import App from './app.jsx';

class signup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            email: "" || null
          };
    }

    render() {
        return (
            <div>
                <form action = "./signin">
                <input type = "text" placeholder = "enter your username" onChange = {this.handleChange.bind(this)} required  /> 
                <input type = "password" placeholder = "enter your password" onChange = {this.handleChange.bind(this)} required  />
                </form>
            </div>
        );
    }

}
ReactDOM.render(<App />, document.getElementById('app'))