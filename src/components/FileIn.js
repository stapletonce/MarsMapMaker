import React from 'react';
import Papa from 'papaparse';
import './App.css';
import classNames from 'classnames';


class FileIn extends React.Component {

    constructor() {
        super();
        this.state = {
            totalFileSize: 0,
            files: undefined,
            csvfile: undefined,
            csvfile2: undefined,
            loaded: false
        };
        this.updateData = this.updateData.bind(this);
    }



    // helper method for selected CSV to read information from the file
    handleChange = event => {
        this.setState({ files: event.target.files })
        if (event.target.files[1] === undefined) {
            this.setState({
                csvfile: event.target.files[0],
                totalFileSize: event.target.files[0].length
            });
        }
        else {
            this.setState({
                csvfile: event.target.files[0],
                csvfile2: event.target.files[1],
                totalFileSize: event.target.files[0].length + event.target.files[1].length
            });

        }
    };

    refreshFileIn = () => {
        setTimeout(() => {
            this.setState({ loaded: !this.state.loaded });
        }, 0);  // ------------------------------> timeout 0

        setTimeout(() => {
            this.setState({ loaded: !this.state.loaded });
        }, 10);
    }

    // onclick helper function to parse the CSV with PapaParse 
    importCSV = () => {

        const { csvfile } = this.state;

        if (this.state.files === undefined) {
            this.refreshFileIn()
            alert("You have not selected a file!")
            return
        }

        else if (this.state.files.length > 2) {
            this.refreshFileIn()
            alert("You have selected more than two files!")
            return
        }

        if (this.state.files.length > 1) {
            for (let i = 0; i < 2; i++) {
                Papa.parse(this.state.files[i], {
                    complete: this.updateData,
                    header: true
                });
            }
        }
        else {
            Papa.parse(this.state.files[0], {
                complete: this.updateData,
                header: true
            });

        }

        this.setState({ loaded: true })

    };

    // uses function from App.js (callbackFromParent) to retrieve the result/data from FileIn.js
    updateData(result) {
        var data = result;
        this.props.callbackFromParent(data, this.state.totalFileSize)
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
                    multiple="multiple"
                />
                <p />
                <button onClick={this.importCSV}> Import now!</button>

            </div>
        );
    }
}

export default FileIn;
