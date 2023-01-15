import {
    Box,
    Button,
    Link,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LoginForm from './login'

export default function AuthPage({
    children,
}: {
    children: React.ReactNode
}) {
    const navigate = useNavigate()
    const theme = useTheme()
    const isDektopScreen = useMediaQuery('(min-width: 1000px)')

    return (
        <Box>
            <Box
                width="100%"
                bgcolor={theme.palette.background.alt}
                padding="1rem 6%"
                textAlign={'center'}
            >
                <Typography
                    fontWeight={'bold'}
                    fontSize={theme.typography.h2.fontSize}
                    color="primary"
                >
                    Sociopedia
                </Typography>
            </Box>

            <Box
                width={isDektopScreen ? '60%' : '95%'}
                margin="2rem auto"
                padding="1rem"
                bgcolor={theme.palette.background.alt}
                borderRadius="1rem"
            >
                <Typography
                    fontWeight="bold"
                    variant="h5"
                    marginY="0.5rem"
                >
                    Welcome to Sociopedia, the social media for sociopaths!
                </Typography>

                {children}
            </Box>
        </Box>
    )
}
