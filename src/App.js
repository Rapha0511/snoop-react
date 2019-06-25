import React from 'react';
import logo from './logo.svg';
import './App.css';
import regexEmail from './regexEmail';

const checkEmail = (email)=> (regexEmail).test(email);


class App extends React.Component{
done=(event)=> {
  console.log('done applying')
}
state={
  rapName:'',
  email:'',
}
setRapName=(event)=> {
  console.log(event.target);

  this.setState({
    rapName:event.target.value
  })
}
setEmail=(event)=> {
  this.setState({
    email: event.target.value,
    isEmailValid: checkEmail(event.target.value),
    
  })
}

render (){
  console.log(this.state.isEmailValid);
  return (
    <div className="App">
      <div className='form'>
      <div className = 'card swanky-input-container'>
        <label>
          <input value = {this.state.rapName} onChange={this.setRapName} />
          <span className = 'title'>Rap Name </span>
        </label>
      </div>
      <div className = 'card swanky-input-container'>
        <label>
          <input value = {this.state.email} onChange={this.setEmail} />
          <span className = 'title'>Email </span>
          {
            (this.state.isEmailValid || (this.state.email.length < 1)) ? (null) : (
              <span className = "email-invalid">please enter a valid email </span>
            )
          }
        </label>
      </div>
        <div className ='done-container'>
          <button className = 'done-button' onClick={this.done}>Done</button>
        </div>
      </div>

    </div>
    );
  }
}

export default App;