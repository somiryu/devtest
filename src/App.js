import React from 'react';
import logo from './logo.svg';
import './App.css';
// ENTRE A www.habitica.com para tener un referente de los que se espera
//Debe hacer una aplicación de ToDos (tareas a realizar) básica
//pero conectada a nuestro motor de Gamificación.


function App() { // Para que el código funcione debe convertir esta función a una clase de React.
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      logIn: false, 
      player: {
        basic: {name: "Cargando"}, 
        agent:{
          currencies: {
            xp: {quantity: 0}, hp:{quantity:100}
          }
        }
      }
    }
  }

  componentDidMount(){
    //Verifique la documentacion en public/engine.js
    //Revise si hay un jugador registrado:

    //Si no, debe cargar el componente LogIn
    //y lograr el registro de un jugador. Use
    //su mail y cédula para registrarse.

    //Si existe un jugador registrado:
    //Acá se debe hacer el llamado api a getPlayer
    //Debe actualizar el estado loading cuando la carga sea exitosa
  
    // Use la libería anime.js (cargada en /public)
    // para crear animaciones a los componentes renderizados.
  }

  componentDidUpdate(){
    // Si al cambiar el estado es necesario actualizar el jugador
    // debe volverse a llamar el api getPlayer
  }

  checkTodo = () => {
    //Debe llamar el endpoint completeMission
    //para la misión con tag "get_points"

    //Una vez reciba la respuesta, debe mostrarsele al usuario lo que ganó y actualizar el estado "player"
    // La misión al completarse genera un cooldown.
    //Muéstrele esa información al jugador usando el componente
    // Timer.js
  }

  handleInput = (e) => {
    //En esta función haga el controlador del componente
    //checbox que debería usar en el listado ToDo
  }

  render(){
    //Use los componentes AnimateText y AnimateScore
    // para crear textos y puntajes animados
    return (
      <div className="App">
        <div note="Carge el componente Login si no se ha registrado un jugador">
        </div>
        <div note="Cargue este código si ya está registrado el jugador">
          <header className="App-header">
            <div note="usar estilos flexbox para construir este layout">
              <div note="Ingresar acá el nombre del Jugador si existe y el nivel actual">
              </div>
              <div note="Poner una imagen tipo Avatar">
              </div>
              <div note="Si hay jugador cargado, poner las barras de progreso acá. Usar el componente ProgressBar">
              </div>
            </div>
          </header>
          <body>
            <div note="Debe cargar el componente Loading (la animación debe funcionar) si no se ha cargado el jugador desde el api. Use en el render {condition ? component : component}">
            </div>
            <div note="armar una lista de todos. Cuando un todo se completa debe llamar la función checkTodo()">
            </div>
          </body>
        </div>
      </div>
    )
  }
}

export default App;
