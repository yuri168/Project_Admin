import React, { Component } from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './product.css'
import { idInvoice } from '../action';

class product extends Component {
    state={
        Data:[]
    }

    componentWillMount(){
        {this.detailtrans()}
        {this.check()}
    }

    check(){
        if (this.props.idLogin !== 1){
            alert("anda belum login")
            this.setState({ redirect_home: true })
        }
      
    }

    detailtrans() {
        var url = `http://localhost:3222/invoice`
        Axios.get(url).then((ambilData) => {
            this.setState({ Data: ambilData.data })
        })
    }   

    getinv(inv) {
        this.props.idInvoice(inv);
    }

    render() {
        const { redirect_home } = this.state;
        if (redirect_home) {
            this.setState({ redirect_home: false })
            return (< Redirect to='/' />)
        }
        
        const data = this.state.Data.map((item,i)=>{
            var kodeinv = item.codeinv
            var date = item.time
            var tanggal = date.substr(0, 10)
            var total = item.total

            return(
                <div>
                    <br/>
                <table>
                   <tbody>
                    <Link to={`/detail/${kodeinv}`} onClick={() => this.getinv(kodeinv)}>
                <tr>
                    <th>{kodeinv}</th>
                </tr>
                <tr>
                    <td> Tanggal: {tanggal}</td>
                    <td> Total: {total} </td>
                </tr>
                </Link>
                    </tbody>
                </table>
                <br/>
                </div>
            )
        })
        return (
            <div>
               {data}
            </div>
        );
    }
}
const mapStateToProps = (state) => {

    const idLogin = state.idLogin
    return { idLogin };
  
  };
export default connect(mapStateToProps, {idInvoice}) (product);
