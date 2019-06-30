import React from 'react';
import './App.css';
import regexEmail from './regexEmail';
import goldRecord from './goldRecord.png';
import snoopAlbums from './snoopAlbums';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { throwStatement } from '@babel/types';


const checkEmail=(email)=>regexEmail.test(email);

class App extends React.Component{
  done=(event)=> {
    console.log('done applying')
  }
  state={
    topAlbum: snoopAlbums[0],
    modalOpen: false,
    rapName:'',
    email:'',
    isEmailValid:false,
    albumSales:1000,
    albumMenuOpen: false,
    startDate : null,
  }

  setRapName=(event)=> {
    this.setState({
      rapName:event.target.value,
    })
  }
  setEmail=(event)=> {
    this.setState({
      email:event.target.value,
      isEmailValid:checkEmail(event.target.value),
    })
  }

  setAlbumSales=(event)=> {
    console.log(typeof event.target.value)
    this.setState({
      albumSales:Math.max (0, Number(event.target.value)),
    })
  }

  toggleModal = ()=>{
    this.setState({
      modalOpen : !this.state.modalOpen
      

    })
  }

  toggleAlbumMenu = ()=>{
    this.setState({
      albumMenuOpen : !this.state.albumMenuOpen,
    })

  }


  selectAlbum = (album) =>this.setState({ topAlbum : album, albumMenuOpen : false })
  setStartDate = (date) => this.setState({startDate :date})
  done = (event)=>{
    this.toggleModal();
    console.log("zbeb zbeb")

    fetch('/submit',{
    method : 'POST', mode : 'cors' , body: JSON.stringify({
    rapName: this.state.rapName,
    email: this.state.email,
    albumSales:this.state.albumSales,
    topAlbum: this.state.topAlbum,
    startDate : this.state.startDate.getTime(),

      }),
    }).then(response => response.text())
      .then(responseText => console.log(responseText));
  }


  render (){
    console.log(this.state.isEmailValid);
    return(
      <div className='App'>
        <div className='form'>
          <div className='card swanky-input-container'>
            <label>
              <input value={this.state.rapName} onChange={this.setRapName}/>
              <span className='title'> Rap name</span>
            </label>
          </div>

          <div className='card swanky-input-container'>
            <label>
              <input value={this.state.email} onChange={this.setEmail}/>
              <span className='title'> Email</span>
              {
                (this.state.isEmailValid || this.state.email.length<1) ? (null):(
                  <span className='email-invalid'>Please enter a valid email</span>
                )
              }
            </label>
          </div>

          <div className='card swanky-input-container'>
            <label>
              <input type= 'number' step={100} value={this.state.albumSales} onChange={this.setAlbumSales}/>
              <span className='title'> Album Sales</span>
            </label>
            <div className='goldRecords'>
              {
                [1,2,3,4,5,6]
                .filter(x => x*1000 < this.state.albumSales)
                .map(n=>(
                  <div className='goldRecord' key={n}>
                    <img src={goldRecord}/>
                  </div>
                ))
              }

            </div>
          </div>

          <div className = 'card swanky-input-container'>
            <label>
              <span className='title'>top album</span>
              <div className = 'album-dropdown-base'>
                {this.state.topAlbum === null ?(
                  <span>select the best Snoop Album</span>
                ) :(
                  <>
                  <img src={this.state.topAlbum.cover}
                  alt = {this.state.topAlbum.name}/>
                  <span>{this.state.topAlbum.year } </span>
                  <span>{this.state.topAlbum.name} </span>
                  </>
                )}
                <span className='dropdown-arrow' onClick = {this.toggleAlbumMenu}>{this.state.albumMenuOpen ? '▲':'▼'}</span>
              </div>

              {
                this.state.albumMenuOpen ?(
                  <ul className = 'album-menu'>
                    {
                      snoopAlbums.map((album)=>(
                        <li key={album.name} onClick ={()=>this.selectAlbum(album)}>
                          <img src = {album.cover}/>
                          <span>{album.year} </span>
                          <span>{album.name}</span>
                        </li>
                      ))
                    }
                  </ul>
                ) : null
              }
            </label>
          </div>

          <div className='card swanky-input-container'>
            <label>
              <DatePicker selected = {this.state.startDate}
              onChange = {this.setStartDate}/>
              <span className ='title'>start date</span>
            </label>
            
            </div>


          <div className='done-container'>
            <button className="done-button" onClick ={this.done}>Done</button>
          </div>
        </div>
        <div className ={this.state.modalOpen ? 'modal-open' : 'modal-closed'}>
          <h2>Confirmation</h2>
          <p>Ready?</p>
          <button onClick = {this.done}>close modal</button>
          <svg viewBox =' 0 0 100 100'className = 'x-button' onClick={this.toggleModal}>
            <circle cx ={50} cy={50} r={47}/>
            <path d='M 20 20 L 80 80'/>
            <path d='M 80 20 L 20 80'/>
          </svg>
        </div>
          {
            this.state.modalOpen ? (<div className='modal-shade' onClick = {this.toggleModal}/>)
             : null}

      </div>
    );
  }
}

export default App;