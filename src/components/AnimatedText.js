/* Chldren should be p h1-4, span or div with text 
call 
<AnimatedText 
	value={text} 
	id={uuid} 
	duration={5000}
>
	<p>...</p> Initial text will not appear
</AnimatedText>
*/
import React, { Component} from 'react'

class AnimatedText extends Component{
	constructor(props){
		super(props);
		this.animate = this.animate.bind(this)
	}

	animate(_from, _to){
		let msg = this.props.value
		let e = document.getElementById("animatedText"+this.props.id).firstChild
		let v = {init: _from}

		window.anime({
		  targets: v,
		  init: msg.length,
		  easing: 'linear',
		  duration: this.props.duration ? this.props.duration : 5000,
		  update: function() {
		    e.innerHTML = msg.substring(0,v.init);
		  }
		});	
	}

	componentDidMount(){
		this.animate(this.props.value)
	}

	componentDidUpdate(prev){
		if(this.props.value !== prev.value){		
			console.log("Updated AnimatedText-----", this.props.value)
			this.animate(this.props.value)
		}
	}


	render(){
		// console.log("AnimatedText", this.props);
		return( 
			<div className="AnimatedText" id={"animatedText"+this.props.id}>
			 	{this.props.children}
			</div>
		)
	}
}

export default AnimatedText;
