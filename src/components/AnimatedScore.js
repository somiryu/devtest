/* Chldren should be p h1-4, span or div with text 
call 
<AnimatedScore 
	to={endValue} 
	from={0} //optional
	id={uuid} 
	duration={2000} //optional
>
	<p>...</p> Initial text will not appear
</AnimatedScore>
*/
import React, { Component} from 'react'

class AnimatedScore extends Component{
	constructor(props){
		super(props);
		this.animate = this.animate.bind(this)
	}

	animate(_from, _to){
		let e = document.getElementById(this.props.id).firstChild
		let v = {qty: _from}

		window.anime({
		  targets: v,
		  qty: _to,
		  easing: 'linear',
		  round: 1,
		  duration: this.props.duration ? this.props.duration : 2000,
		  update: function() {
		    e.innerHTML = v.qty;
		  }
		});
	}

	componentDidMount(){
		this.animate((this.props.from ? this.props.from : 0), this.props.to)
	}

	componentDidUpdate(prevProps){
		this.animate(prevProps.to, this.props.to)
	}

	render(){
		return( 
			<div className="AnimatedScore" id={this.props.id}>
			 	{this.props.children}
			</div>
		)
	}
}

export default AnimatedScore;
