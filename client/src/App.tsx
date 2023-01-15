import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from 'react-router-dom'
import HomePage from 'scenes/homePage'
import LoginPage from 'scenes/loginPage'
import ProfilePage from 'scenes/profilePage'
import { AppState, setLogin } from 'state'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { themeSettings } from 'theme'
import NavBar from 'scenes/navbar'
import AuthPage from 'scenes/loginPage'
import LoginForm from 'scenes/loginPage/login'
import RegisterForm from 'scenes/loginPage/register'

export default function App() {
    const mode = useSelector((state: AppState) => state.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
    const isAuthenticated = Boolean(
        useSelector((state: AppState) => state.token)
    )
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(
    //         setLogin({
    //             user: {},
    //             token: 'loggedIn.token',
    //         })
    //     )
    // }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <NavBar />
                                    <Outlet />
                                </>
                            }
                        >
                            <Route
                                path="home"
                                element={
                                    isAuthenticated ? (
                                        <HomePage />
                                    ) : (
                                        <Navigate to="/auth/login" />
                                    )
                                }
                            />
                            <Route
                                path="profile/:userId"
                                element={<ProfilePage />}
                            />
                        </Route>
                        <Route
                            path="/auth"
                            element={
                                <AuthPage>
                                    <Outlet />
                                </AuthPage>
                            }
                        >
                            <Route
                                path="login"
                                element={<LoginForm />}
                            ></Route>
                            <Route
                                path="register"
                                element={<RegisterForm />}
                            ></Route>
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}
