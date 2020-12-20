import { FC, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import company from './API/company';
import cookie from 'js-cookie';

const LoginView: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessages, setShowErrorMessages] = useState(false);
  const [authenticationFail, setAuthenticationFail] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  //window.scrollTo(0, 0);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowErrorMessages(true);
    try {
      setLoading(true);
      const { data } = await company.post('/authentication/login', {
        email,
        password,
      }, { responseType: 'text'});
      cookie.set('token', data);
      company.defaults.headers['Authorization'] = `Bearer ${cookie.get('token')}`;
      history.push('/');
    } catch {
      setAuthenticationFail(true);
    }
    setLoading(false);
  }

  return (
    <div>
      <Helmet>
        <link rel="stylesheet" href="login.css"/>
      </Helmet>
      <section className="login-block">
        <div className="container">
          <div className="row ">
            <div className="col login-sec">
              <h2 className="text-center">Login Company</h2>
              <form className="login-form" onSubmit={handleSubmit}>
                {
                  authenticationFail ? (
                    <div className="alert alert-danger">
                      Imposible Authenticate!
                    </div>
                  ) : null
                }
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                  <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required={true}/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                  <input type="password" className="form-control" placeholder="Password" value= {password} onChange={(e) => setPassword(e.target.value)} required={true}/>
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input"/>
                    <small>Remember Me</small>
                  </label>
                  <button type="submit" className="btn btn-login float-right">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginView;