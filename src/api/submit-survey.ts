export async function submitSurvey(data: {
    walletName: string;
    connectionMethod: string;
    additionalText: string;
  }) {
    const response = await fetch('https://resend-multiifix.netlify.app/.netlify/functions/submit-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit survey');
    }
  
    return response.json();
  }
  