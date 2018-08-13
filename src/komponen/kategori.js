import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class kategori extends Component {
    state = {
        redirect_product: false,
        userfile: '',
        ktg:[],
    };

    componentWillMount() {
        {this.check()}
        {this.bodykategori()}
    }

    check(){
        if (this.props.idLogin !== 1){
            alert("anda belum login")
            this.setState({ redirect_home: true })
        }

    }

    onchangefile = (event) => {
        const state = this.state;


        state.userfile = event.target.files[0];

        this.setState(state);
        console.log(this.state.userfile)
    }

    submitprod() {
        if(this.refs.namas.value == ''){
            alert('Mohon di isi')
        }
        else{
        var url = `http://localhost:3222/addkategori`
        Axios.post(url, {
            nama: this.refs.namas.value,
        }).then((respon) => {
            if (respon.data === 'sukses') {
                alert("Add to Kategori")
            this.setState({ redirect_product: true })  }
        })
    }  
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

    render() {
        const { redirect_home } = this.state;
        if (redirect_home) {
            this.setState({ redirect_home: false })
            return (< Redirect to='/' />)
        }

        const { redirect_product } = this.state;
        if (redirect_product) {
            this.setState({ redirect_product: false })
            return (< Redirect to='/Product' />)
        }

        const data = this.state.ktg.map((item,i)=>{
            var id = item.idkategori
            var nama = item.namakategori
            return(
                <tr key={i}>
                <td>
                    {id}
                </td>
                <td>
                    {nama}
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
                    {data}
                    </tbody>
            </table>
            </div>

                <div>
                    <h3>
                        Add Product
                </h3>
                    <br />
                    Nama kategori
                                <br />
                    <input
                        className="text" placeholder="Nama Produk" type="text" ref="namas"
                    />
                    <br />
                </div>
                <br />
                <button
                    onClick={() => { this.submitprod() }}
                >Submit</button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {

    const idLogin = state.idLogin
    return { idLogin };

};
export default connect(mapStateToProps)(kategori);
