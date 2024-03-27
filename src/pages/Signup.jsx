import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import "./Signup.css";
import Footer from "../components/Footer";
import { useState } from "react";
import { RegisterUser, auth } from "../firebase/firebase";
import CircularLoader from "../components/Loader/loader";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      console.log(data.email , data.password , data.phone)
      const user = await RegisterUser(auth, data.email, data.password, data.phone);
      console.log(user);
      setLoading(false);
      navigate("/home");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <CircularLoader />}
      <div className="container-signup">
        <main className="main-signup">
          <div>
            <h1>Sign up</h1>

            <div className="input-fields">
              <div className="text-fields">
                <TextField
                  color="success"
                  id="email"
                  name="email"
                  value={data.email}
                  label="Email"
                  variant="standard"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="email@gmail.com"
                  sx={{ width: "100%" }}
                />
              </div>
              <div className="text-fields">
                <TextField
                  color="success"
                  id="phone"
                  name="phone"
                  label="Phone"
                  value={data.phone}
                  onChange={(e) => handleChange(e)}
                  variant="standard"
                  placeholder="+9199999999"
                  sx={{ width: "100%" }}
                />
              </div>
              <div className="text-fields">
                <TextField
                  color="success"
                  id="password"
                  label="Password"
                  name="password"
                  value={data.password}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  variant="standard"
                  placeholder="******"
                  sx={{ width: "100%" }}
                />
              </div>
              <div className="check-box">
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#38b038",
                        "&.Mui-checked": { color: "#38b038" },
                        "& .MuiFormControlLabel-label": {
                          color: "rgba(0, 0, 0, 0.42)",
                        },
                      }}
                      size="large"
                    />
                  }
                  label="Remember me"
                />
              </div>
              <button
                onClick={() => {
                  handleRegister();
                }}
                className="submit-button"
              >
                Register
              </button>

              <p className="text">
                Already have an account? <Link to={"/login"}>Sign in.</Link>
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
