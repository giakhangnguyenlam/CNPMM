const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET_CLIENT,
    process.env.GOOGLE_REDIRECT_URL
);


oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN});

var sendMail  = async (req, res, next) => {
    
    try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'laptrinhweb66@gmail.com',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_CLIENT,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });


    var mainOptions = { 
        from: 'laptrinhweb66@gmail.com',
        to: req.body.email,
        subject: 'Xác nhận đơn hàng ' + req.body.id,
        text: 'Cảm ơn bạn đã sử dụng dịch vụ mua sắm trực tuyến của nhóm 2 CNPMM',
        html: '<ul><li>Mã đơn hàng:'+req.body.id+'</li><li>Tổng tiền: '+req.body.total+'</li><li>Trạng thái đơn hàng: '+req.body.orderStatus+'</li><li> Trạng thái thanh toán: '+req.body.paymentStatus+'</li><li>Ngày đặt hàng: '+req.body.orderDate+'</li></ul>'
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            return res.status(201).json({mess: "Can't send mail"});
        } else {
            console.log('Message sent: ' +  info.response);
            return res.status(201).json({mess: 'Order successfully'});
        }
    })}
    catch{
        return res.status(201).json({mess: 'Mail service is fail '});
    }
}

module.exports = {
    sendMail
}