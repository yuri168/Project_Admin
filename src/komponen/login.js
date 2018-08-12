import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginID } from '../action';
class login extends Component {
    state = {
        open: false,
        dialog: true,
        user: '',
        pass: '',
        redirect_home: false,
      };


    klikLogin() {
        var url = `http://localhost:3222/userLogin`
        Axios.post(url, {
          name: this.state.user,
          password: this.state.pass
        })
          .then((respon) => {
            if (respon.data.iduser === 1) {
              var data = respon.data;
              var idLog = data.iduser
              this.props.loginID(idLog)
              this.setState({ redirect_home: true })
            }
            else {
              alert("Usernam/Email & Password is wrong")
            }
    
          })
          .catch((gagal) => { console.log(gagal) })
      }

      submitlogin() {
        this.setState({ user: this.refs.namas.value })
        this.setState({ pass: this.refs.passd.value })
      }

  render() {

    const { redirect_home } = this.state;
    if (redirect_home) {
      this.setState({ redirect_home: false })
      return (< Redirect to='/Product' />)
    }

    return (
      <div className="">
        <center>
            <div>
                <h5>
                    Login
                </h5>
                <br />
                <input
                      onChange={() => { this.submitlogin(); }}
                      className="text"  placeholder="Email..." type="email" ref="namas"
                    />
                <br/>
                <input
                      onChange={() => { this.submitlogin(); }}
                      className="text"  placeholder="Password" type="password" ref="passd"
                    />
                <br/>
                <button color="danger" onClick={() => this.klikLogin()}>
                      Login
                </button>
            </div>
        </center>
      </div>
    );
  }
}
const mapStateToProps = (state) => {

    const idLogin = state.idLogin
    return { idLogin };
  
  };
  export default connect(mapStateToProps, { loginID })(login);
