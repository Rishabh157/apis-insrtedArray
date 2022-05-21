function genRateOtp(otpNum) {
 let random = String(Math.round(Math.random() * Math.pow(10, otpNum)))

 if (random.length != otpNum) {
  let otpLen = otpNum - random.length
  random = "0".repeat(otpLen) + random
  return random
 }
 else {
  return random
 }
}