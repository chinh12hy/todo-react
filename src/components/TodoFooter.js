import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TodoFooter extends React.Component {
    constructor(props) {
        super(props);
        this.createNewTodo = this.createNewTodo.bind(this);
    }

    state = {
        view: 'all'
    };

    // Bằng created trong Vue js
    componentDidMount() {
    }

    changeView(viewTodo) {
        this.setState({
            view: viewTodo
        });
        // Giống với với emit trong Vue
        this.props['on-change-view'](viewTodo)
    }

    createNewTodo(event) {
        if (event.keyCode !== 13) {
            return;
        }
        event.preventDefault();
        const value = this.state.value;

        if (value) {
            let array = [...this.state.persons];
            array.unshift({title: value, status: false});
            this.setState({value: '', persons: array});
        }
    }

    render() {
        return <div className={'container'}>
            <div className="row">
                <div className={`col-4 ${this.state.view === 'all' ? 'border' : ''}`}
                     onClick={() => this.changeView('all')}>All</div>
                <div className={`col-4 ${this.state.view === 'completed' ? 'border' : ''}`}
                     onClick={() => this.changeView('completed')}>Completed</div>
                <div className={`col-4 ${this.state.view === 'active' ? 'border' : ''}`}
                     onClick={() => this.changeView('active')}>Active</div>
            </div>
        </div>
    }
}
