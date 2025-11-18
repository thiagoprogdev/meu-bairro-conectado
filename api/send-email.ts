// Vercel automatically creates a serverless function from this file.
// This function will live at the /api/send-email endpoint.

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Only POST requests are allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const formData = await request.json();
    const resendApiKey = process.env.RESEND_API_KEY;

    // =====================================================================
    // ENVIO REAL (RESEND)
    // =====================================================================
    if (resendApiKey) {
        try {
            const res = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${resendApiKey}`
                },
                body: JSON.stringify({
                    from: 'Meu Bairro Conectado <onboarding@resend.dev>',
                    // OBS: No plano gratuito do Resend, você geralmente só pode enviar
                    // para o e-mail que você cadastrou na conta.
                    to: ['thiagoanalista.estacio@gmail.com'], 
                    subject: `Novo Contato: ${formData.formType}`,
                    html: `
                        <div style="font-family: sans-serif; padding: 20px; color: #333;">
                            <h1 style="color: #166534;">Novo Formulário Recebido</h1>
                            <p><strong>Tipo de Formulário:</strong> ${formData.formType}</p>
                            <hr style="border: 1px solid #eee; margin: 20px 0;" />
                            <h3>Dados:</h3>
                            <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${JSON.stringify(formData, null, 2)}</pre>
                        </div>
                    `
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Erro ao enviar pelo Resend:", errorData);
                // Se falhar o envio real, lançamos erro para cair no catch
                throw new Error(`Erro Resend: ${JSON.stringify(errorData)}`);
            }

            return new Response(JSON.stringify({ message: 'E-mail enviado com sucesso!' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });

        } catch (emailError) {
            console.error("Falha ao tentar enviar e-mail real:", emailError);
            // Em caso de falha na API de e-mail, retornamos erro 500 para o frontend saber
            return new Response(JSON.stringify({ message: 'Erro ao processar envio de e-mail.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }

    // =====================================================================
    // MODO SIMULAÇÃO (Fallback se não houver API KEY)
    // =====================================================================
    console.log("=== [SIMULAÇÃO - SEM CHAVE API] ===");
    console.log("Para envio real, adicione RESEND_API_KEY nas variáveis de ambiente da Vercel.");
    console.log("Dados recebidos:", JSON.stringify(formData, null, 2));
    
    return new Response(JSON.stringify({ message: 'Form submitted successfully (Simulation Mode)' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error handling form submission:', error);
    return new Response(JSON.stringify({ message: 'Error processing request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
