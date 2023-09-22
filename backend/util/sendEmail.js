const nodeMailer=require('nodemailer')

const sendEmail=async(content)=>{

    const transporter=nodeMailer.createTransport({
        // host:process.env.smtp_host,
        // port:process.env.smtp_port,
        service:process.env.smtp_service,
        auth:{
            user:process.env.smtp_mail,
            pass:process.env.smtp_password
        }

    })

    const mailOptions={
        from:process.env.smtp_mail,
        to:content.email,
        subject:content.subject,
        text:content.message
    }

    await transporter.sendMail(mailOptions) 
  
}

module.exports=sendEmail