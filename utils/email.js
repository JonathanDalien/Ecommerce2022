const sGMail = require("@sendgrid/mail")

sGMail.setApiKey("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")

module.exports= class Email {
    constructor(user, url){
        this.to = user.email;
        this.url = url;
        this.fromEmail = "electronicsse@zohomail.eu"
        this.fromName= "Electronics"
    }
    async sendMagicLink() {
        const mailOptions = {
          to: this.to,
          from: {
            email: this.fromEmail,
            name: this.fromName,
          },
          templateId: 'd-2a43af3c349946b3a1411c6037145e14',
          dynamic_template_data: {
            url: this.url,
          },
        };
    
        await sGMail.send(mailOptions).then(() => {}, console.error);
      }
    };


