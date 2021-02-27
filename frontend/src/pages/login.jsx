import React from "react";
import loginImg from "../images/login.png";
import { Redirect} from "react-router-dom";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: "",
      password: "",
      
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    var envoyer_formulaire = { password , email };
        
    envoyer_formulaire = JSON.stringify(envoyer_formulaire);
    fetch(" http://localhost:3001/api/utilisateurs/connexion", {
      method: "POST",
      body: envoyer_formulaire,
        
      headers: {
      'Content-Type': 'application/json'
      },
        
      }).then((user) => {
        
        if(user.status === 200){

            console.log("connexion réussi")
            user.json().then(res => {
              console.log(res)
              localStorage.setItem("token", res.token);
              localStorage.setItem("user_id", res.userId);
              
            })
                
        }
            
            
      })
      .catch(error => {
        console.log(error)
      })
    
    event.preventDefault();
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Connexion</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} required />
            </div>
            <div className="footer">
              <button type="submit" className="btn">
                Connexion
              </button>
            </div>
          </form>

        </div>
       
      </div>
        
    );
  }
}
