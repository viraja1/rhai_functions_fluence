import React, {Component} from 'react';

import * as fluence from "fluence";
import {contract, appId, ethereumUrl} from "./config";
import AceEditor from 'react-ace';
import Button from 'react-bootstrap-button-loader';
import 'brace/mode/rust'
import 'brace/theme/monokai'

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: '',
      code: 'fn factorial(x) {\n' +
        '    if x == 1 { return 1; }\n' +
        '    x * factorial(x - 1)\n' +
        '}\n' +
        '\n' +
        'factorial(10)',
      session: null,
      inProgress: false
    };
  }


  render() {
     const {result, code, inProgress} = this.state;
    return (
      <div>
        <div  style={{padding: "10px"}}>
        <p className="h3">Rhai Functions For Fluence</p>
        <div style={{float:"right"}}>
          Note: Last statement or function should only return String, int, float or bool
          <br/>
          <br/>
          <p>
            <span class="font-weight-bold">Assignment</span>
            <br/>
            <pre>{
              `let x = 58;\nx`
            }
            </pre>
          </p>
          <p>
            <span className="font-weight-bold">Array</span>
            <br/>
            <pre>{
              `let x = [1, 2, 3]; \nx[1]`
            }
            </pre>
          </p>
          <p>
            <span className="font-weight-bold">Function</span>
            <br/>
            <pre>{
              `fn addme(a, b) { \n  a + b \n}\naddme(3, 4)`
            }
            </pre>
          </p>
          <p>
            <span className="font-weight-bold">if else</span>
            <br/>
            <pre>{
              `let a = true;\nlet x = 0;\nif(a){\n x = 50;\n}\nelse{\n x = 100;\n}\nx`
            }
            </pre>
          </p>
          <p>
            <span className="font-weight-bold">String</span>
            <br/>
            <pre>{
              `"hello " + "world!"`
            }
            </pre>
          </p>
          <p>
            <span className="font-weight-bold">Predefined Function</span>
            <br/>
            <pre>{
              `factorial(5)`
            }
            </pre>
          </p>
        </div>
        <AceEditor mode="rust" theme="monokai"  onChange={this.setCode.bind(this)} value={code}/>
        <div>
          <br/>
          <Button variant="primary" onClick={e => this.executeCode(e)} loading={inProgress}>
            Execute
          </Button>
          <br/>
          <br/>
          <div>
            Result:
            <br/>
            {result}
          </div>
        </div>
        </div>
      </div>
    );
  }

  setCode(code){
    this.setState({code: code})
  }

  async executeCode(e) {
    if(this.state.session === null){
      return;
    }
    this.setState({inProgress: true});
    await this.state.session.request(this.state.code)
      .then((r) => r.result())
      .then((res) => {
        let result = res.asString();
        this.setState({result: result, inProgress: false});
      })
      .catch((r)=> {
        this.setState({result: '', inProgress: false});
      });

  }

  async componentDidMount() {
    await fluence.connect(contract, appId, ethereumUrl).then((s) => {
      this.setState({
        session: s
      });
    }).catch(() => {

    });
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log(prevState, this.state);
  }

}
