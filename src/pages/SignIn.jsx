import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import "./Signup.css";
import Footer from "../components/Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircularLoader from "../components/Loader/loader";
import { LoginUser, auth } from "../firebase/firebase";

export default function Signin() {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await LoginUser(auth, data.email, data.password);
      console.log(user);
      setLoading(false);
      navigate('/home')
    } catch (err) {
      console.log(err.code);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <CircularLoader />}
      <div className="container-signup">
        <main className="main-signup">
          <div>
            <h1>Sign in</h1>

            <div className="input-fields">
              <div className="text-fields">
                <TextField
                  color="success"
                  id="email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="email"
                  label="Email"
                  variant="standard"
                  placeholder="email@gmail.com"
                  sx={{ width: "100%" }}
                />
              </div>
              <div className="text-fields">
                <TextField
                  color="success"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  label="Password"
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
                  handleLogin();
                }}
                className="submit-button"
              >
                Login
              </button>

              <p className="text">
                Don't have an account yet?{" "}
                <Link to={"/register"}>Sign up.</Link>
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
