import * as yup from 'yup'
import { ErrorMessage, Form, Formik, FormikBag } from 'formik'
import { ChangeEvent, useState } from 'react'
import { Box, Button, Link, TextField } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'
import { setLogin } from 'state'
import { useDispatch } from 'react-redux'

const loginSchema = yup.object().shape({
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required'),
})

type LoginProps = { email: string; password: string }

export default function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={async (values: LoginProps, formikBag) => {
                    const loggedIn = await fetch(
                        'http://localhost:3001/auth/login',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values),
                        }
                    )
                        .then((res) => {
                            if (res.ok) {
                                return res.json()
                            }
                            return res.json().then(({ field, msg }) => {
                                formikBag.setErrors({
                                    [field]: msg,
                                })
                                throw new Error(msg)
                            })
                        })
                        .catch((err) => console.error(err))

                    if (loggedIn) {
                        console.log(
                            `user: ${JSON.stringify(loggedIn, null, 2)}`
                        )
                        formikBag.resetForm()
                        dispatch(
                            setLogin({
                                user: loggedIn.user,
                                token: loggedIn.token,
                            })
                        )
                        return navigate('/home')
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    // status,
                    /* and other goodies */
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Box
                            display="flex"
                            flexDirection="column"
                            marginY="1rem"
                            gap="1.5rem"
                        >
                            {/* {status && <div>{status.authError}</div>} */}
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                type="email"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                    touched.email &&
                                    errors.email !== undefined
                                }
                                helperText={touched.email && errors.email}
                            ></TextField>
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                name="password"
                                value={values.password}
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                    touched.password &&
                                    errors.password !== undefined
                                }
                                helperText={
                                    touched.password && errors.password
                                }
                            ></TextField>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                                sx={{ flex: '1 1 0', paddingY: '8px' }}
                            >
                                LOGIN
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>

            <Link
                onClick={() => {
                    navigate('/auth/register')
                }}
                underline="always"
            >
                Don't have an account? Register here
            </Link>
        </>
    )
}
