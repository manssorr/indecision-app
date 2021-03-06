import React from 'react';
import AddOptions from './AddOptions';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';



// The Full app frame 
export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    handleDeleteOptions = () => {
        this.setState( () => ( {options: []} ) );
    };
    
    // To remove option (it take it form this path then filter all excute it)
    // -> path the func as a prop to options -> path it again to option
    // Call it with (the option textFrom at submition) throw it to this func as argument 
    handleDeleteOption = (optionToDelete) => {
        this.setState((pervState)=>({
            options: pervState.options.filter((option)=> optionToDelete !== option )
        }));
    };
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length );
        const option = this.state.options[randomNum];
        this.setState((prevState) => ({
            selectedOption: option
        }));
    };
    handleAddOption = (option) => {
        if(!option) {
            return 'Enter a vailed data'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'this option is exist'
        }
        this.setState((pervState) => ({
            options: pervState.options.concat([option])
        }));
    };
    handleClearSelectedOption = () => {
        this.setState( () => ({
            selectedOption: undefined
        }) );
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
    
            if(options) {
                this.setState(() => ({ options }));
            }
        } catch (error) {
            // Do no thing at all =P
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.state.options.length !== prevState.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    };
    componentWillUnmount() {
        console.log('Unmounting data');
    };

    render() {
        const subtitle = 'Put your life in the hand of my TestErea.';
        return (  
            <div>
                <Header
                subtitle={subtitle}  
                />
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOptions
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>

                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        );
    };
}
