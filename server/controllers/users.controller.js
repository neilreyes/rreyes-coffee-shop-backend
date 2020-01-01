const passport = require("passport");
const UserModel = require("../models/User");
const { generatePassword } = require("../utils/password");

module.exports = {
    login: async (username, password, done) => {
        const user = await UserModel.findOne({ username });

        // Check if username or password is not supplied
        if (!user || !password) {
            return done(null, false, { message: "Invalid credentials" });
        }

        // Verify if password valid
        const isPasswordValid = user.verifyPassword(
            password,
            user.hash,
            user.salt
        );

        if (!isPasswordValid) {
            return done(null, false, { message: "Invalid password" });
        }

        return done(null, user);
    },
    logout: (req, res) => {
        req.logout();

        return res.status(200).json({ message: "User has been logged out" });
    },
    serialize: async (user, done) => {
        await done(null, user.id);
    },
    deserialized: async (id, done) => {
        await UserModel.findById(id, (err, user) => {
            done(err, user);
        });
    },
    register: async (req, res) => {
        try {
            const { username, email, password, password2 } = req.body;
            let errors = [];
            const user = await UserModel.findOne({ email });

            if (!username || !email || !password || !password2) {
                errors.push({ message: "Invalid data" });
            }

            // Check if email exists
            if (user) {
                errors.push({ message: "Email already exists" });
            }

            // Password
            if (password.length < 6) {
                errors.push({
                    message: "Password must be atleast 6 characters long",
                });
            }

            // Check password if match
            if (password !== password2) {
                errors.push({ message: "Password did not mismatch" });
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const result = generatePassword(password);

            const newUser = new UserModel({
                username,
                email,
                hash: result.hash,
                salt: result.salt,
            });

            await newUser.save();

            req.login(newUser, (error) => {
                if (error) {
                    return res.status(500).json(error);
                }

                return res.status(200).json({
                    message: "User has been created",
                    payload: newUser,
                });
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(200).json({ message: "Invalid input" });
            }

            const user = await UserModel.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const newCredentials = user.hashPassword(password);

            let updated_credetials = {
                ...user._doc,
                hash: newCredentials.hash,
                salt: newCredentials.salt,
                rawPassword: password,
                permissionLevel: 100,
            };

            await user.updateOne(updated_credetials);

            return res.status(200).json({
                message: "Password has been changed",
                payload: user,
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await UserModel.findById({ _id: req.params._id });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({ payload: user });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.find();
            if (!users) {
                return res.status(401).json({ payload: "No users found" });
            }
            return res.status(201).json({ payload: users });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },
    deleteUser: async (req, res) => {
        try {
            // Check if user is the account holder
            if (!(req.user._id == req.params._id || req.user.admin)) {
                return res
                    .status(401)
                    .json({ message: "Unauthorized: Access level denied!" });
            }

            const user = await UserModel.findById({
                _id: req.params._id,
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            await user.remove();

            return res
                .status(200)
                .json({ message: "User has successfully deleted" });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateUser: async (req, res) => {
        try {
            // Check if user is the account holder
            if (!req.user._id == req.params._id) {
                return res
                    .status(401)
                    .json({ message: "Unauthorized: Access level denied!" });
            }

            const user = await UserModel.findById({ _id: req.params._id });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            let errors = [];

            let { password, password2 } = req.body;

            if (password !== password2) {
                errors.push({ mesage: "Password mismatch" });
            }

            const { hash, salt } = generatePassword(password);

            if (errors.length > 0) {
                return res.status(500).json({ errors });
            }

            const updatedUser = {
                ...user._doc,
                hash,
                salt,
            };

            await user.updateOne(updatedUser);

            req.login(user, (error) => {
                if (error) {
                    return res.status(500).json(error);
                }

                return res.status(200).json({
                    message: "User has been updated",
                    payload: user,
                });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
};
