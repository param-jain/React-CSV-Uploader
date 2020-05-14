import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import csv from 'csv';

import { Navbar } from 'react-bootstrap'
import { MDBDataTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import 'bootstrap/dist/css/bootstrap.min.css';
import Columns from './configData.json'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: '',
      userList: []
    }
  }

  onDrop = (files) => {
    this.setState({ files });
    var file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        var userList = [];
        for (var i = 1; i < data.length; i++) {
          const name = data[i][0];
          const phoneNumber = data[i][1];
          const address = data[i][2];
          const classType = data[i][3];
          const newUser = { "name": name, "phoneNumber": phoneNumber, "address": address, "class": classType };
          userList.push(newUser);
          this.setState({ userList });
        };
      });
    };
    reader.readAsBinaryString(file);
  }

  renderHeader = () => {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">CSV Uploader</Navbar.Brand>
      </Navbar>
    );
  }

  renderTable = () => {
    var data = {};
    data.columns = Columns.columns;
    data.rows = this.state.userList;

    var tableProps = {
      theadColor: "dark", 
      searching: false, 
      data, 
      entries: 5, 
      entriesOptions: [5], 
      entriesLabel: "", 
      responsive: true,
      striped: true,
      borderless: true,
      small: true,
      hover: true
    }
  
    return (
      <MDBDataTable {...tableProps}>
        <MDBTableHead columns={data.columns} />
        <MDBTableBody rows={data.rows} />
      </MDBDataTable>
    );
  }
  
  render() {
    const fontSize = 6;

    return (
      <div>
        { this.renderHeader() }
        <div className="dropzone" align="center" oncontextmenu="return false">
          <Dropzone accept=".csv" onDrop={acceptedFiles => this.onDrop(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
              <section style={styles.uploader}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <h2>Upload or Drop Your <font size={fontSize} color="#00A4FF">CSV</font><br /> File Here.</h2>
                </div>
              </section>
            )}
          </Dropzone>
          <div style={{ margin: 100, marginTop: 50 }}> 
            {this.renderTable()}
          </div>
          <br /><br /><br />
        </div>
      </div>
    )
  }
}

const styles = {
  uploader: {
    borderRadius: 1, 
    borderStyle: 'dotted', 
    padding: 10, 
    marginLeft: 100, 
    marginRight: 100, 
    marginTop: 50, 
    marginBottom: 20
  }
}

export default App;