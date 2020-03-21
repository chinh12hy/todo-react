import React from 'react';
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import axios from 'axios';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

// function Hello(props) {
//     return <div className="content">
//              <p> Xin chào {props.name} </p>
//              <Button variant="contained" color="primary"> OK</Button>
//             </div>
// }


export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.createNewTodo = this.createNewTodo.bind(this);
    }
    state = {
        persons: [],
        value: '',
        listTodo: [],
        isChecked: false
    };

    // Bằng created trong Vue js
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos').then(response => {
            const persons = response.data;
            // this.setState({persons});
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
            this.setState({ persons: array})
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
            array.unshift({title: value, status: false});
            this.setState({value: '', persons: array});
        }
    }

    removeItem(index) {
        let array = [...this.state.persons];
        array.splice(index, 1);
        this.setState({persons: array});
    }

    handelCheckBox(index = 1) {
        this.setState({
            persons: this.state.persons.map((o, i) => {
                return i === index ? {
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
                    status: !o.status
                }
            })
        });
    }

    render() {
        const count = this.state.persons.filter(o => {
            return o.status === false
        }).length;
        return  <div className="content">
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
                {this.state.persons.map((o, index) => {
                    return <li className="item-todo" key={index}>
                       <span>
                           <Checkbox
                               disableRipple
                               checked={o.status}
                               onChange={this.handelCheckBox.bind(this, index)}
                               color="primary"
                               inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                       </span>
                        <span>{o.title} {o.status.toString()} </span>
                        <DeleteRoundedIcon onClick={() => this.removeItem(index)}
                                           titleAccess="Xóa"/>
                    </li>
                })}
            </ul>
        </div>
    }
}

// Truyền tham số mặc định nếu component không truyền prop gì ( giống default() trong props Vue)
Hello.defaultProps = {
    name: 'Su'
};

// export default Hello;