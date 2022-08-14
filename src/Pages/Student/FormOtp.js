/* global grecaptcha */
import { Alert, Box, Button, Card, CardContent, FormControl, FormHelperText, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import { LoadingButton } from '@mui/lab';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PasswordIcon from '@mui/icons-material/Password';
import CodeIcon from '@mui/icons-material/Code';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../../firebase';

import axios from 'axios';

function FormOtp() {
    const [helperText, setHelperText] = React.useState('')
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)

    const [aadharNumber, setAadharNumber] = React.useState('')
    const [aadharNumberError, setAadharNumberError] = React.useState(false)
    const [aadharNumberHelperText, setAadharNumberHelperText] = React.useState('')


    const [otp, setOtp] = React.useState('')
    const [otpError, setOtpError] = React.useState(false)
    const [otpHelperText, setOtpHelperText] = React.useState('')

    const [classCode, setClassCode] = React.useState('')
    const [classCodeError, setClassCodeError] = React.useState(false)
    const [classCodeHelperText, setClassCodeHelperText] = React.useState('')

    const [submitLoading, setSubmitLoading] = React.useState(false)



    const captchaVerifier = () => {
        
        try {
            window.recaptchaVerifier = new RecaptchaVerifier('captcha-student-login', 
            {
                size: 'invisible',
            },
            auth);
        }
        catch (e) {
            console.log(e);
            window.recaptchaVerifier.render().then(function(widgetId) {
                grecaptcha.reset(widgetId);
            });
        }
        
    }


    const handleAadharNumber = (e) => {
        setAadharNumber(e.target.value)
        if(e.target.value.length === 12) {
            setAadharNumberError(false)
            setAadharNumberHelperText('')
        }
        else if (e.target.value.length < 1) {
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

    const handleOtp = (e) => {
        setOtp(e.target.value)
        if(e.target.value.length === 6) {
            setOtpError(false)
            setOtpHelperText('')
        }
        if (e.target.value.length < 1) {
            setOtpError(false)
        }
        else if (e.target.value.length > 0 && e.target.value.length === 6 && !isNaN(e.target.value)) {
            setOtpError(false)
            setOtpHelperText('Please enter a valid otp')
        }
    }

    const handleClassCode = (e) => {
        setClassCode(e.target.value)
        if(e.target.value.length === 6) {
            setClassCodeError(false)
            setClassCodeHelperText('')
        }
        if (e.target.value.length < 1) {
            setClassCodeError(false)
        }
        else if (e.target.value.length > 6) {
            setClassCodeError(false)
            setClassCodeHelperText("Please enter a valid class code. class code can't be more than 6 characters")
        }
    }

    const getPhoneNumber = async() => {
        const response = await axios.post('https://smart-india-hackathon-server.vercel.app/api/aadharnumber', {
            headers : {
                'Content-Type': 'application/json',
                "access-control-allow-origin": "*"
            },
            aadharNumber: aadharNumber
        })
        if(response.data.code === "error")
        {
            setAadharNumberError(true)
            setAadharNumberHelperText(response.data.message)
            return false
            
        }
        else
        {
            setAadharNumberError(false)
            setAadharNumberHelperText('')
            console.log(response.data.phoneNumber)
            return true
        }
    }

    const handleOtpRequest = async(event) => {
        event.preventDefault();
        // await getPhoneNumber();

        const response = await axios.post('https://smart-india-hackathon-server.vercel.app/api/aadharnumber', {
             headers : {
                'Content-Type': 'application/json',
                "access-control-allow-origin": "*"
            },

            aadharNumber: aadharNumber
        })
        if(response.data.code === "error")
        {
            setAadharNumberError(true)
            setAadharNumberHelperText(response.data.message)
            
        }
        else
        {
            setAadharNumberError(false)
            setAadharNumberHelperText('')
            captchaVerifier();     
            await signInWithPhoneNumber(auth, response.data.phoneNumber, window.recaptchaVerifier)
                .then(confirmationResult => {
                    console.log(confirmationResult);
                    window.confirmationResult = confirmationResult;
                })
                .catch(error => {
                    console.log(error);
                    window.recaptchaVerifier.render().then(function(widgetId) {
                        grecaptcha.reset(widgetId);
                    });
                })
            console.log(response.data.phoneNumber)
        }
        
        
    }
        const handleOtpVerifier = (event) => {
        event.preventDefault();
        console.log("Hi")
        const code = otp;
        const confirmationResult = window.confirmationResult;
        if (!confirmationResult) {
            return;
        }
        confirmationResult.confirm(code).then((result) => {
        console.log(result);
        
        }).catch((error) => {
            console.log(error);
        });
    }
                


    const handleSubmit = async(e) => {
        e.preventDefault()
        setSubmitLoading(true)
        handleOtpVerifier(e)
        setSubmitLoading(false)
    }

  return (
    
    <div className="m-5">
        <Box
        sx={{ minWidth: 275, flexGrow: 1 }} 
        display="flex"
        flex-direction="column"
        justifyContent="center"
        minHeight="100%">
            <Card variant="outlined" sx={{ minHeight : "100%", flexGrow : 1 }}>
                <React.Fragment>
                    <CardContent>
                        {error ? <Alert severity="error">{helperText}</Alert> : null}
                        {success ? <Alert severity="success">{helperText}</Alert> : null}
                        
                            <br/>
                            <br/>
                        <Typography className="text-center" variant='h4'>Student Otp Code Request</Typography>
                        <Typography className="text-center" variant='h5' sx={{marginY : 5}}>
                                This is a form to request for token to fill the form
                        </Typography>
                    </CardContent>
                    <Box sx={{ margin : "5%"}} component="form" onSubmit={handleSubmit}>
                        <Box
                            sx={{ minWidth: 275, flexGrow: 1 }} 
                            display="flex"
                            flex-direction="column"
                            >
                            <FormControl variant='outlined' sx={{marginX : "20%"}}>
                                            <TextField
                                                id="student-token-request-aadhar"
                                                label="Aadhar Number"
                                                variant="outlined"
                                                required
                                                aria-describedby='student-token-request-aadhar-helper'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CreditCardIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{

                                                    width: 300
                                                }}
                                                placeholder="Enter your aadhar number"
                                                error={aadharNumberError}
                                                value={aadharNumber}
                                                helperText={aadharNumberError ? aadharNumberHelperText : ''}
                                                onChange={handleAadharNumber}
                                            />
                                            <FormHelperText id="student-token-request-aadhar-helper">We'll never share your Aadhar Details.</FormHelperText>
                            </FormControl>
                            <Button type="button" variant="contained" color="primary" disabled={submitLoading} size="large" sx={{marginBottom : "3%", marginRight : "3%"}} onClick={handleOtpRequest}>
                                {submitLoading ? <LoadingButton /> : 'Request Otp'}
                            </Button>
                        </Box>
                        <br/>
                        <br/>
                        <FormControl variant='outlined' fullWidth>
                            <TextField
                                id="student-token-otp"
                                label="One Time Password"
                                variant="outlined"
                                required
                                aria-describedby='student-token-otp-helper'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PasswordIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Enter the one time password"
                                error={otpError}
                                value={otp}
                                helperText={otpError ? otpHelperText : ''}
                                onChange={handleOtp}
                            />
                            <FormHelperText id="student-token-otp-helper">
                                Please enter 6 digits otp code reveived on your registered mobile number
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl variant='outlined' fullWidth>
                            <TextField
                                id="student-class-token-code"
                                label="Class Token Code"
                                variant="outlined"
                                required
                                aria-describedby='student-class-token-code-helper'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CodeIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Enter the class code"
                                error={classCodeError}
                                value={classCode}
                                helperText={classCodeError ? classCodeHelperText : ''}
                                onChange={handleClassCode}
                            />
                            <FormHelperText id="student-class-token-code-helper">
                                Please enter 6 digits class code sent by your teacher
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <Box textAlign='center'>
                                <LoadingButton
                                    loading = {submitLoading}
                                    loadingPosition="end"
                                    endIcon={<AppRegistrationIcon />}
                                    variant="outlined"
                                    type='submit'
                                    disabled={aadharNumberError || error || classCodeError || otpError}
                                >
                                    Request Token
                                </LoadingButton>
                                

                        </Box>
                    </Box>
                </React.Fragment>
            </Card>
        </Box>
        <div id="captcha-student-login">

        </div>
    </div>
  )
}

export default FormOtp
