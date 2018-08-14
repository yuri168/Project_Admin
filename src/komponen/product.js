import React, { Component } from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './product.css'
import { productID, kategoriID } from '../action';

class product extends Component {
    state = {
        dataBackend: [],
        ktg: [],
        redirect_home: false,
    };

    componentDidMount() {
        { this.check() }
        { this.bodykategori() }

    }
    check() {
        if (this.props.idLogin === 1) {
            { this.body() }
        }
        else {
            alert("anda belum login")
            this.setState({ redirect_home: true })
        }
    }

    gettempid = (x) => {
        this.props.productID(x);
    }

    gettempidktg = (x) => {
        this.props.kategoriID(x);
    }

    body() {
        var url = `http://localhost:3222/bodyadmin`;
        Axios.get(url).then((ambilData) => {
            console.log(ambilData.data)
            this.setState({
                dataBackend: ambilData.data,
            })
        })
    }

    delete(id) {
        var url = `http://localhost:3222/productDelete`
        Axios.post(url, {
            idprod: id,
        })
            .then((respon) => {
                { this.body() }
            })
    }


    bodykategori() {
        var url = `http://localhost:3222/kategori`;
        Axios.get(url).then((ambilData) => {
            console.log(ambilData.data)
            this.setState({
                ktg: ambilData.data,
            })
        })
    }

    deletekategori(id) {
        var url = `http://localhost:3222/kategoriDelete`
        Axios.post(url, {
            idkategori: id,
        })
            .then((respon) => {
                { this.bodykategori() }
            })
    }

    KTGSearch(i){
        var url = `http://localhost:3222/searchbyKTG/${i}`
        Axios.get(url,{
            idkategori: i ,
        }).then((respon)=>{
            
            this.setState({
                dataBackend: respon.data
            })
        })
    }

    render() {
        const { redirect_home } = this.state;
        if (redirect_home) {
            this.setState({ redirect_home: false })
            return (< Redirect to='/' />)
        }

        const dataktg = this.state.ktg.map((item, i) => {
            var id = item.idkategori
            var nama = item.namakategori
            return (
                <tr key={i}>
                    <td>
                        {id}
                    </td>
                    <td>
                        {nama}
                    </td>
                    <td>
                        <button>
                        <Link to={`/editkategori/${id}`} onClick={() => this.gettempidktg(id)}>
                                edit
                        </Link>
                        </button>
                        <button onClick={() => { this.deletekategori(id) }} >
                            delete
                        </button>
                        <button onClick={()=>{ this.KTGSearch(id)}}>
                            Search
                        </button>
                    </td>
                </tr>
            )
        })



        const foldergambar = "http://localhost:3000/image/";

        const data = this.state.dataBackend.map((item, i) => {
            var no = i + 1
            var idp = item.idprod
            var namaProduk = item.namaprod
            var gambar = item.img
            var describe = item.desc
            var harga = item.harga
            var jumlah = item.stock
            var idkategori = item.namakategori
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
                        {idkategori}
                    </td>
                    <td>
                        <button>
                            <Link to={`/editProduct/${idp}`} onClick={() => this.gettempid(idp)}>
                                edit
                        </Link>
                        </button>
                        <button onClick={() => { this.delete(idp) }} >
                            delete
                            </button>
                    </td>

                </tr>

            )
        })
        return (
            <div>
                <div className="body">
                    <h4> Table Kategori </h4>
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    id
                        </th>
                                <th>
                                    Nama
                        </th>
                            </tr>
                        </tbody>
                        {dataktg}
                    </table>
                </div>
                <div className="body">
                    <h4> Table Produk </h4>
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
                                    Kategori
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
                    <br />
                    <button>
                        <Link to="/kategori">
                            add kategori
                    </Link>
                    </button>
                    <br />
                    <button>
                        <Link to="/Invoice">
                            Detail Invoice
                    </Link>
                    </button>

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {

    const idLogin = state.idLogin
    return { idLogin };

};
export default connect(mapStateToProps, { productID, kategoriID })(product);
