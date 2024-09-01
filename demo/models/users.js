
const mongoose = require("mongoose");

const bcrypt = require('bcrypt')

const user = {

    fullname: '',
    email: '',
    password: '',
    avatar: '',
    pan: '',
    firstName: '',
    lastName: '',
    dob: '',
    add: '',
    pin: '',
    city: '',
    state: '',
    mobile: '',
    ifsc: '',
    accNo: '',
    bankName: '',
    accType: '',
    annualIncome: '',
    gender: '',
    taxStatus: '',
    ucc: '',
}


const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,

    },
    password: {
        type: String,
        require: true,
    },

    pan: {
        type: String,
        require: true,
    },

    firstName: {
        type: String,
        require: true,

    },
    lastName: {
        type: String,
        require: true,
    },

    dob: {
        type: String,
        require: true,
    },

    add: {
        type: String,
        require: true,
    },

    pin: {
        type: String,
        require: true,

    },
    city: {
        type: String,
        require: true,
    },

    state: {
        type: String,
        require: true,
    },

    n_name: {
        type: String,
        require: true,
    },

    n_dob: {
        type: String,
        require: true,

    },
    n_pan: {
        type: String,
        require: true,
    },

    n_relation: {
        type: String,
        require: true,
    },

    mobile: {
        type: String,
        require: true,
    },
    ifsc: {
        type: String,
        require: true,

    },
    accNo: {
        type: String,
        require: true,
    },

    bankName: {
        type: String,
        require: true,
    },

    accType: {
        type: String,
        require: true,
    },

    annualIncome: {
        type: String,
        require: true,
    },

    gender: {
        type: String,
        require: true,
    },

    taxStatus: {
        type: String,
        require: true,
    },

    ucc: {
        type: String,
        require: true,
    },


    avatar: String,


});


/////////////////////////////////////hash method is here ////////////////////////////////////////////////////



userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            next();
        })
    }
});



userSchema.methods.comparePassword = async function(password){
    if (!password) throw new Error ('password is Missing, Can not Compare!')

        try {
         const result =  await bcrypt.compare(password,this.password)  
        return result ;
        } catch (error) {
            console.log('Error while comparing password!', error.message)
            
        }
}




//////////////////////////////////////////// hash method upto///////////////////////////////////////////////////////////////////////////////////


userSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('Invalid Email');

    try {
        const user = await this.findOne({ email })
        if (user) return false
        return true;

    } catch (error) {
        console.log('error inside isThisEmailInUse method', error.message)
        return false
    }

}


module.exports = mongoose.model('User', userSchema) 