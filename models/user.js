// user model declaration

// define use case

// import any required libraries
'use strict'
const bcrypt = require('bcrypt')

// declare user model format
module.exports = function(sequelize, DataTypes) {
    // define object
    const user = sequelize.define('user', { // defines the user object
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'invalid email address'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1,99],
                    msg: 'name must be between 1 and 99 characters'
                }
            }
        }, 
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 99],
                    msg: 'password is of incorrect length (8-99 characters)'
                }
            }
        }
    }, {
        hooks: {
            // before record creation
            beforeCreate: function(createdUser, options) { // NEVER USE AN ARROW FUNCTION HERE BECAUSE SEQUELIZE WILL RUN IT DIFFERENTLY
                if (createdUser && createdUser.password) { // take password
                    let hash = bcrypt.hashSync(createdUser.password, 12) // hash password
                    createdUser.password = hash // returned new password as password the new record
                }
            }
        }
    })
    user.associate = function(models) {

    }
    // validPassword definition to validate password at user login
    user.prototype.validPassword = function(passwordTyped) {
        return bcrypt.compareSync(passwordTyped, this.password)
    }
    // remove password before any serialization of user object
    user.prototype.toJSON = function() {
        let userData = this.get()
        delete userData.password
        return userData
    }

    return user
}

