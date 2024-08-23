import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { get } from "lodash";

import Modal from "components/Modal";
import SpinnerButton from "components/SpinnerButton";

import { axiosMethods } from "constant/axiosMethods";

import { AuthContext } from "contexts/AuthContext";

import useFlightBookingApiMutation from "hooks/useFlightBookingApiMutation";

import { sanitize } from "modules/text";

import { ButtonWrapper, InputWrapper, LoginText } from "./styles";

const ERROR_MESSAGE = "Required";

const LoginModal = ({ onClose = () => {}, onComplete = () => {}, onError = () => {} }) => {
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
                setLoginErrorMessage(get(error, "response.data.message", ""));
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
        <Modal
            onClose={() => {
                setUsername("");
                setPassword("");
                setLoginErrorMessage("");
                setShowError(false);
                onClose();
            }}
        >
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
                <SpinnerButton loading={loggingIn} onClick={handleLogin} buttonlabel="Log In" />
            </ButtonWrapper>
        </Modal>
    );
};

LoginModal.propTypes = {
    onClose: PropTypes.func,
    onComplete: PropTypes.func,
    onError: PropTypes.func,
};

export default LoginModal;
