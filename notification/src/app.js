
var aws = require("aws-sdk");
var ses = new aws.SES({ region: "ap-southeast-2" });

exports.lambdaHandler = async function (fullevent, context) {

    // Log the event information for debugging purposes.
    console.log('Received event:', JSON.stringify(fullevent, null, 2));
    var recipient = [];
    var event = JSON.parse(fullevent.body);
    
    var newMessage='Subject: '+event.subject+'\r\n';
            newMessage = newMessage + event.name+'\r\n';
            newMessage = newMessage + event.email+'\r\n\r\n';
            newMessage = newMessage + event.message;
            var mailOptions = {
                from: 'cutlunchemailer@gmail.com',
                to: 'cutlunchdeli@gmail.com',
                replyTo:event.email,
                subject: "Website Contact Form Message",
                html: newMessage,

            };
           
    var params = {
        Destination: {
          ToAddresses: ["cutlunchdeli@gmail.com","jdunlop467@gmail.com"],
        },
        Message: {
          Body: {
            Text: { Data: newMessage },
          },
    
          Subject: { Data: mailOptions.subject },
        },
        Source: "cutlunchemailer@gmail.com",
      };
     
      return ses.sendEmail(params).promise()
    
};