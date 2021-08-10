import React from 'react';
import axios from 'axios';
import './Home.css'


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
          <div className='container'>
              <h3>Body Mass Index (BMI)</h3>
              <form
                  method='post'
                  onSubmit={this.countData }
              >
                  <label>Nama: </label>
                  <input
                      type='text'
                      placeholder='Masukan nama'
                      name='nama'
                      onChange={(e) => {
                          this.setState({nama: e.target.value})
                      }}
                  />

                  <br/>
                  <label>Berat: </label>
                  <input
                      type='number'
                      placeholder='Exp: 60'
                      name='berat'
                      onChange={(e) => {
                        this.setState({berat: e.target.value})
                    }}
                  />
                  <br/>
                  <label>Tinggi: </label>
                  <input
                      type='text'
                      placeholder='Exp: 1.70'
                      name='tinggi'
                      onChange={(e) => {
                        this.setState({tinggi: e.target.value})
                    }}
                  />
                  <br/>
                  <button type='submit'>Submit</button>
              </form>
            <ul>
            {this.state.persons.map(person =>
                <div key={person.nama}>
                    <h4 style={{color: 'blueviolet'}}>Your BMI Category {person.category} ({person.bmi})</h4>
                    <p><b>Nama: </b>{person.nama}</p>
                    <p><b>Berat Badan: </b>{person.berat}</p>
                    <p><b>Tinggi Badan: </b>{person.tinggi}</p>
                    <hr/>
                </div>
            )}
            </ul>
        </div>
    )
  }
}