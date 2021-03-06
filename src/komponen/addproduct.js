import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class product extends Component {
    state = {
        redirect_product: false,
        userfile: '',
        ktg:[]
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

    bodykategori() {
        var url = `http://localhost:3222/kategori`;
        Axios.get(url).then((ambilData) => {
            console.log(ambilData.data)
            this.setState({
                ktg: ambilData.data,
            })
        })
    }

    submitprod() {
        if(this.refs.namas.value == '' || this.refs.desc.value == '' || this.refs.qty.value == '' || this.refs.harga.value === '' || this.refs.kategori.value ==''){
            alert('Mohon di isi dengan lengkap')
        }
          else{                   
        var url = `http://localhost:3222/addProduct`
        Axios.post(url, {

            nama: this.refs.namas.value,
            describ: this.refs.desc.value,
            jumlah: this.refs.qty.value,
            harga: this.refs.harga.value,
            kategori: this.refs.kategori.value

        })
            .then((respon) => {
                if (respon.data === 'sukses') {
                    
                    const { userfile } = this.state;
                    let formData = new FormData();
                    formData.append('userfile', userfile);
                    Axios.post('http://localhost:3222/gambar', formData).then((result) => {
                        // console.log(formData);
                        if (result.data === 'sukses') {
                        alert("Add to Product")
                    this.setState({ redirect_product: true })  }
                    });
                     
                }
            })
        }
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
                <div>
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
                    Masukan ID Kategori nya
                                <br />
                    <input
                        className="text" placeholder="ID kategori" type="text" ref="kategori"
                    />
                    <br />
                    <br />
                    Nama Produk
                                <br />
                    <input
                        className="text" placeholder="Nama Produk" type="text" ref="namas"
                    />
                    <br />
                    Deskripsi
                                <br />
                    <textarea rows="4" cols="50" name="comment" ref="desc" >
                    </textarea>

                    <br />
                    Stock
                                <br />
                    <input
                        className="text" placeholder="QTY" type="number" ref="qty"
                    />
                    <br />
                    Harga
                                <br />
                    <input
                        className="text" placeholder="Harga" type="number" ref="harga"
                    />
                    <br />
                    <input name='userfile' ref='data' type='file' onChange={this.onchangefile} />

                    {/* image
                                <br />
                <input type="file" name="pic" accept="image/*"/> */}
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
export default connect(mapStateToProps)(product);
