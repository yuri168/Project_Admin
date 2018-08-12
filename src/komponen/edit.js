import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class edit extends Component {
    state = {
        dataBackend: [],
        redirect_product: false,
        redirect_home: false,
    };

    componentWillMount() {
        {this.check()}

    }
    check(){
        if (this.props.idLogin === 1){
            alert("anda belum login")
            this.setState({ redirect_home: true })
        }
    }

    submitprod(){
    //    console.log( this.refs.namas.value)
    //        console.log( this.refs.desc.value)
    //        console.log( this.refs.qty.value)
    //        console.log( this.refs.harga.value)
        var url = `http://localhost:3222/editProduct/${this.props.idprod}`
        Axios.post(url, {
            nama: this.refs.namas.value,
            describ: this.refs.desc.value,
            jumlah: this.refs.qty.value,
            harga: this.refs.harga.value,        
        })
          .then((respon) => {
              if(respon.data === 'sukses'){
            alert("Add to Product")
            this.setState({ redirect_product: true })
            }
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
        return (
            <div>
                <div>
                <h3>
                    Add Product
                </h3>
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
                    Enter text here...</textarea>

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
                {/* image
                                <br />
                <input type="file" name="pic" accept="image/*"/> */}
                </div>
                <br />
                <button 
                onClick={()=>{this.submitprod()}}
                >Submit</button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {

    const idprod = state.idproduct
    const idlogin= state.idLogin
    return { idprod, idlogin };

};

export default connect(mapStateToProps) (edit);
