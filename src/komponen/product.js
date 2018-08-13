import React, { Component } from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './product.css'
import { productID } from '../action';

class product extends Component {
    state = {
        dataBackend: [],
        redirect_home: false,
    };

    componentDidMount() {
        {this.check()}

    }
    check(){
        if (this.props.idLogin === 1){
            {this.body()}
        }
        else{
            alert("anda belum login")
            this.setState({ redirect_home: true })
        }
    }

    gettempid = (x) => {
        this.props.productID(x);
      }

    body() {
        var url = `http://localhost:3222/bodyadmin`;
        Axios.get(url).then((ambilData) => {
            this.setState({
                dataBackend: ambilData.data,

            })
        })
    }

    delete(id){
        var url = `http://localhost:3222/productDelete`
    Axios.post(url, {
      idprod: id,
    })
      .then((respon) => {
        {this.body()}
      })
    }    

    render() {
        const { redirect_home } = this.state;
        if (redirect_home) {
            this.setState({ redirect_home: false })
            return (< Redirect to='/' />)
        }

        const foldergambar = "http://localhost:3000/image/";
        

        const data = this.state.dataBackend.map((item, i) => {
            var no = i + 1
            var idp = item.idprod
            var namaProduk = item.namaprod
            var gambar = item.img
            var describe = item.desc
            var harga = item.harga
            var jumlah = item.stock
            return (
                <tr key={i}>
                    <td>
                        {no}
                    </td>
                    <td>
                        {namaProduk}
                    </td>
                    <td>
                        <img className="pic" src={`${foldergambar + gambar}`} alt='' />
                    </td>
                    <td>
                        {describe}
                    </td>
                    <td>
                        {harga}
                    </td>
                    <td>
                        {jumlah}
                    </td>
                    <td>
                        <button>
                        <Link to= {`/editProduct/${idp}`} onClick={()=>this.gettempid(idp)}>
                             edit 
                        </Link>
                        </button>
                        <br />
                        <button onClick={() => {this.delete(idp)}} > 
                       
                            delete 
                       
                            </button>
                    </td>

                </tr>

            )
        })
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                NO
                            </th>
                            <th>
                                Nama Produk
                            </th>
                            <th>
                                gambar
                            </th>
                            <th>
                                desc
                            </th>
                            <th>
                                harga
                            </th>
                            <th>
                                QTY
                            </th>
                            <th>
                            </th>
                        </tr>
                        {data}
                    </tbody>
                </table>

                <button>
                    <Link to="/Addproduct">
                        add Product
                    </Link>
                </button>
                <br/>
                <button>
                    <Link to="/Invoice">
                        Detail Invoice
                    </Link>
                </button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {

    const idLogin = state.idLogin
    return { idLogin };
  
  };
  export default connect(mapStateToProps,{productID}) (product);
