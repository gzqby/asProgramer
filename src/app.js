import 'babel-polyfill';//ES6新API兼容
import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.less';

class App extends React.Component{
    render(){
        return(
            <h1>Hello,World!</h1>
        )
    }
}

ReactDOM.render(
    <App />,
    window.app
)