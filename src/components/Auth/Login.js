import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = createTheme()

  const handleSubmit = async (event) => {
    event.preventDefault()
    //validate
    if (!username) {
      toast.warn("Username can not be blank!");
      return;
    }

    if (!password) {
      toast.warn("Password can not be blank!");
      return;
    }


    //submit api

    try {
      let res = await postLogin(username, password);
      dispatch(doLogin(res));

      if (res.data && res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Login successfully");
        setTimeout(function () {
          return navigate("/");
        }, 2000);
      }
    } catch (err) {
      toast.error("Username or password is not correct!");
    }
  };

  const handleKeyDown = (event) => {
    if(event && event.key === "Enter"){
        handleSubmit();
    }
  }

  return (
    <ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}>
					<Avatar sx={{ m: 1, bgcolor: '#3f135c' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5" fontWeight={700}>
						Đăng nhập
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="username"
							name="username"
							autoComplete="username"
                            value={username}
							autoFocus
                            onChange={(event) => setUsername(event?.target?.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="password"
                            value={password}
							type="password"
							id="password"
							autoComplete="current-password"
                            onChange={(event) => setPassword(event?.target?.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							style={{ backgroundColor: 'rgba(131, 58, 180, 1)' }}
							sx={{ mt: 3, mb: 2 }}>
							Login
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to={'/reset-pass'} variant="body2">
                                    Password forgot?
								</Link>
							</Grid>
							<Grid item>
                                Account not existed?
								<Link to={'/signup'} variant="body2">
									{'Sign up'}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
  );
};

export default Login;
