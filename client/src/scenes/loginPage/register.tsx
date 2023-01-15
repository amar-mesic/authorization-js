import * as yup from 'yup'
import { Form, Formik, FormikHelpers } from 'formik'
import {
    Box,
    Button,
    Link,
    TextField,
    Typography,
    useTheme,
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useNavigate } from 'react-router-dom'
import { setLogin } from 'state'
import { useDispatch } from 'react-redux'
import Dropzone from 'react-dropzone'
import FlexBetween from 'components/FlexBetween'

const registerSchema = yup.object().shape({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('required'),
    location: yup.string().required('required'),
    occupation: yup.string().required('required'),
    picture: yup.mixed().required('required'),
})

type RegisterProps = {
    firstName: string
    lastName: string
    email: string
    password: string
    location: string
    occupation: string
    picture: File | undefined
}

export default function RegisterForm() {
    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function myRegister(
        values: RegisterProps,
        formikBag: FormikHelpers<RegisterProps>
    ) {
        const formData = new FormData()
        for (let value in values) {
            formData.append(value, (values as any)[value])
            // console.log(value, (values as any)[value])
        }
        formData.append('picturePath', values.picture!.name)

        const registered = await fetch(
            'http://localhost:3001/auth/register',
            {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json',
                },
                body: formData,
            }
        )
            .then(async (res) => {
                if (res.status) {
                    return res.json()
                }
                const { field, msg } = await res.json()
                formikBag.setErrors({
                    [field]: msg,
                })
                throw new Error(msg)
            })
            .catch((err) => console.error(err))

        if (registered) {
            formikBag.resetForm()
            dispatch(
                setLogin({
                    user: registered.user,
                    token: registered.token,
                })
            )
            console.log(`user: ${JSON.stringify(registered, null, 2)}`)
            // return navigate('/home')
        }
    }

    return (
        <>
            <Formik
                initialValues={
                    {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        location: '',
                        occupation: '',
                        picture: undefined,
                    } as RegisterProps
                }
                validationSchema={registerSchema}
                onSubmit={myRegister}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    /* and other goodies */
                }) => (
                    <Form
                        onSubmit={handleSubmit}
                        // encType="multipart/form-data"
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            marginY="1rem"
                            gap="1.5rem"
                        >
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                name="firstName"
                                type="text"
                                value={values.firstName}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                    touched.firstName &&
                                    errors.firstName !== undefined
                                }
                                helperText={
                                    touched.firstName && errors.firstName
                                }
                            ></TextField>
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                name="lastName"
                                type="text"
                                value={values.lastName}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                    touched.lastName &&
                                    errors.lastName !== undefined
                                }
                                helperText={
                                    touched.lastName && errors.lastName
                                }
                            ></TextField>
                            <TextField
                                label="Location"
                                variant="outlined"
                                fullWidth
                                name="location"
                                type="text"
                                value={values.location}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                    touched.location &&
                                    errors.location !== undefined
                                }
                                helperText={
                                    touched.location && errors.location
                                }
                            ></TextField>
                            <TextField
                                label="Occupation"
                                variant="outlined"
                                fullWidth
                                name="occupation"
                                type="text"
                                value={values.occupation}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                    touched.occupation &&
                                    errors.occupation !== undefined
                                }
                                helperText={
                                    touched.occupation && errors.occupation
                                }
                            ></TextField>
                            <Box
                                border={`1px solid ${theme.palette.neutral
                                    .medium!}`}
                                borderRadius="5px"
                                p="1rem"
                            >
                                <Dropzone
                                    accept={{
                                        'image/*': [
                                            '.png',
                                            '.gif',
                                            '.jpeg',
                                            '.jpg',
                                        ],
                                    }}
                                    multiple={false}
                                    onDrop={(acceptedFiles) => {
                                        console.log(
                                            `file info: ${JSON.stringify(
                                                acceptedFiles[0]
                                            )}`
                                        )
                                        setFieldValue(
                                            'picture',
                                            acceptedFiles[0]
                                        )
                                        console.log(
                                            `picture value: ${JSON.stringify(
                                                values.picture
                                            )}`
                                        )
                                    }}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${theme.palette.primary.main}`}
                                            p="1rem"
                                            sx={{
                                                '&:hover': {
                                                    cursor: 'pointer',
                                                },
                                            }}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <p>Add Picture Here</p>
                                            ) : (
                                                <FlexBetween>
                                                    <Typography>
                                                        {
                                                            values.picture
                                                                .name
                                                        }
                                                    </Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>

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
                                REGISTER
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>

            <Link
                onClick={() => {
                    navigate('/auth/login')
                }}
                underline="always"
            >
                Already have an account? Log in here
            </Link>
        </>
    )
}
