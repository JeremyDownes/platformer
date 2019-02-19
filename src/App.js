
import React, { Component } from 'react';
import './App.css';




class App extends Component {
  constructor(props) {
    super(props)
    this.change = this.change.bind(this)
    this.platforms = [[80,84],[80,83],[80,82],[80,81],[80,80],[60,60],[60,61],[60,62],[60,63],[60,64],[30,31],[30,32],[30,33],[30,34],[15,50],[15,51],[15,52],[15,53],[15,54],[15,55],[15,56],[15,57],[15,58],[15,59],[15,60],[50,165],[50,166],[50,167],[50,168]]
    this.touchleave = ()=>{alert()}
    document.addEventListener('touchstart', this.touchStart)
    document.addEventListener('touchmove', this.touchMove)
    document.addEventListener('keydown', this.change)
    document.addEventListener('keyup', this.change)
    this.state = {top: 95 , left: 3 }
    this.gravity()          //is always working
    this.element = {}
    this.jumping = false
    this.breakException = {}
    this.touchMove = this.touchMove.bind(this)
    this.directionX = 0
    this.directionY = 0
    this.count = 0 
    this.landed = false
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
      if(!this.jumping) { this.directionY = 1 }
      let state = this.state
      if(this.jumping) {
        this.landed = false
        this.count++   //- (1/count) 
        if(this.count > 40) {
          this.jumping = false
          this.count = 0
          this.directionY = 1
        }
      }

      state.left+=this.directionX
      let landed = false
      this.platforms.forEach(platform=> { 
        if ( platform[0] === this.state.top+5 && platform[1]===this.state.left && !this.jumping) { 
          this.count = 0
          landed = true
        }
      })
      if (landed || !this.jumping && state.top===95) { 
        this.directionY = 0
        this.landed = true
      } else {
        this.landed = false
      }

      state.top += this.directionY
      if (state.top<47&&state.top>43&&state.left<168&&state.left>164) {
        alert('LEVEL UP !')
        state.top = 95
        state.left = 3
        window.location.reload()
      }
      this.setState(state)    
    },20)
  }

 change(e) {

    if(e.type === 'touchstart'){
      console.log(e)
    }

    if(e.type === 'keydown') {
      if(e.keyCode===39){this.directionX = 1}
      if(e.keyCode===37){this.directionX = -1}
      if(e.keyCode===38 && !this.jumping && this.landed) {
        this.directionY = -1
        this.jumping = true
      }    
      if(e.keyCode===37 || e.keyCode===39) {
        document.addEventListener('keyup', this.change)
        let animated = ''
        if(e.keyCode=== 39) {animated = 'running-right'}
        if(e.keyCode=== 37) {animated = 'running-left'}
         document.getElementById('player').classList.remove('standing')
         document.getElementById('player').classList.add(animated)
      }
    }
    if(e.type === 'keyup') { 
      if(e.keyCode===38) {}
      if(e.keyCode===37 || e.keyCode===39) {
        this.directionX=0
        document.removeEventListener('keyup', this.change)        
        document.addEventListener('keydown', this.change)

         document.getElementById('player').classList.remove('running-left')
         document.getElementById('player').classList.remove('running-right')

         document.getElementById('player').classList.add('standing')
      }
    }
  }

  render() {
    return (
      <div className="App" onClick={this.change.bind(this)}>
      <div className = 'player standing' id = 'player' style={{top: this.state.top+'rem', left: this.state.left+'rem'}}></div>
      {    
        this.platforms.map((platform)=>{
          return (
            <div className='platform' style={{top: platform[0]+'rem', left: platform[1]+'rem'}}></div>
          )
        })
      }
      <div className='star'></div>
      </div>
    );
  }
}

export default App;
