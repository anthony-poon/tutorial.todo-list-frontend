import React from "react";
import "./App.scss";

class App extends React.Component {
    state = {
        todos: [],
        input: ""
    }

    handleChange(evt) {
        const {
            name,
            value
        } = evt.target;
        this.setState({
            [name]: value
        })
    }

    handleAdd(evt) {
        evt.preventDefault();
        const {
            todos,
            input
        } = this.state;
        this.setState({
            todos: [
                ...todos,
                input
            ],
            input: ""
        })
    }

    render() {
        const {
            todos,
            input
        } = this.state;
        return (
            <div className={"container"}>
                <div className={"row mt-5"}>
                    <div className={"col-8"}>
                        <h5 className={"mb-3"}>To Do List:</h5>
                        <form onSubmit={evt => this.handleAdd(evt)}>
                            <div className={"row mb-3"}>
                                <div className={"col"}>
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        value={input}
                                        name={"input"}
                                        onChange={evt => this.handleChange(evt)}
                                        autoComplete={"off"}
                                    />
                                </div>
                                <div className={"col-auto"}>
                                    <button type={"button"} className={"btn btn-primary"} onClick={() => this.handleAdd()}>
                                        Add
                                    </button>
                                </div>
                            </div>
                        </form>
                        <ul>
                            {
                                todos.map((todo, index) => (
                                    <li key={index} className={"my-2"}>
                                        { todo }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
