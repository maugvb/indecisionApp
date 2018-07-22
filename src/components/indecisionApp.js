import React from 'react';
import AddOption from './addOption';
import Options from './options';
import Header from './header';
import Action from './action';

export default class IndecisionApp extends React.Component {
    state = {
        options: []
    };

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
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            console.log('saving data');
        }
    };

    handleDeleteOptions = () => {
        this.setState(() => ({
            options: []
        }))
    }

    handleAddOption = (option) => {
        if (!option) {
            return 'enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This item option already exists';
        }


        this.setState((prevState) => ({
            options: [...prevState.options, option]
        }))
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }

    handlePick = () => {
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