import React from 'react'
import './field.css'

class Field extends React.Component {
	constructor(props) {
		super(props)
		this.active = null
		
	}


	alternate(row) {

		if(row.location[0]%2===0&&row.location[1]%2===0) {return 		<div className='location' style ={{backgroundColor: 'yellow', height: 99/this.props.field.length+'rem', width:99/this.props.field[0].length+'rem'}} key={row.location} id={row.location}></div>}
		if(row.location[0]%2===1&&row.location[1]%2===1) {return <div className='location' style ={{backgroundColor: 'yellow', height: 99/this.props.field.length+'rem', width:99/this.props.field[0].length+'rem'}} key={row.location} id={row.location}></div>}
		return <div className='location' style ={{backgroundColor: 'blue', height: 99/this.props.field.length+'rem', width:99/this.props.field[0].length+'rem'}} key={row.location} id={row.location} onClick={this.selectLocation}>{this.renderContent(row)}</div>
	}

	renderContent(obj) {
		let color = ''
		if(obj.content) {
			color = obj.content.direction===1?'white':'black'
		  if(obj.content.king){color+=' king'}
		}
		return (
			obj.content? <div className={color} data-direction={obj.content.direction} data-location={obj.location} data-color={obj.content.direction===1?'white':'black'} onClick={this.activate}></div> : null
		)
	}

	generateField () {
		let x = this.props.field.map(column=>{
			return column.map(row=> { return this.alternate(row) })
		})
		return x.map(column=> {return <div className='column'>{column}</div>})
	}


	render() {
		return (
		<div className = 'container'>
		{this.generateField()}
		</div>
		)
	}
}

export default Field