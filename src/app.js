class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        };
    }

    componentDidMount() {

        try {

            const json = localStorage.getItem('options');

            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({
                    options: options
                }))
            }

        } catch (e) {
            
        }



        console.log(this.state.options.length)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            console.log('saving data');
        }
    }

    handleDeleteOptions() {
        this.setState(() => ({
            options: []
        }))
    }

    handleAddOption(option) {
        if (!option) {
            return 'enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This item option already exists';
        }


        this.setState((prevState) => ({
            options: [...prevState.options, option]
        }))
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }

    handlePick() {
        const selected = Math.floor(Math.random() * this.state.options.length);
        console.log(selected);
        console.log(this.state.options);
        alert(this.state.options[selected])
    }

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    select={this.handlePick} />
                <Options
                    handleDeleteOption={this.handleDeleteOption}
                    handleDeleteOptions={this.handleDeleteOptions}
                    options={this.state.options}
                />
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        );
    }
}


const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
};

const Action = (props) => {
    return (
        <div>
            <button onClick={props.select} disabled={!props.hasOptions}>
                What should i do?
            </button>
        </div>
    );
};

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove all</button>
            {props.options.length == 0 && <p>Please add an option</p>}
            <ol>
                {
                    props.options.map((option) => (
                        <Option
                            key={option}
                            value={option}
                            handleDeleteOption={props.handleDeleteOption}
                        />
                    ))
                }
            </ol>
        </div>
    );
};

const Option = (props) => {
    return (
        <li>
            {props.value}
            <button onClick={() => { props.handleDeleteOption(props.value) }}
            >
                Remove
            </button>
        </li>
    );
};

class AddOption extends React.Component {

    constructor(props) {
        super(props);

        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }

    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({
            error
        }));


        if (!error) {
            e.target.elements.option.value = '';
        }


    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption.bind(this)}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))