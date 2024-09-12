const express = require('express');




const router = express.Router();
const {
  createUser,
  verifyOtp,
	userController,
  userSignIn,
  uploadProfile,
  enterPan,
  personalDetails,
  NomineeDetail,
  BankDetail,
  annualIncome,
  s_data,
  u_data,
  emailOtp,
  uccDetails,
  signOut,
} = require("../controllers/user");
const { validateUserSignUp, userValidation, validateUserSignIn, validateUserPan, validateUserPersonalDetails, validateUserNomineeDetails, validateUserBankDetails } = require('../middlewares/validation/user');
const { isAuth } = require('../middlewares/auth');


const multer = require('multer')
const sharp = require('sharp')

const storage = multer.diskStorage({})


const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith('image')) {
        cb(null, true);

    } else {
        cb('invalid Image File!', false);
    }

};

const uploads = multer({ storage, fileFilter });

router.post('/create-user', validateUserSignUp, userValidation, createUser);

router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);

router.post('/sign-out', isAuth, signOut);

router.post('/upload-profile', isAuth, uploads.single('profile'), uploadProfile);

router.post('/enter-pan', isAuth, validateUserPan, enterPan);

router.post('/personal-details', isAuth, validateUserPersonalDetails, personalDetails);

router.post('/nominee-details', isAuth, validateUserNomineeDetails, NomineeDetail);

router.post('/bank-details', isAuth, validateUserBankDetails, BankDetail);

router.post('/annual-income', isAuth, annualIncome);

router.post("/ucc-details", isAuth, uccDetails);

router.post("/request-otp", emailOtp); 

router.post("/verify-otp", verifyOtp); 

router.get('/get-name', s_data);

router.get("/getUser-data", u_data);

module.exports = router;
