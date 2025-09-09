import { register } from "../../services/usersService";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const options = {
      fullName: fullName,
      email: email,
      password: password,
    };

    const response = await register(options);

    if(response.code === 400) {
      alert(`${response.message}`);
      return;
    }

    if (response.code === 200) {
      navigate("/login");
    } else {
      alert("Dang ky khong thanh cong!");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <input type="fullName" placeholder="Nhap ho ten" />
        </div>
        <div>
          <input type="email" placeholder="Nhap email" />
        </div>
        <div>
          <input type="password" placeholder="Nhap mat khau" />
        </div>
        <button type="submit">
          Register
        </button>
      </form>
    </>
  )
}

export default Register;