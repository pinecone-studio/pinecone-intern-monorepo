import { QueryResolvers } from '../../generated';
import { EmployeeModel } from '../../models';
import { emailSender } from '../../utils/email-sender';

export const getEmployeeByEmail: QueryResolvers['getEmployeeByEmail'] = async (_: unknown, { email }) => {
  const OTP = Math.floor(1000 + Math.random() * 9000);
  const tokenDate = new Date();
  const employee = await EmployeeModel.findOneAndUpdate(
    { email },
    {
      otpToken: OTP.toString(),
      otpUpdatedAt: tokenDate,
    }
  );

  if (!employee) {
    throw new Error('No employee found with the provided email address');
  }

  const senderName = `${employee.username}`;
  const subject = 'Нэг удаагийн код';
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
  <style>
    /* General reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #f1f1f1;
    }
    .header h1 {
      font-size: 24px;
      color: #333333;
    }
    .otp-section {
      margin: 40px 0;
      text-align: center;
    }
    .otp-code {
      font-size: 30px;
      font-weight: bold;
      color: #4CAF50;
      padding: 10px;
      background-color: #f1f1f1;
      border-radius: 5px;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      font-size: 12px;
      color: #888888;
    }
    .footer a {
      color: #007BFF;
      text-decoration: none;
    }
    .footer p {
      margin-top: 10px;
    }

    /* Responsive Design */
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 15px !important;
      }
      .otp-code {
        font-size: 28px;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <!-- Header Section -->
    <div class="header">
      <h1>OTP Verification</h1>
      <p>${senderName} OTP code is:</p>
    </div>

    <!-- OTP Code Section -->
    <div class="otp-section">
      <div class="otp-code">
        ${OTP}
      </div>
      <p>Please use this code to complete your verification.</p>
    </div>
  </div>

</body>
</html>
  `;
  emailSender((email = employee.email), subject, htmlContent);
  return employee;
};
