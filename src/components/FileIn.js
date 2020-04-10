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

    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });

    };


    importCSV = () => {
        const { csvfile } = this.state;


        Papa.parse(csvfile, {
            complete: this.updateData,
            header: true
        });
        this.setState({ loaded: true })

    };

    updateData(result) {
        console.log(result)
        var data = result;
        console.log(data)
        this.props.callbackFromParent(data);
    }

    render() {

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
