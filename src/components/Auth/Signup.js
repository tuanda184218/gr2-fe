import { useState } from "react";
import { postRegister } from '../../services/apiService'
import { toast } from "react-toastify";
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { Link, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider } from '@mui/material/styles'



export default function Signup(){
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(["ROLE_USER"]);
  const navigate = useNavigate();

  const theme = createTheme()

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    //validate
    if (!username) {
      toast.warn("Username can not be blanked!");
      return;
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.warn("Invalid email!");
      return;
    }

    if (!password) {
      toast.warn("Password can not be blanked!");
      return;
    }


    try {
        let res = await postRegister(username, email, password, role);
        
        if (res.data && res.status === 200) 
        {
            toast.success("Register successfully!");
            setTimeout(function () {
            return navigate('/login')
          }, 1000)
        }
      } catch (err) {
        toast.error('Username or email is existed!')
      }
  };

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
					<Typography component="h1" variant="h5">
						Đăng ký
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete="username"
									name="username"
									required
									fullWidth
									id="username"
									label="username"
									autoFocus
                                    onChange={(event) => setUsername(event?.target?.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField required fullWidth id="email" label="email" name="email" autoComplete="email" onChange={(event) => setEmail(event?.target?.value)}/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="password"
									type="password"
									id="password"
									autoComplete="new-password"
                                    onChange={(event) => setPassword(event?.target?.value)}
								/>
							</Grid>

						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							style={{ backgroundColor: 'rgba(131, 58, 180, 1)' }}>
                                Sign up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link to={'/login'} variant="body2">
									Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
  );
};

