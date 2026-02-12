import RNPrint from 'react-native-print';
import { Platform } from 'react-native';

interface AssessmentResult {
    id?: string;
    created_at: string;
    result?: string;
    predicted_stage?: string;
    confidence?: number;
    stage_description?: string;
    next_steps_advice?: string[];
    [key: string]: any;
}

export const generateAssessmentPDF = async (result: AssessmentResult, assessmentType: string): Promise<string | null> => {
    try {
        const date = new Date(result.created_at).toLocaleDateString();
        const time = new Date(result.created_at).toLocaleTimeString();
        const score = result.predicted_stage || result.result || 'N/A';

        const adviceHtml = result.next_steps_advice
            ? `
                <div class="section">
                    <div class="section-title">Next Steps</div>
                    <ul>
                        ${result.next_steps_advice.map(advice => `<li>${advice}</li>`).join('')}
                    </ul>
                </div>
              `
            : '';

        const descriptionHtml = result.stage_description
            ? `
                <div class="section">
                    <div class="section-title">Assessment Insight</div>
                    <p>${result.stage_description}</p>
                </div>
              `
            : '';

        const html = `
            <html>
            <head>
                <style>
                    body {
                        font-family: 'Helvetica', sans-serif;
                        color: #0F172A;
                        padding: 40px;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 40px;
                        border-bottom: 2px solid #2a9d90;
                        padding-bottom: 20px;
                    }
                    .logo {
                        font-size: 32px;
                        font-weight: bold;
                        color: #2a9d90;
                        margin-bottom: 10px;
                    }
                    .report-title {
                        font-size: 24px;
                        font-weight: bold;
                        color: #0F172A;
                        text-transform: uppercase;
                    }
                    .meta-info {
                        color: #64748B;
                        font-size: 14px;
                        margin-top: 10px;
                    }
                    .summary-card {
                        background-color: #F8FAFC;
                        border: 1px solid #E2E8F0;
                        border-radius: 12px;
                        padding: 24px;
                        margin-bottom: 30px;
                        text-align: center;
                    }
                    .score-label {
                        font-size: 14px;
                        font-weight: bold;
                        color: #64748B;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 8px;
                    }
                    .score-value {
                        font-size: 36px;
                        font-weight: bold;
                        color: #2a9d90;
                    }
                    .section {
                        margin-bottom: 24px;
                    }
                    .section-title {
                        font-size: 18px;
                        font-weight: bold;
                        color: #0F172A;
                        margin-bottom: 12px;
                        border-left: 4px solid #2a9d90;
                        padding-left: 12px;
                    }
                    ul {
                        padding-left: 20px;
                    }
                    li {
                        margin-bottom: 8px;
                        line-height: 1.5;
                        color: #334155;
                    }
                    p {
                        line-height: 1.6;
                        color: #334155;
                    }
                    .footer {
                        margin-top: 60px;
                        text-align: center;
                        font-size: 12px;
                        color: #94A3B8;
                        border-top: 1px solid #E2E8F0;
                        padding-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo">Neurosense</div>
                    <div class="report-title">${assessmentType} Report</div>
                    <div class="meta-info">Generated on ${date} at ${time}</div>
                </div>

                <div class="summary-card">
                    <div class="score-label">Assessment Result</div>
                    <div class="score-value">${score}</div>
                </div>

                ${descriptionHtml}
                ${adviceHtml}

                <div class="footer">
                    <p>Generated by Neurosense App</p>
                    <p><strong>DISCLAIMER:</strong> This report is for informational purposes only and does not constitute a medical diagnosis. Please consult a healthcare professional for clinical advice.</p>
                </div>
            </body>
            </html>
        `;

        // Prefer RNPrint.printToFile when available (some versions/platforms expose it)
        if (RNPrint && typeof (RNPrint as any).printToFile === 'function') {
            const results = await (RNPrint as any).printToFile({
                html: html,
                fileName: `Neurosense_${assessmentType}_${new Date().getTime()}`
            });

            return (results && (results.filePath || results.filepath)) || null;
        }

        // Fallback: try using react-native-html-to-pdf (preferred for generating a file)
        try {
            // dynamic import so the project still runs if the package isn't installed
            const RNHTMLtoPDF = await import('react-native-html-to-pdf');
            if (RNHTMLtoPDF && typeof RNHTMLtoPDF.convert === 'function') {
                const pdf = await RNHTMLtoPDF.convert({
                    html,
                    fileName: `Neurosense_${assessmentType}_${new Date().getTime()}`,
                    base64: false
                });

                return (pdf && (pdf.filePath || pdf.filepath)) || null;
            }
        } catch (err) {
            // package not installed or import failed; continue to next fallback
            console.warn('react-native-html-to-pdf not available:', err);
        }

        // Last resort: open the print dialog (may allow saving as PDF manually)
        if (RNPrint && typeof (RNPrint as any).print === 'function') {
            await (RNPrint as any).print({ html });
            return null;
        }

        console.error('No available method to generate PDF on this platform.');
        return null;
    } catch (error) {
        console.error('Failed to generate PDF', error);
        return null;
    }
};
