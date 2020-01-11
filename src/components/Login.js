/* Login for engine 
	this.state has options to modify
	change Style in render() const style
*/
import React, { Component} from 'react'

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			current: "login",
			allow_registration: true,
			require_username: true,
			error:"",
			message: "",
			message_color: "green",
			error_color: "red",
			wrong_password: "Cédula incorrecta",
			wrong_email: "Verifica tus credenciales.",
			no_match_passwords:"Las cédulas no coinciden",
			
			/* Button */
			bgDefault: "green",
			bgOn: "gray",
			labelDefault: "white",
			labelOn: "black",
			bg: "green", /* as bgDefault */
			label: "white", /* as label_default */
			loading: false,
			
			/* Fields */
			username_placeholder: "Tu Nombre",
			email_placeholder: "Tu Email",
			password_placeholder: "Ingresa tu cédula",
			confirm_password_placeholder: "Ingresa tu cédula",
			field_spacing: 30,
			username: "",
			email: "",
			password: "", /* Works as id_in_app in engine */
			confirm_password:"",	

			// inmmutable: just for painting, just for registration
			secondary_fields: [
				
			],

			// values for secondary fields 
			// create one for each named object in secondary fields
		}

		this.handleInputs = this.handleInputs.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleView = this.toggleView.bind(this);
	}

	handleInputs(event){
		const target = event.target;
	   let value = target.type === 'checkbox' ? target.checked : target.value;
	   const name = target.name;
	   if(name === "email"){value = value.toLowerCase()}
	   console.log("Will change", name, value)
	   this.setState({
      	[name]: value
   	});
	}

	handleSubmit(e){
		if(!this.state.loading){
			console.log("Submitting");
			/* Validations */
			if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email) ){} else { 
				this.setState({error: "Email inválido. Verificar"});
				return
			}

			if(this.state.password === ""){this.setState({error: "Ingresa una constraseña"});return}
			if(this.state.current === "registration"){
				if(this.state.confirm_password === ""){this.setState({error: "Confirma la constraseña"});return}
				if(this.state.require_username && this.state.username === ""){this.setState({error: "Ingresa un nombre de usuario"});return}
				if(this.state.confirm_password !== this.state.password){this.setState({error: this.state.no_match_passwords});return}
			} 
			
			/* After Validations */
			this.setState((state) => {
				return {
					message:"Validando...",
					error:"",
					bg: state.bgOn, 
					label: state.labelOn, 
					loading: true
				}
			})	

			const callError = (msg) =>{
				this.setState({
					message: "",
					error:msg, 
					loading:false,
					bg: this.state.bgDefault,
					label: this.state.labelDefault
				})
				return;
			}

			/* API CALLS */
			if(this.state.current === "login"){
				/* LOGIN */
				window.engine.getPlayer(this.state.password, (data) => {
					if(data.success === false){
						callError(this.state.wrong_password);
					} else {
						if(data.basic.email !== this.state.email){
							callError(this.state.wrong_email);
						} else {
							/* Login succesful */
							window.engine.logIn(this.state.password);
							this.props.changeNav("home")
						}
					}
				})
			} else if(this.state.current === "registration"){
				/* CREATE PLAYER */
				const state = this.state
				let params = {email: state.email}
				if(state.require_username){params.name = this.state.username}
				if(state.secondary_fields[0]){
					params.properties = {}
					const sf = state.secondary_fields
					for(let i=0;i<sf.length;i++){
						params.properties[sf[i].name] = state[sf[i].name]
					}
				}
				console.log("Params to send", params)
				window.engine.postPlayer(
					this.state.password,
					params,
					(data) => {
						console.log("Player Creation", data);
						if(data.success === false){
							callError("El jugador ya existe.")
						} else {
							window.engine.logIn(this.state.password);
							this.props.changeNav("home")
						}
					}
				)
			}
		} else {console.log("Prevented")}		
	}

	toggleView(){
		this.setState((state)=>{
			let view = state.current === "login" ? "registration" : "login"
			return {current: view}
		})
	}

	render(){
		const title = this.state.current === "login" ?
			"Ingresa" : "Regístrate"
		const linkTitle = this.state.current === "login" ?
			"Regístrate" : "Ingresa"
		const style = {
			display:"block",margin:"auto", 
			marginTop: this.state.field_spacing,
			width: "60%",
			padding: 10, fontSize: 12
		}
		const styleSelect = {
			display:"block",margin:"auto", 
			marginTop: this.state.field_spacing,
			width: "65%",
			padding: 10, fontSize: 12,
			color: "black",
		}
		const linkStyle = {
			textAlign:"center",
			marginTop: this.state.field_spacing,
			cursor:"pointer"
		}

		const submit_style ={
			display:"block",margin:"auto", 
			marginTop: this.state.field_spacing,
			padding: "10px 20px", fontSize:15, 
			color: this.state.label, 
			backgroundColor: this.state.bg,
			border: "1px solid "+this.state.bg, 
			cursor: "pointer"
		}
		return( 
			<div id="Login" style={{marginTop:40}}>
				<div className="relative">
					<h2 className="centered">{title}</h2>
					<h3 className="centered"
						style={{margin: "20px 0 0", color: this.state.error_color}}
					>{this.state.error}</h3>
					<h3 className="centered"
						style={{margin: "20px 0 0", color: this.state.message_color}}
					>{this.state.message}</h3>
					{this.state.current === "registration" && this.state.require_username &&
						<input
							style={style}
							placeholder={this.state.username_placeholder}
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.handleInputs} 
						/>
					}

					<input
						style={style}
						placeholder={this.state.email_placeholder}
						type="text"
						name="email"
						value={this.state.email}
						onChange={this.handleInputs} 
					/>

					<input
						style={style}
						placeholder={this.state.password_placeholder}
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleInputs} 
					/>

					{ this.state.current === "registration" &&
						<div>
							<input
								style={style}
								placeholder={this.state.confirm_password_placeholder}
								type="password"
								name="confirm_password"
								value={this.state.confirm_password}
								onChange={this.handleInputs} 
							/>
							{this.state.secondary_fields.map((item, i)=>{
								if(item.type==="collection"){
									return(<select 
										style={styleSelect}
										key={i} 
										name={item.name}
										value={this.state[item.name]}
										onChange={this.handleInputs}
									>
										{item.options.map((opt, j)=>
											<option value={opt.id} key={j}>{opt.name}</option>
										)}
									</select>
									)
								} else {return false}
							})}
						</div>


					}
					<input 
						type="submit" 
						style={submit_style} 
						value={title}
						onClick={this.handleSubmit}
					/>
				</div>
				{this.state.allow_registration &&
					<h3
						onClick={this.toggleView} 
						style={linkStyle}>{linkTitle}</h3>
				}
			</div>
		)
	}
}

export default Login;
