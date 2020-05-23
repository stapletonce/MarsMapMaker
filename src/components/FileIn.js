import React from 'react';
import Papa from 'papaparse';
import './App.css';
import classNames from 'classnames';

class FileIn extends React.Component {

    constructor() {
        super();
        this.state = {
            csvfile: undefined,
            loaded: false
        };
        this.updateData = this.updateData.bind(this);
    }

    // helper method for selected CSV to read information from the file
    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });
    };

    // onclick helper function to parse the CSV with PapaParse 
    importCSV = () => {
        const { csvfile } = this.state;

        Papa.parse(csvfile, {
            complete: this.updateData,
            header: true
        });
        this.setState({ loaded: true })

    };

    // uses function from App.js (callbackFromParent) to retrieve the result/data from FileIn.js
    updateData(result) {
        var data = result;
        this.props.callbackFromParent(data);
    }

    render() {

        // CSS flipflop for loaded or non-loaded file
        let readerClass = classNames({
            'fileReader': this.state.loaded === false,
            'fileReader1': this.state.loaded === true
        });

        return (
            <div className={readerClass}>
                <h2>Import CSV File!</h2>
                <input
                    className="csv-input"
                    type="file"
                    accept=".csv"
                    ref={input => {
                        this.filesInput = input;
                    }}
                    name="file"
                    placeholder={null}
                    onChange={this.handleChange}
                />
                <p />
                <button onClick={this.importCSV}> Import now!</button>

            </div>
        );
    }
}

export default FileIn;
