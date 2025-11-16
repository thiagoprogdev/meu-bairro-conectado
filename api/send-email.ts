// Vercel automatically creates a serverless function from this file.
// This function will live at the /api/send-email endpoint.

// We are using the Edge runtime for speed and efficiency.
export const config = {
  runtime: 'edge',
};

// This is the main handler for the serverless function.
export default async function handler(request: Request) {
  // We only want to handle POST requests for this endpoint.
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Only POST requests are allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get the form data from the request body.
    const formData = await request.json();

    // --- EMAIL SENDING LOGIC ---
    // In a real-world scenario, you would integrate an email sending service here.
    // Examples: Nodemailer, SendGrid, Resend, AWS SES.
    // You would use an API key stored securely as an environment variable.

    // For this example, we will simulate the email sending by logging the details
    // to the Vercel function logs (server-side console).
    console.log("--- NEW FORM SUBMISSION ---");
    console.log("Recipient: thiagoanalista.estacio@gmail.com");
    console.log("Subject: New Form Submission from 'Meu Bairro Conectado'");
    console.log("Body (JSON data):");
    console.log(JSON.stringify(formData, null, 2));
    console.log("---------------------------");

    // After successfully "sending" the email, return a success response.
    return new Response(JSON.stringify({ message: 'Form submitted successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    // If anything goes wrong, log the error and return a server error response.
    console.error('Error handling form submission:', error);
    return new Response(JSON.stringify({ message: 'Error processing request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
