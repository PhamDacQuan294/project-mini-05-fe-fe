import { login } from "../../services/usersService";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value

    const options = {
      email: email,
      password: password,
    };

    const response = await login(options);

    if (response.code === 200) {
      navigate("/");
    } else {
      alert("Sai tai khoan hoac mat khau!")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <input type="email" placeholder="Nhap email"/>
        </div>
        <div>
          <input type="password" placeholder="Nhap mat khau"/>
        </div>
        <button type="submit">
          Login
        </button>
      </form>
    </>
  )
}

export default Login;