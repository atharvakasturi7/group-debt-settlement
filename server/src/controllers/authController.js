    import User from "../models/user.js";
    import bcrypt from "bcrypt";

    async function registerUser(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields required" })
            }

            if (password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters long" });
            }

            const normalizedEmail = email.toLowerCase();

            const emailAlready = await User.findOne({ email:normalizedEmail });
            if (emailAlready) {
                return res.status(409).json({ message: "Email Address already exists" })
            }

            const hashPassword = await bcrypt.hash(password, 10);

            await User.create({
                name,
                email: normalizedEmail,
                password: hashPassword
            })

            return res.status(201).json({ message: "User Registered" })
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    export default registerUser;


