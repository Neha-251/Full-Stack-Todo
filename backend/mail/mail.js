const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const CLIENT_ID = '223725562742-cf0ogur9mouob7drk1f0qbdpi1pgp57f.apps.googleusercontent.com'; // 
const CLIENT_SECRET = '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'; // 
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//044-Hdw6VzLhoCgYIARAAGAQSNwF-L9Ir10X4-U9dk-2E_S0Xy1YKoRp1IRlf3ZbN_2uZvDKzQfgp3oCM6Su6jYpMyFs0emY77Uo'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })


module.exports = async (user, todo) => {

    try {
        const accessToken = await oAuth2Client.getAccessToken();

        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'nehabadal2018@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        let mailOptions = {
            from: 'Neha Sen',
            to: user.email,
            subject: 'New Todo Created',
            text: `New todo task  "${todo.title}" created at: ${todo.startTime} which is going to expiry in ${todo.expiry} minutes. To Do any changes please visit this link http://localhost:3000/${todo.taskId}. Thankyou Have a good day `

        }

        const result = await transport.sendMail(mailOptions);
        return result

    } catch (error) {
        return error
    }
}


