import React, { Component } from 'react';
import styles from './index.css';
const Camera = navigator.camera;
const BarcodeReader = cordova.plugins.ASCDVBarcode;

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }
  readBarcode = image => {
    BarcodeReader.readBarcode(
      { imageType: 1, uri: image.substr('file://'.length), base64: image },
      results => {
        console.log(results);
        this.setState({ results });
      },
      error => {
        alert('read bar code error');
      }
    );
  };
  getImage = () => {
    Camera.getPicture(
      image => {
        this.readBarcode(image);
      },
      error => {
        alert(error);
      },
      {
        destinationType: 0,
        sourceType: 1,
      }
    );
  };
  scanQRCode = () => {
    BarcodeReader.scanBarcode(results => {
      this.setState({ results });
    });
  };
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>
            To get started, edit <code>src/pages/index.js</code> and save to reload.
          </li>
          <li>
            <a href="https://umijs.org/guide/getting-started.html">Getting Started</a>
          </li>
          <li>
            <button type="button" onClick={this.getImage}>
              读取图片
            </button>
          </li>
          <li>
            <button type="button" onClick={this.scanQRCode}>
              扫描
            </button>
          </li>
          {this.state.results.map(result => {
            return <li>{result}</li>;
          })}
        </ul>
      </div>
    );
  }
}
