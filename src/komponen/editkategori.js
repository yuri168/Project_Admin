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
        console.log(this.props.idKategori)
    }
    check(){
        if (this.props.idLogin === 1){
            alert("anda belum login")
            this.setState({ redirect_home: true })
        }
    }

    submitKategori(){
        var url = `http://localhost:3222/editkategori/${this.props.idKategori}`
        Axios.post(url, {
            nama: this.refs.namas.value,      
        }).then((respon) => {
              if(respon.data === 'sukses'){
            alert("Update sukses")
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
                Nama kategori
                <br />
                <input
                    className="text" placeholder="Nama Kategori" type="text" ref="namas"
                />
                <br />
                </div>
                <button 
                onClick={()=>{this.submitKategori()}}
                >Submit</button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const idKategori = state.idkategori
    const idlogin= state.idLogin
    return { idKategori, idlogin };
};

export default connect(mapStateToProps) (edit);
