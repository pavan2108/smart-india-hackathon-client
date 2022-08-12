import { Alert, Box, Card, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import EmailIcon from '@mui/icons-material/Email';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import LoadingButton from '@mui/lab/LoadingButton';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from 'axios';
function StudentRegistration() {

    const [universityList, setUniversityList] = React.useState([]);
    const [email, setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)
    const [emailHelperText, setEmailHelperText] = React.useState('')

    const [aadharNumber, setAadharNumber] = React.useState('')
    const [aadharNumberError, setAadharNumberError] = React.useState(false)
    const [aadharNumberHelperText, setAadharNumberHelperText] = React.useState('')

    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [phoneNumberError, setPhoneNumberError] = React.useState(false)
    const [phoneNumberHelperText, setPhoneNumberHelperText] = React.useState('')

    const [name, setName] = React.useState('')
    const [nameError, setNameError] = React.useState(false)
    const [nameHelperText, setNameHelperText] = React.useState('')

    const [university, setUniversity] = React.useState('')

    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')

    const [submitLoading, setSubmitLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:3500/api/fetchalluniversity').then(res => {
            setUniversityList(res.data.data);
        }).catch(err => {
            setError(true)
            setErrorMessage("We are facing some technical issues. Please try again later.")
        })
        setLoading(false)
    } , []);


    const resetForm = () => {
        setEmail('')
        setAadharNumber('')
        setPhoneNumber('')
        setName('')
        setUniversity('')
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
        if (e.target.value.length < 1) {
            setEmailError(false)
        }
        else if (e.target.value.length > 0 && e.target.value.includes('@') && e.target.value.includes('.')) {
            setEmailError(false)
            setEmailHelperText('')
        } else {
            setEmailError(true)
            setEmailHelperText('Please enter a valid email')
        }
    }

    const handleAadharNumber = (e) => {
        setAadharNumber(e.target.value)
        if (e.target.value.length < 1) {
            setAadharNumberError(false)
        }
        else if (e.target.value.length > 0 && e.target.value.length === 12 && !isNaN(e.target.value)) {
            setAadharNumberError(false)
            setAadharNumberHelperText('')
        } else {
            setAadharNumberError(true)
            setAadharNumberHelperText('Please enter a valid aadhar number')
        }
    }

    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
        if (e.target.value.length < 1) {
            setPhoneNumberError(false)
        }
        else if (e.target.value.length > 0 && e.target.value.length === 12 && !isNaN(e.target.value)) {
            setPhoneNumberError(false)
            setPhoneNumberHelperText('')
        } else {
            setPhoneNumberError(true)
            setPhoneNumberHelperText('Please enter a valid phone number')
        }
    }
    const handleName = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 1) {
            setNameError(false)
        }
        else if (e.target.value.length > 0) {
            setNameError(false)
            setNameHelperText('')
        } else {
            setNameError(true)
            setNameHelperText('Please enter a valid name')
        }
    }


    const isAadharValid = async() => {
        const aadharData = await axios.post('http://localhost:3500/api/aadharnumbervalidation', {
            aadharNumber: aadharNumber
        })
        if (aadharData.data.code === 'success') {
            setAadharNumberError(false)
            setAadharNumberHelperText('')
            return true;
        } else {
            setAadharNumberError(true)
            setAadharNumberHelperText('Please enter a valid aadhar number')
            return false;
        }
    }

    const isNotDuplicateEntry = async() => {
        const studentEntry = await axios.post('http://localhost:3500/api/studentexists', {
            aadharNumber: aadharNumber
        })
        if(studentEntry.data.code==="success")
        {
            return;
        }
        else
        {
            setError(true)
            setErrorMessage(`Seems you were active student of univeristy ${studentEntry.data.data.universityName}. Please apply transfer`)
        }
    }
    

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitLoading(true)
        if (emailError || aadharNumberError || phoneNumberError || nameError) {
            setSubmitLoading(false)
            setError(true)
            setErrorMessage('Please fill all the fields')
        } else {
            isAadharValid()
            isNotDuplicateEntry()
        }
        resetForm()
        setSubmitLoading(false)
    }
  return (
    <div className='m-5'>
        <Box 
        sx={{ minWidth: 275, flexGrow: 1 }} 
        display="flex"
        flex-direction="column"
        justifyContent="center"
        minHeight="100%">
            <Card variant="outlined" sx={{ minHeight : "100%", flexGrow : 1 }}>
                <React.Fragment>
                    <CardContent>
                        {error ? <Alert severity="error">{errorMessage}</Alert> : null}
                            <br/>
                            <br/>
                        <Typography className="text-center" variant='h4'>Student Registration</Typography>
                        <Typography className="text-center" variant='h5' sx={{marginY : 5}}>
                                This is a form to register a student into the institution
                        </Typography>
                    </CardContent>
                    <Box sx={{ margin : "5%"}} component="form" onSubmit={handleSubmit}>
                        <FormControl fullWidth variant='outlined'>
                            <TextField 
                                id="student-register-email"
                                label="Email"
                                variant="outlined"
                                aria-describedby='student-register-email-helper'
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Enter your email"
                                type={'email'}
                                error={emailError}
                                value={email}
                                helperText={emailError ? emailHelperText : ''}
                                onChange={handleEmail}
                            />
                            <FormHelperText id="student-register-email-helper">We'll never share your email Details.</FormHelperText>
                        </FormControl>
                        <br/>
                        <br />
                        <FormControl fullWidth variant='outlined'>
                            <TextField 
                                id="student-register-name"
                                label="Name"
                                variant="outlined"
                                aria-describedby='student-register-name-helper'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                required
                                placeholder="Enter your Name"
                                error={nameError}
                                value={name}
                                helperText={nameError ? nameHelperText : ''}
                                onChange={handleName}
                            />
                            <FormHelperText id="student-register-name-helper">Please enter your full name.</FormHelperText>
                        </FormControl>
                        <br/>
                        <br />
                        <FormControl fullWidth variant='outlined'>
                            <TextField 
                                id="student-register-aadhar"
                                label="Aadhar Number"
                                variant="outlined"
                                required
                                aria-describedby='student-register-email-helper'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CreditCardIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Enter your aadhar number"
                                error={aadharNumberError}
                                value={aadharNumber}
                                helperText={aadharNumberError ? aadharNumberHelperText : ''}
                                onChange={handleAadharNumber}
                            />
                            <FormHelperText id="student-register-aadhar-helper">We'll never share your Aadhar Details.</FormHelperText>
                        </FormControl>
                        <br/>
                        <br />
                        <FormControl fullWidth variant='outlined'>
                            <TextField 
                                id="student-register-phone"
                                label="Phone Number"
                                variant="outlined"
                                required
                                aria-describedby='student-register-phone-helper'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Enter your phone number"
                                error={phoneNumberError}
                                value={phoneNumber}
                                helperText={phoneNumberError ? phoneNumberHelperText : ''}
                                onChange={handlePhoneNumber}
                            />
                            <FormHelperText id="student-register-phone-helper">Please add country code with your number for example 919999999999.</FormHelperText>
                        </FormControl>
                        <br/>
                        <br />
                        <FormControl fullWidth variant='outlined'>
                            <InputLabel id="student-register-university-label">University</InputLabel>
                            <Select
                                labelId="student-register-university-label"
                                id="student-register-university"
                                label="Age"
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}
                                required
                            >
                                {universityList.map((university, index) => {
                                    return <MenuItem key={index} value={university.uid}>{university.uid} - {university.universityName}</MenuItem>
                                })}

                            </Select>
                            <FormHelperText id="student-register-phone-helper">Please select a university</FormHelperText>
                        </FormControl>
                        <br/>
                        <br />
                        <Box textAlign='center'>
                                <LoadingButton
                                    loading = {submitLoading}
                                    loadingPosition="end"
                                    endIcon={<AppRegistrationIcon />}
                                    variant="outlined"
                                    type='submit'
                                    disabled={nameError || aadharNumberError || phoneNumberError || nameError}
                                >
                                    Register
                                </LoadingButton>
                                

                        </Box>
                        
                    </Box>
                </React.Fragment>
                
            </Card>
        </Box>
    </div>
  )
}

export default StudentRegistration;