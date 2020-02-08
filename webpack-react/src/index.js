import "@babel/polyfill"

import React, { Component } from 'react'
import ReactDom from 'react-dom'

class App extends Component {
    render(){
        return <div>光热赛高</div>
    }
}

ReactDom.render(<App/>, document.getElementById('root'))