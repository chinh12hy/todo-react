import React from 'react';
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import axios from 'axios';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import {makeStyles} from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoFooter from "./TodoFooter";

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.createNewTodo = this.createNewTodo.bind(this);
        this.handleChangeView = this.handleChangeView.bind(this);
    }

    state = {
        persons: [],
        value: '',
        listTodo: [],
        isChecked: false,
        viewItem: 'all',
        isSelectedAll: false
    };

    // Bằng created trong Vue js
    componentDidMount() {
        axios.get('http://newsapi.org/v2/everything?q=bitcoin&from=2020-02-25&sortBy=publishedAt&apiKey=4935afeda0664970a9ebe9f9c3001512').then(response => {
            console.log(response);
        })
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    testClick(e) {
        axios.post('http://jsonplaceholder.typicode.com/posts', {
            title: this.state.value
        }).then(resp => {
            this.setState({value: ''});
            const array = [...this.state.persons];
            array.unshift(resp.data);
            this.setState({persons: array})
        })
    }

    createNewTodo(event) {
        if (event.keyCode !== 13) {
            return;
        }
        event.preventDefault();
        const value = this.state.value;

        if (value) {
            let array = [...this.state.persons];
            array.unshift({
                id:Math.floor(Math.random() * 1000),
                title: value,
                status: false
            });
            this.setState({value: '', persons: array});
        }
    }

    removeItem(todoItem, index) {
        let array = [...this.state.persons];
        array = array.filter(o => {
            return o.id !== todoItem.id
        });
        this.setState({persons: array});
    }

    handelCheckBox(todoItem, index) {
        // dùng như này sẽ khiến có nhiều dữ liệu sẽ bị lag ( nên dùng check index )
        this.setState({
            persons: this.state.persons.map((o, i) => {
                return o.id === todoItem.id ? {
                    ...o,
                    status: !o.status
                } : o
            })
        });
    }

    remoteComplete() {
        this.setState({
            persons: this.state.persons.filter((o) => {
                return o.status === false
            })
        });
    }

    toggleAll() {
        this.setState({
            persons: this.state.persons.map((o) => {
                return {
                    ...o,
                    status: !this.state.isSelectedAll
                }
            }),
            isSelectedAll: !this.state.isSelectedAll
        });
    }

    handleChangeView(value) {
        this.setState({
            viewItem: value
        })
    }

    render() {
        const count = this.state.persons.filter(o => {
            return o.status === false
        }).length;
        let persons = this.state.persons;
        if (this.state.viewItem === 'completed') {
            persons = persons.filter(o => {
                return o.status === true
            })
        } else if (this.state.viewItem === 'active') {
            persons = persons.filter(o => {
                return o.status === false
            })
        }
        return <div className="content">
            <p> Chưa hoàn thành: {count} </p>
            <div className="button-todo">
                <Button variant="contained"
                        color="primary"
                        onClick={this.testClick.bind(this)}> Created </Button>
                <Button variant="contained"
                        color="primary"
                        onClick={() => this.toggleAll()}> Select All </Button>
                <Button variant="contained"
                        color="primary"
                        onClick={this.remoteComplete.bind(this)}> Remote complete </Button>
            </div>

            <Input onChange={this.handleChange.bind(this)}
                   value={this.state.value}
                   onKeyDown={this.createNewTodo}
                   placeholder="Input todo"/>
            <ul>
                {persons.map((o, index) => {
                    return <li className={'item-todo'} key={index}>
                        <span>{o.id}</span>
                       <span>
                           <Checkbox
                               disableRipple
                               checked={o.status}
                               onChange={this.handelCheckBox.bind(this, o, index)}
                               color="primary"
                               inputProps={{'aria-label': 'secondary checkbox'}}
                           />
                       </span>
                        <span className={o.status ? 'active' : ''}>{o.title} </span>
                        <DeleteRoundedIcon onClick={() => this.removeItem(o, index)}
                                           titleAccess="Xóa"/>
                    </li>
                })}
            </ul>
            <TodoFooter count={count}
                        view={this.state.viewItem}
                        on-change-view={this.handleChangeView}/>
        </div>
    }
}

// Truyền tham số mặc định nếu component không truyền prop gì ( giống default() trong props Vue)
Hello.defaultProps = {
    name: 'Su'
};

// export default Hello;