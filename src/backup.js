import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.change = this.change.bind(this)
    this.jump = this.jump.bind(this)
    this.platforms = [[80,50],[60,51]]
    document.addEventListener('touchstart', this.change)
    document.addEventListener('keydown', this.change)
    document.addEventListener('keyup', this.jump)
    this.state = {top: 95 , left: 3}
    this.int = ''
    this.fallInt = '' 
    this.jumping = false
    this.breakException = {}
  }

  fall() {
    if(this.state.top>94 || this.jumping) {return} else {
      setTimeout(()=>{ 
        let state = this.state
        this.platforms.forEach(platform=> { 
          if ( platform[0] !== this.state.top+6 && platform[1] !== this.state.left) { 
            if(state.top<95) {
              state.top+=1
              this.setState(state)
            }
          }
        })
      },40)
    }
  }

  jumpTime() {

  }


  jump(e) {
    this.jumping = true
    let state = this.state
    let x = 0
    let dir = -1
      if(e.keyCode===38){ 
        document.removeEventListener('keyup', this.jump)
        let int = setInterval( ()=> {
          if(dir === 1) { 
            this.platforms.forEach(platform=> { 
              if ( platform[0] === this.state.top+6 && platform[1]===this.state.left) { 
                this.jumping = false
                clearInterval(int) 
                throw this.breakException
              }
            }) 
          }
          if(dir === -1) { 
            this.platforms.forEach(platform=> { 
              if ( platform[0] === this.state.top && platform[1]===this.state.left) { 
                dir=1
              }
            }) 
          }

          x-=dir
          this.setState({top: this.state.top+dir})
          if(x===40){dir = 1}
          if(x===0 ){
            this.jumping = false
            clearInterval(int)
            this.fall()
            document.addEventListener('keyup', this.jump)
          }
        },20)
      }    
  }

  change(e) {
    let state = this.state
    if(e.type === 'touchstart'){
      console.log(e)
    }

    if(e.type === 'keydown') {
      let dir = 0
      let x = 0
      if(e.keyCode===39){dir = 1}
      if(e.keyCode===37){dir = -1}
      if(e.keyCode===37 || e.keyCode===39) {
        document.removeEventListener('keydown', this.change)
        document.addEventListener('keyup', this.change)
        this.int = setInterval( ()=> {
          x+=dir
          this.setState({left: this.state.left+dir})
        },20)
      }
    }
    if(e.type === 'keyup') { 
      if(e.keyCode===38) {}
      if(e.keyCode===37 || e.keyCode===39) {
        clearInterval(this.int) 
        setInterval(this.fall(),20)
        document.removeEventListener('keyup', this.change)
        document.addEventListener('keyup', this.jump)
        document.addEventListener('keydown', this.change)
      }
    }
  }

  render() {
    this.fall()
    return (
      <div className="App" onClick={this.change.bind(this)}>
      <div className = 'player' style={{top: this.state.top+'rem', left: this.state.left+'rem'}}></div>
      {    
        this.platforms.map((platform)=>{
          return (
            <div className='platform' style={{top: platform[0]+'rem', left: platform[1]+'rem'}}></div>
          )
        })
      }
      </div>
    );
  }
}

export default App;
