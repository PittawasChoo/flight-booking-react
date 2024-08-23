import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import SpinnerButton from "components/SpinnerButton";

import { axiosMethods } from "constant/axiosMethods";

import { AuthContext } from "contexts/AuthContext";

import useFlightBookingApiMutation from "hooks/useFlightBookingApiMutation";

import { sanitize } from "modules/text";

import { ButtonWrapper, InputWrapper, LoginText } from "./styles";

const ERROR_MESSAGE = "Required";

const MODAL_BOX_STYLES = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 15,
    p: 4,
};

const LoginPage = ({ onComplete = () => {}, onError = () => {} }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    const { login: contextLogin } = useContext(AuthContext);

    // get search result
    const { trigger: login, isMutating: loggingIn } = useFlightBookingApiMutation({
        route: "/user/login",
        method: axiosMethods.POST,
        body: {
            username: sanitize(username),
            password: sanitize(password),
        },
        options: {
            onError: (error) => {
                setLoginErrorMessage(error.response.data.message);
                onError();
            },
            onComplete: (data) => {
                contextLogin(data.token);
                onComplete(data);
            },
        },
    });

    const handleLogin = () => {
        setLoginErrorMessage();

        if (!username || !password) {
            setShowError(true);
        } else {
            // sanitize input data
            setShowError(false);
            login();
        }
    };

    const noUserName = showError && !username;
    const noPassword = showError && !password;

    return (
        <div>
            <Box sx={MODAL_BOX_STYLES}>
                <LoginText>Login</LoginText>
                <InputWrapper>
                    <TextField
                        sx={{ width: 300 }}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        error={noUserName}
                        helperText={noUserName && ERROR_MESSAGE}
                        label="username"
                    />
                </InputWrapper>
                <InputWrapper>
                    <TextField
                        sx={{ width: 300 }}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        error={noPassword}
                        helperText={noPassword && ERROR_MESSAGE}
                        label="password"
                        type="password"
                    />
                </InputWrapper>
                {loginErrorMessage && (
                    <InputWrapper>
                        <Alert severity="error">Unable to login: {loginErrorMessage}</Alert>
                    </InputWrapper>
                )}
                <ButtonWrapper>
                    <SpinnerButton loading={loggingIn} onClick={handleLogin} />
                </ButtonWrapper>
            </Box>
        </div>
    );
};

LoginPage.propTypes = {
    onComplete: PropTypes.func,
    onError: PropTypes.func,
};

export default LoginPage;
