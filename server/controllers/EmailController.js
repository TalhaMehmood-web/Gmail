import Email from "../models/EmailModel.js";
import User from "../models/UserModel.js";
import nodemailer from "nodemailer";
import validator from "validator";

export const SendMail = async (req, res) => {
    const { userId } = req.body;
    console.log('userId:', userId);
    const { to, subject, body } = req.body
    try {
        if (!validator.isEmail(to)) {
            return res.status(400).json({ message: "Not a valid email" })
        }

        const user = await User.findById(userId)

        if (!user) {

            return res.status(400).json({ message: "User Not Found!" })
        }
        console.log(user)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.DEV_EMAIL,
                pass: process.env.DEV_PASS
            }
        })
        const mailOptions = {
            from: user.email,
            to: to,
            subject,
            text: body
        };
        const info = await transporter.sendMail(mailOptions);
        if (info.rejected.length > 0) {
            return res.status(400).json({ message: `Failed to send email to ${info.rejected.join(', ')}` });
        }
        const newEmail = await Email.create({
            from: user._id,
            to: mailOptions.to,
            subject: mailOptions.subject,
            body: mailOptions.text
        })
        await newEmail.populate("from", "-password")
        await newEmail.save()
        res.status(201).json(newEmail)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }


}
export const allMails = async (req, res) => {

    try {


        const emails = await Email.find().populate("from", "-password");



        res.status(200).json(emails);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const starred = async (req, res) => {
    const { emailId, isStarred } = req.body;

    try {
        const updateEmail = await Email.findById(emailId);

        if (!updateEmail) {
            return res.status(400).json({ message: "Email not found!" });
        }

        updateEmail.starred = isStarred;

        // Save the updated email
        await updateEmail.save();

        res.status(200).json({ message: "Email updated successfully", updatedEmail: updateEmail });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const bin = async (req, res) => {
    const { emailId, isBin } = req.body;

    try {
        const updateEmail = await Email.findById(emailId);

        if (!updateEmail) {
            return res.status(400).json({ message: "Email not found!" });
        }

        updateEmail.bin = isBin;

    
        await updateEmail.save();

        res.status(200).json({ message: "Email updated successfully", updatedEmail: updateEmail });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
