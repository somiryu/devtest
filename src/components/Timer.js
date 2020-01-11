//<Timer 
// 	id={uuid} 
// 	seconds={Def:0} 
// 	listener={func optional}
// 	start={bool}
//	stopOn={int optional}
//  stopListener={func optional}
// />

import React, { Component} from 'react'

class Timer extends Component{
    constructor(props){
    	super(props);
    	this.state = {seconds: 0, start:false}
    	this.tick = this.tick.bind(this)
    }

    componentDidMount(){
    	console.log(this.props.seconds,this.props.start )
    	this.setState({seconds: this.props.seconds, start: this.props.start})
    	if(this.props.stopOn){this.stopOn = this.props.stopOn}
    }

    componentDidUpdate(prev){
    	if(this.props.start && !this.timer){
    		this.start()
    	} else if(!this.props.start){
    		this.stop()
    	}
    }

    componentWillUnmount(){
        console.log("------------TIMER UNMOUNTED")
    	this.timer && clearInterval(this.timer)
    }

    formatTime = (distance) => {
        //var days = Math.floor(distance / (60 * 60 * 24));
        var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
        var minutes = Math.floor((distance % (60 * 60)) / 60);
        var seconds = Math.floor((distance % 60));
        
        var hoursText = (hours < 10 ? '0'+hours : hours)
        var minutesText = (minutes < 10 ? '0'+minutes : minutes)
        var secondsText = (seconds < 10 ? '0'+seconds : seconds)
        
        return hoursText + ":" + minutesText + ":" + secondsText
    }

    tick(){
    	this.setState((state)=>{
    		const timer = state.seconds === 0 ? 0 : state.seconds - 1
    		this.props.listener && this.props.listener(this.props.id, timer); 
            if(this.props.stopOn !== undefined && this.props.stopOn === timer){
                console.log("ARE EQUAL")
                clearInterval(this.timer)
                this.stop();    
            };
    		return {seconds: timer}
    	})	
    }

    start = () => this.timer ? null : this.timer = setInterval(()=>this.tick(), 1000)
    stop = () => {
        if(this.timer){clearInterval(this.timer)}
        if(this.props.stopListener){this.props.stopListener(this.props.id)}
        
    }

    render(){
    	return( 
	    	<span className="timer" id={this.props.id}>{this.formatTime(this.state.seconds)}</span>
	    )
    }
}

export default Timer;
