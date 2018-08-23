import React, { Component } from 'react';
import Axios from 'axios';

class reporting extends Component {
    state = {
        datareport: [],
        dateakhir: '',
        dateawal: '',
    }
    ChangeDate() {
        this.setState({
            dateawal: this.refs.dateAwal.value,
            dateakhir: this.refs.dateAkhir.value,
        })

    }

    changeaaa() {
        var date = new Date()
        var month = ''
        var day= ''
        if (date.getMonth() < 9) {
            month = '0' + (date.getMonth() + 1)
        }
        else {
            month = date.getMonth() + 1
        }
        
        


        var a = `${date.getFullYear()}-${month}-${date.getDate()}`
        console.log(a)
        var b = this.state.dateakhir
        console.log(b)

        if (b.split('-')[0] <= a.split('-')[0] || b.split('-')[1] <= a.split('-')[1] || b.split('-')[2] <= a.split('-')[2]) {
            var url = `http://localhost:3222/reporting`
            Axios.post(url, {
                dateAwal: this.state.dateawal,
                dateAkhir: b
            }).then((data) => {
                // beruba onject / kumpulan object
                console.log(data.data)
                //berubah menjadi array
                this.setState({ datareport: data.data })
            })
        }
        else {

            alert('tanggal terakhir tidak valid ')

        }
    }

    sortname() {
        var data = this.state.datareport
        for (var i = 0; i < data.length; i++) {
            for (var j = (i + 1); j < data.length; j++) {
                if (data[i].namapenerima > data[j].namapenerima) {
                    var temp = data[i];
                    data[i] = data[j];
                    data[j] = temp;
                }
            }

        } this.setState({ datareport: data })

    }

    sortinv() {
        var data = this.state.datareport
        for (var i = 0; i < data.length; i++) {
            for (var j = (i + 1); j < data.length; j++) {
                if (data[i].codeinv > data[j].codeinv) {
                    var temp = data[i];
                    data[i] = data[j];
                    data[j] = temp;
                }
            }
        } this.setState({ datareport: data })
    }

    render() {

        const data = this.state.datareport.map((item, i) => {
            var no = i + 1
            var kodeInv = item.codeinv
            var namapene = item.namapenerima
            var alamatpene = item.alamatpenerima
            var nopene = item.nopenerima
            var total = item.total
            var tanggal = item.time.substr(0, 10)
            var hari = parseInt(tanggal.split('-')[2]) + 1
            var bulantahun = item.time.substr(0, 8)
            return (
                <tr key={i}>
                    <td>{no}</td>
                    <td>{kodeInv}</td>
                    <td>{namapene}</td>
                    <td>{alamatpene}</td>
                    <td>{nopene}</td>
                    <td>{bulantahun}{hari}</td>
                    <td>{total}</td>
                </tr>
            )
        })

        return (
            <div>
                Tanggal Awal <input type="date" ref="dateAwal" onChange={() => { this.ChangeDate() }} /> -
                Tanggal Akhir <input type="date" ref="dateAkhir" onChange={() => { this.ChangeDate() }} max={this.state.date} />

                <button onClick={() => { this.changeaaa() }}>submit</button>
                <button onClick={() => { this.sortname() }}>sort nama penerima </button>
                <button onClick={() => { this.sortinv() }}>sort kode Inv. </button>

                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th> no </th>
                                <th> code Invoice </th>
                                <th> nama penerima </th>
                                <th> almt. penerima </th>
                                <th> no. tlp. penerima </th>
                                <th> tanggal </th>
                                <th> total pembelanjaan </th>
                            </tr>
                            {data}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default reporting;