import React from 'react';
import Navbar from './navbar';
import cookie from 'js-cookie';
import axios from 'axios';
import '../css/home.css';

export default class Archive extends React.Component {
    constructor() {
        super();
        this.state = {
            todo_list: []
        }
    }

    componentDidMount() {
        const username = cookie.get('user');
        axios.get("http://localhost:8080/todo/archived/" + username)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        todo_list: res.data
                    })
                }
            })
    }

    delete = (id, e) => {
        axios.delete("http://localhost:8080/todo/" + id)
            .catch(err => {
                console.log(err)
            });
        window.location.reload();
    }
    
    status = stat => {
        if(stat === true){
            return "Active";
        }
        else{
            return "Finished";
        }
    }

    render() {
        const todo_list = this.state.todo_list;
        let list;
        list = todo_list.map((todo_list, k) =>
            <div className="row list_row home" key={k} style={{ border: '2px solid' + todo_list.color }}>
                <div className="col">
                    <div className="row content">
                        <div className="container">
                            {todo_list.content}
                        </div>
                    </div>
                    <div className="row btm_row" style={{ paddingTop: '10px', paddingBottom: '5px' }}>
                        <div className="col-md-6" style={{ display: 'flex', alignItems: 'center' }}>Label : {todo_list.label}</div>
                        <div className="col-md-6" style={{ display: 'flex', alignItems: 'center' }}>Status : {this.status(todo_list.status)}</div>
                    </div>                    
                </div>
                <div className="col-md-auto" style={{ display: 'flex', alignItems: 'center' }}>                    
                    <a href= {`/edit/${todo_list._id}`} className="btn btn-outline-primary edit"><span className="material-icons">edit</span></a>
                </div>
                <div className="col-md-auto" style={{ display: 'flex', alignItems: 'center' }}>
                    <button type="button" className="btn btn-outline-danger delete" onClick={this.delete.bind(this, todo_list._id)}><span className="material-icons">delete_forever</span></button>
                </div>
            </div>
        )
        return (
            <div>
                <Navbar />
                <div className="container" style={{ paddingTop: '100px' }}>
                    <center><h3>Finished Items will be shown here</h3></center>
                    <hr></hr>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            {list}
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </div>
        )
    }
}