const User = require("../models/users")
const P_user = require("../models/users")
const jwt = require("jsonwebtoken");
const schemes = require('../models/schemes')
const cloudinary = require("../helper/imageupload")

exports.createUser = async (req, res) => {
    const { mobile, email, password } = req.body

    console.log(req.body);

    const isNewUser = await User.isThisEmailInUse(email);
    if (!isNewUser)
        return res.json({
            success: false,
            message: 'This Email is already in use, try Sign-In'
        });
    const user = await User({
        mobile,
        email,
        password,
    });

    // console.log(user);



    await user.save();


    res.json({ success: true, user });

    console.log(res.json);
}


exports.userSignIn = async (req, res) => {
    const { email, password } = req.body

    console.log(req.body);

    const user = await User.findOne({ email })

    if (!user) return res.json({ success: false, message: "user not found,with the given email" })

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.json({ success: false, message: "email / password does not match!" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '90d', });
    const userInfo = {
        mobile: user.mobile,
        email: user.email,
        avatar: user.avatar ? user.avatar : '',
    }
    res.json({ success: true, user: userInfo, user, token })
};


exports.uploadProfile = async (req, res) => {
    const { user } = req


    if (!user) return res.status(401).json({ success: false, message: 'unauthorized access!' });

    console.log(req.file);

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: `$(user._id)_profile`,
            width: 500,
            height: 500,
            crop: "fill"
        })
        console.log(result)

        await User.findByIdAndUpdate(user._id, { avatar: result.url })
        res.status(201).json({ success: true, message: 'your file updated' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'sever error' })
        console.log('error while uploading profile image', error.message);
    }
}


exports.enterPan = async (req, res) => {


    const { dob, firstName, lastName, pan } = req.body

    const { user } = req
    console.log(user._id)


    console.log(req.body.data);

    await User.findByIdAndUpdate(user._id, req.body.data);


    res.status(201).json({ success: true, message: 'your data updated' })

}

exports.personalDetails = async (req, res) => {


    const { add, pin, city, state } = req.body

    const { user } = req
    console.log(user._id)


    console.log(req.body.data)

    await User.findByIdAndUpdate(user._id, req.body.data);


    res.status(201).json({ success: true, message: 'your data updated' })

}

exports.NomineeDetail = async (req, res) => {


    const { n_name, n_dob, n_pan, n_relation } = req.body

    const { user } = req
    console.log(user._id)


    console.log(req.body.data);

    await User.findByIdAndUpdate(user._id, req.body.data);


    res.status(201).json({ success: true, message: 'your data updated' })

}


exports.BankDetail = async (req, res) => {


    const { ifsc, accNo, bankName, accType } = req.body

    const { user } = req
    console.log(user._id)


    console.log(req.body.data);

    await User.findByIdAndUpdate(user._id, req.body.data);


    res.status(201).json({ success: true, message: 'your data updated' })

}


exports.annualIncome = async (req, res) => {


    const { annualIncome, gender, taxStatus, ucc } = req.body

    const { user } = req
    console.log(user._id)


    console.log(req.body.gen)

    await User.findByIdAndUpdate(user._id, req.body.gen)


    res.status(201).json({ success: true, message: 'your data updated' })

}



exports.s_data = async (req, res) => {

    let data = await schemes.find();
    res.send(data)

}


exports.u_data = async (req, res) => {
  let data = await User.find();
  res.send(data);
};
