import React from 'react';
import axios from 'axios';
import {
    Card,
    CardTitle
  } from 'reactstrap';
import '../App.css'


const api = axios.create({
    baseURL: `https://app-api-bmi.herokuapp.com`
})

export default class Home extends React.Component {

    state = {
        persons: [],
        nama: '',
        berat: 0,
        tinggi:0,
        
    };

    constructor() {
        super();
        this.getPersons()
        }

    getPersons = async () => {
        await api.get('/users').then(({ data }) => {
            console.log(data);
            this.setState({persons: data})
        })
    }

    
    countData = async (e)=> {
        e.preventDefault()
        const dataPerson = {
            nama: this.state.nama,
            berat: this.state.berat,
            tinggi: this.state.tinggi
        }
        let res = await api.post(`/bmi`, dataPerson)
        console.log(res);
        this.getPersons()
        
    }


  render() {
      return (
          <div>
        <div className="form-comp cfb">
        <h1 style={{color: '#035E7B', fontWeight:'800'}}>Body Mass Index</h1>
        <form
            className="sign-up-form cfb"
            method='post'
            onSubmit={this.countData}>
          <label style={{color: '#595959', fontWeight:'700'}} >
            Siapa nama anda?
            <br/>
            <input style={{height: '30px', color: '#595959', fontWeight:'400', borderRadius: '1em'}}
                type='text'
                placeholder='Masukan nama'
                name='nama'
                onChange={(e) => {
                    this.setState({nama: e.target.value})
                              }}
                required
             />
          </label>
          <label style={{color: '#595959', fontWeight:'700'}}>
          Berapa berat badan Anda? (kg)
            <br/>
            <input style={{height: '30px', color: '#595959', fontWeight:'400', borderRadius: '1em'}}
                type='number'
                placeholder='Exp: 60'
                name='berat'
                onChange={(e) => {
                    this.setState({berat: e.target.value})
                              }}
                              required
            />
          </label>
          <label style={{color: '#595959', fontWeight:'700'}}>
          Berapa tinggi Anda? (cm)
            <br/>
            <input style={{height: '30px', color: '#595959', fontWeight:'400', borderRadius: '1em'}}
                type='text'
                placeholder='Exp: 1.70'
                name='tinggi'
                onChange={(e) => {
                    this.setState({tinggi: e.target.value})
                              }}
                              required
            />
          </label>
          <br/>
          <button type='submit' >
            Hitung!
          </button>
            </form>
            
        </div>
              <hr />
              {this.state.persons.map(person =>
              <Card body style={{textAlign:'center'}}>
                <CardTitle tag="h4" style={{color: '#035E7B'}}>Your BMI Category {person.category} ({person.bmi})</CardTitle>
                <div key={person.id}>
                    <p style={{color: '#595959', fontWeight:'700'}}>{person.nama}</p>
                    <p style={{color: '#595959', fontWeight:'500'}}>Berat Badan: {person.berat}kg</p>
                    <p style={{color: '#595959', fontWeight:'500'}}>Tinggi Badan: {person.tinggi}m</p>
                    <hr/>
                </div>
                  </Card>
                  )}
    </div>
              
    )
  }
}