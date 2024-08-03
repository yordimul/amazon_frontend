import React, { useState, useContext } from 'react';
import classes from './signup.module.css';
import { auth } from './../../Util/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { DataContext } from './../../Componet/DataProvider/DataProvider';
import { Type } from '../../Util/actionTypes';
import ClipLoader from 'react-spinners/ClipLoader';
import{ Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [{ user }, dispatch] = useContext(DataContext);
  const[Loding,setloading]=useState({
    signup:false,
    signin:false
  })
  const navigate = useNavigate();

  console.log('Current user:', user);

  const authfun = async (e) => {
    e.preventDefault();

    console.log('Form submission:', e.target.name);
    console.log('Email:', email);
    console.log('Password:', password);

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      if (e.target.name === 'signin') {
        setloading({...Loding,signin:true})
        const userinfo = await signInWithEmailAndPassword(auth, email, password);
        console.log('Sign-in successful:', userinfo);
        dispatch({
          type: Type.SET_USER,
          user: userinfo.user,
        });
        setloading({...Loding,signin:false})
        navigate("/")
      } else if (e.target.name === 'signup') {
        setloading({...Loding,signup:true})
        const userinfo = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Sign-up successful:', userinfo);
        dispatch({
          type: Type.SET_USER,
          user: userinfo.user,
        });
        setloading({...Loding,signup:false})
        navigate("/")
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.message);
      setloading({...Loding,signin:false})
      setloading({...Loding,signup:false})
    }
  };

  return (
    <section className={classes.login}>
      {/* logo */}
      <div>
        <Link to="/">
        <img src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-1024.png" alt="amazon logo" /></Link>
      </div>
      {/* login form */}
      <div className={classes.login_cont}>
        <div className={classes.form}>
          <h3>Sign-in</h3>
          <form className={classes.email} action="">
            <div className={classes.input}>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
              />
            </div>
            <div className={classes.pass}>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
              />
            </div>
            {error && <p className={classes.error}>{error}</p>}
            <button onClick={authfun} name="signin" className={classes.signbut} type="submit">
              {Loding.signin?(
                <ClipLoader  size={15} color='black'/>

              ):("Signin")}
              
            </button>
            <p>
              By signing-in you agree to the Amazon Conditions of Use & Sale. Please see our
              Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>
            <button onClick={authfun} name="signup" className={classes.creat}>
            {Loding.signup?(
                <ClipLoader  size={15} color='black'/>

              ):("Create your Amazon Account")}
              
            </button>
            {error && (<small style={{padding:"5px" , color:"red"}}>
              {error}
            </small>)}
          </form>
        </div>
      </div>
    </section>
  );
}
