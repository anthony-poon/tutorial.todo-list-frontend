import React from "react";
import "./App.scss";
import axios from "axios";

class App extends React.Component {
    state = {
        todos: [],
        input: ""
    }

    async componentDidMount() {
        const response = await axios.get("http://localhost:8000/todo-list/");
        const items = response.data;
        /**
         * The backend returned a list of items with id and item_name, but we want only the item_name, so we use the map()
         * function the extract the item_name and put it into the list
         */
        const itemNames = items.map(item => {
            return item["item_name"];
        })
        this.setState({
            todos: itemNames
        })
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

    async handleAdd(evt) {
        /**
         * By default, some element have actions associate with some HTML element. For example, when you press enter inside
         * a <form> tag, it will attempt conduct a HTTP POST and the webpage will be reloaded. This is not our desired
         * behaviour in this example. We want to do a Ajax call on submit, instead of redirect, so we use preventDefault
         * to disable this behavior.
         */
        evt.preventDefault();
        const {
            todos,
            input
        } = this.state;
        try {
            await axios.post("http://localhost:8000/todo-list", {
                item: input
            });
            this.setState({
                todos: [
                    ...todos,
                    input
                ],
                input: ""
            })
        } catch (error) {
            console.error(error)
        }
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
                                    <button
                                        type={"button"}
                                        className={"btn btn-primary"}
                                        onClick={evt => this.handleAdd(evt)}
                                    >
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
