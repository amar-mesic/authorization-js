import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setMode, setLogout, AppState } from 'state'
import { useNavigate } from 'react-router-dom'
import FlexBetween from 'components/FlexBetween'
import { useState } from 'react'

export default function NavBar() {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state: AppState) => state.user) || {
        firstName: 'Amar',
        lastName: 'Mesic',
    }
    const isDesktopScreen = useMediaQuery('(min-width: 1000px)')
    console.log(`is desktop screen: ${isDesktopScreen}`)

    const theme = useTheme()
    const neutralLight = theme.palette.neutral.light
    const dark = theme.palette.neutral.dark
    const background = theme.palette.background.default
    const primaryLight = theme.palette.primary.light
    const alt = theme.palette.background.alt

    const fullName = `${user.firstName} ${user.lastName}`

    return (
        <nav>
            <FlexBetween padding="1rem 6%" bgcolor={alt}>
                <FlexBetween gap="1.75rem">
                    <Typography
                        fontWeight={'bold'}
                        fontSize="clamp(1rem, 2rem, 2.25rem)"
                        color="primary"
                        onClick={() => navigate('/home')}
                        sx={{
                            '&:hover': {
                                color: primaryLight,
                                cursor: 'pointer',
                            },
                        }}
                    >
                        Sociopedia
                    </Typography>

                    {isDesktopScreen ? (
                        <FlexBetween
                            color={neutralLight}
                            borderRadius="9px"
                            gap="3rem"
                            padding="0.1rem 1.5rem"
                        >
                            <InputBase placeholder="...search"></InputBase>
                            <IconButton>
                                <Search></Search>
                            </IconButton>
                        </FlexBetween>
                    ) : (
                        <></>
                    )}
                </FlexBetween>

                {isDesktopScreen ? (
                    <FlexBetween gap="2rem">
                        <IconButton
                            onClick={() => dispatch(setMode())}
                            sx={{ fontSize: '25px' }}
                        >
                            {theme.palette.mode === 'dark' ? (
                                <DarkMode sx={{ fontSize: '25px' }} />
                            ) : (
                                <LightMode
                                    sx={{ color: dark, fontSize: '25px' }}
                                />
                            )}
                        </IconButton>
                        <Message sx={{ fontSize: '25px' }} />
                        <Notifications sx={{ fontSize: '25px' }} />
                        <Help sx={{ fontSize: '25px' }} />
                        <FormControl variant="standard">
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: '150px',
                                    borderRadius: '0.25rem',
                                    padding: '0.25rem 1rem',
                                    '& .MuiSvgIcon-root': {
                                        pr: '0.25rem',
                                        width: '2rem',
                                    },
                                    '& MuiSelect-select:focus': {
                                        backgroundColor: neutralLight,
                                    },
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => dispatch(setLogout())}
                                >
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                ) : (
                    <IconButton
                        onClick={() =>
                            setIsMobileMenuToggled(
                                (prevState) => !prevState
                            )
                        }
                    >
                        <Menu />
                    </IconButton>
                )}

                {/* MOBILE NAVBAR */}
                {!isDesktopScreen && isMobileMenuToggled ? (
                    <Box
                        position="fixed"
                        right="0"
                        bottom="0"
                        height="100%"
                        zIndex="10"
                        maxWidth="500px"
                        minWidth="300px"
                        bgcolor={background}
                    >
                        <Box
                            display={'flex'}
                            justifyContent="flex-end"
                            padding={'1rem'}
                        >
                            <IconButton
                                onClick={() =>
                                    setIsMobileMenuToggled(
                                        (prevState) => !prevState
                                    )
                                }
                            >
                                <Close />
                            </IconButton>
                        </Box>

                        {/* MOBILE MENU ITEMS */}
                        <FlexBetween
                            gap="3rem"
                            flexDirection="column"
                            justifyContent="center"
                        >
                            <IconButton
                                onClick={() => dispatch(setMode())}
                                sx={{ fontSize: '25px' }}
                            >
                                {theme.palette.mode === 'dark' ? (
                                    <DarkMode sx={{ fontSize: '25px' }} />
                                ) : (
                                    <LightMode
                                        sx={{
                                            color: dark,
                                            fontSize: '25px',
                                        }}
                                    />
                                )}
                            </IconButton>
                            <Message sx={{ fontSize: '25px' }} />
                            <Notifications sx={{ fontSize: '25px' }} />
                            <Help sx={{ fontSize: '25px' }} />
                            <FormControl variant="standard">
                                <Select
                                    value={fullName}
                                    sx={{
                                        backgroundColor: neutralLight,
                                        width: '150px',
                                        borderRadius: '0.25rem',
                                        padding: '0.25rem 1rem',
                                        '& .MuiSvgIcon-root': {
                                            pr: '0.25rem',
                                            width: '2rem',
                                        },
                                        '& MuiSelect-select:focus': {
                                            backgroundColor: neutralLight,
                                        },
                                    }}
                                    input={<InputBase />}
                                >
                                    <MenuItem value={fullName}>
                                        <Typography>{fullName}</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            dispatch(setLogout())
                                        }
                                    >
                                        Log Out
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </FlexBetween>
                    </Box>
                ) : (
                    <></>
                )}
            </FlexBetween>
        </nav>
    )
}
