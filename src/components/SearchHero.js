import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        posts: [],
        champions: [],
        value: ''
    };

    // Bằng created trong Vue js
    componentDidMount() {
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props['on-search'](event.target.value)
    }

    render() {
        return <div className="search-inner">
            <input className="search-hero"
                   type="text"
                   value={this.state.value}
                   onChange={this.handleChange}
                   placeholder="Nhập tên tướng"/>
        </div>
    }
}
