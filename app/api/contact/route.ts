import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, subject, message } = body;

        // Validate input
        if (!email || !subject || !message) {
            return NextResponse.json(
                { error: 'Tüm alanlar zorunludur.' },
                { status: 400 }
            );
        }

        // Configure the transporter
        // User should have set these in their .env file
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER, // Sender address
            to: process.env.SMTP_USER, // Receiver (the business owner)
            replyTo: email, // If we reply, it goes to the user
            subject: `LexDanisman İletişim Formu: ${subject}`,
            text: `
        Yeni bir iletişim formu mesajı alındı.

        Gönderen: ${email}
        Konu: ${subject}

        Mesaj:
        ${message}
      `,
            html: `
        <h3>Yeni İletişim Formu Mesajı</h3>
        <p><strong>Gönderen:</strong> ${email}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <br/>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email başarıyla gönderildi.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            { error: 'Email gönderilirken bir hata oluştu.' },
            { status: 500 }
        );
    }
}
