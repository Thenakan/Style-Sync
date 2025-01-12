import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Contact } from '../models/contact';

type ResponseData = {
  message: string;
};

// Create a Nodemailer transporter (using Gmail for this example)
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address (e.g., 'example@gmail.com')
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Send email function
const sendEmail = (contact: Contact) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email
    to: process.env.RECIPIENT_EMAIL, // Recipient email (your email)
    subject: `New Contact Form Submission: ${contact.subject}`,
    text: `
      You have a new contact form submission:

      Name: ${contact.name}
      Email: ${contact.email}
      Phone: ${contact.phone}
      Subject: ${contact.subject}
      Message: ${contact.message}
    `,
  };

  return transporter.sendMail(mailOptions);
};

// POST method handler
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message }: Contact = await req.json();

    // Validate form data (you can add more validation here if needed)
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Name, Email, and Message are required.' }, { status: 400 });
    }

    // Send email
    await sendEmail({ name, email, phone, subject, message });

    // Respond back to the client
    return NextResponse.json({ message: 'Form submitted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error handling form submission:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
