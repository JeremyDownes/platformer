import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';




class App extends Component {
  constructor(props) {
    super(props)
    this.change = this.change.bind(this)
    this.platforms = [[80,80],[60,60]]
    this.touchleave = ()=>{alert()}
    document.addEventListener('touchstart', this.touchStart)
    document.addEventListener('touchmove', this.touchMove)
    document.addEventListener('keydown', this.change)
    document.addEventListener('keyup', this.change)
    this.state = {top: 95 , left: 3}
    this.gravity()          //is always working
    this.element = {}
    this.jumping = false
    this.breakException = {}
    this.touchMove = this.touchMove.bind(this)
    this.directionX = 0
    this.directionY = 0
    this.count = 0 

  }

  touchStart(e) {
    let touch = e.touches[0]
    this.element = document.elementFromPoint(touch.pageX,touch.pageY)
  }

  touchMove(e) {
    let touch = e.touches[0]
    if (this.element !== document.elementFromPoint(touch.pageX,touch.pageY)) {
      this.setState({moved: true})
    }
  }


 gravity() {
    setInterval(()=>{
      let state = this.state
      if(this.jumping) {
        this.count++   //- (1/count) 
        if(this.count > 40) {
          this.jumping = false
          this.count = 0
          this.directionY = 1
        }
      }
      state.left+=this.directionX

      if(!this.jumping && state.top===95) { 
        this.directionY = 0 
      }        
      state.top += this.directionY
      this.setState(state)    
    },20)
  }




 change(e) {
    let state = this.state
    if(e.type === 'touchstart'){
      console.log(e)
    }

    if(e.type === 'keydown') {
      let dir = 0
      if(e.keyCode===39){this.directionX = 1}
      if(e.keyCode===37){this.directionX = -1}
      if(e.keyCode===38 && !this.jumping) {
        this.directionY = -1
        this.jumping = true
      }    
      if(e.keyCode===37 || e.keyCode===39) {
        document.addEventListener('keyup', this.change)
      }
    }
    if(e.type === 'keyup') { 
      if(e.keyCode===38) {}
      if(e.keyCode===37 || e.keyCode===39) {
        this.directionX=0
        document.removeEventListener('keyup', this.change)        
        document.addEventListener('keydown', this.change)
      }
    }
  }

  render() {
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
