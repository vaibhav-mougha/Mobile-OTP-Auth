import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Spinner,
  Image,
  useToast,
} from "@chakra-ui/react";
import { BsFillShieldLockFill, BsPhoneFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../src/Components/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OtpInput from "otp-input-react";

function App() {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const toast = useToast();

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast({
          title: "Arcade Profusion",
          description: "OTP send succesfully !",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <Box bg={"#F3EAED"} h="100vh" pt={"10rem"} color="#001E4C">
      <Box
        // border={"3px solid white"}
        borderRadius={"3rem"}
        m="auto"
        w={{ base: "90%", md: "60%", lg: "60%" }}
        p={"2rem"}
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
      >
        <Box id="recaptcha-container"></Box>

        {user ? (
          <>
            <Box
              display={"felx"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Heading
                fontSize={{ base: "1.8rem", md: "2.5rem", lg: "4rem" }}
                textAlign="center"
              >
                Login Successfull !!!
              </Heading>
              <Image
                // border={"2px solid white"}
                mx="auto"
                src="https://em-content.zobj.net/source/microsoft-teams/363/thumbs-up_light-skin-tone_1f44d-1f3fb_1f3fb.png"
              />
            </Box>
          </>
        ) : (
          <>
            <Heading
              textAlign={"center"}
              mb={"3rem"}
              fontSize={{ base: "2rem", md: "2.8rem", lg: "4rem" }}
              textDecoration={"underline"}
            >
              Arcade Profusion
            </Heading>

            {showOTP ? (
              <>
                <Box
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Box
                    border={"1px solid white"}
                    borderRadius="50%"
                    p={"0.5rem"}
                    bg={"white"}
                    color={"#001E4C"}
                  >
                    <BsFillShieldLockFill size={35} />
                  </Box>
                  <Heading
                    color={"#001E4C"}
                    ml={"1rem"}
                    fontSize={{ base: "1.5rem", md: "2.2rem", lg: "3rem" }}
                  >
                    OTP Verification
                  </Heading>
                </Box>
                <Box
                  display={"grid"}
                  justifyContent="center"
                  alignItems={"center"}
                  mt={"1rem"}
                >
                  <Text
                    fontSize={{ base: "1rem", md: "1.7rem", lg: "2rem" }}
                    textAlign={"center"}
                    mb={"1rem"}
                  >
                    Enter your OTP
                  </Text>
                  <Box textAlign={"center"} pl={"1rem"}>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      OTPLength={6}
                      otpType="number"
                      disabled={false}
                      autoFocus
                      className="opt-container "
                    ></OtpInput>
                  </Box>
                  <Button
                    onClick={onOTPVerify}
                    mt="2rem"
                    bg={"#001E4C"}
                    color={"white"}
                    _hover={{
                      bg: "white",
                      color: "#001E4C",
                      border: "3px solid #001E4C",
                    }}
                  >
                    {loading && <Spinner color="white" size="md" />}
                    <span> Verify OTP</span>
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  // border={"3px solid white"}
                >
                  <Box
                    border={"1px solid white"}
                    borderRadius="20%"
                    w={{ base: "3rem", md: "3rem", lg: "3rem" }}
                    bg={"white"}
                    color={"#001E4C"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mr={"1rem"}
                  >
                    <BsPhoneFill size={{ base: "55", md: "55", lg: "55" }} />
                  </Box>

                  <Text
                    fontSize={{ base: "1rem", md: "1.7rem", lg: "2rem" }}
                    fontWeight={"semibold"}
                  >
                    Verify your mobile number
                  </Text>
                </Box>

                <Box
                  display={"grid"}
                  justifyContent="center"
                  alignItems={"center"}
                  mt={"3rem"}
                >
                  <Box color={"black"}>
                    <PhoneInput country={"in"} value={ph} onChange={setPh} />
                  </Box>
                  <Button
                    mt="2rem"
                    bg={"#001E4C"}
                    onClick={onSignup}
                    color={"white"}
                    _hover={{
                      bg: "white",
                      color: "#001E4C",
                      border: "3px solid #001E4C",
                    }}
                  >
                    {loading && <Spinner color="white" size="md" mr={"2rem"} />}
                    <span> Send code via SMS</span>
                  </Button>
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;
