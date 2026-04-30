'use server';
/**
 * @fileOverview An advanced dental AI agent that analyzes a smile image and generates a structured report.
 *
 * - smileAnalysisReportGeneration - A function that handles the smile analysis report generation process.
 * - SmileAnalysisInput - The input type for the smileAnalysisReportGeneration function.
 * - SmileAnalysisOutput - The return type for the smileAnalysisReportGeneration function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SmileAnalysisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A cropped image of a user's smile, focusing on the teeth area, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SmileAnalysisInput = z.infer<typeof SmileAnalysisInputSchema>;

const SmileAnalysisOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      "A reassuring and professional summary of the smile analysis findings, avoiding overly technical or alarming language. This summary should acknowledge the user's current dental health and highlight any minor variations found."
    ),
  keyMetrics: z
    .object({
      toothColor: z
        .string()
        .describe(
          "An assessment of the tooth color, e.g., 'Slightly Yellow', 'White', 'Normal'."
        ),
      gumVisibility: z
        .string()
        .describe(
          "An assessment of gum visibility, e.g., 'Normal', 'Slightly Receded', 'Visible'."
        ),
      alignment: z
        .string()
        .describe(
          "An assessment of tooth alignment, e.g., 'Straight', 'Minor Crowding', 'Some Gaps'."
        ),
      cleanliness: z
        .string()
        .describe("An assessment of teeth cleanliness, e.g., 'Good', 'Fair', 'Needs Attention'.")
    })
    .describe("Key dental health metrics derived from the smile analysis."),
  recommendations: z
    .array(z.string())
    .describe(
      "A list of personalized, actionable, and encouraging recommendations for improving or maintaining dental health. Each recommendation should be a concise sentence. Examples: 'Consider mild whitening', 'Maintain daily brushing & flossing', 'Schedule routine check-up'."
    ),
  confidence: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "A confidence score (0-100) indicating the AI's certainty in its analysis. This score should reflect the overall health and minor variations, often around 80-95% for generally healthy smiles."
    ),
});
export type SmileAnalysisOutput = z.infer<typeof SmileAnalysisOutputSchema>;

export async function smileAnalysisReportGeneration(input: SmileAnalysisInput): Promise<SmileAnalysisOutput> {
  return smileAnalysisReportGenerationFlow(input);
}

const smileAnalysisReportPrompt = ai.definePrompt({
  name: 'smileAnalysisReportPrompt',
  input: { schema: SmileAnalysisInputSchema },
  output: { schema: SmileAnalysisOutputSchema },
  prompt: `You are an advanced dental AI specialized in analyzing smile images to provide reassuring and professional assessments. Your goal is to analyze the provided image of a user's smile, focusing on the teeth and surrounding gum area, and generate a structured report.

The report should include:
1.  A concise and reassuring summary of the findings, avoiding technical jargon or alarming phrases. Focus on the overall health and minor variations.
2.  Key metrics such as tooth color, gum visibility, alignment, and cleanliness, described in simple, understandable terms.
3.  A list of actionable and encouraging recommendations for dental health.
4.  A confidence score for the analysis.

Analyze the following smile image:
{{media url=photoDataUri}}

Provide the output in JSON format according to the specified schema, ensuring all descriptions for fields are considered for the content and tone.`,
});

const smileAnalysisReportGenerationFlow = ai.defineFlow(
  {
    name: 'smileAnalysisReportGenerationFlow',
    inputSchema: SmileAnalysisInputSchema,
    outputSchema: SmileAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await smileAnalysisReportPrompt(input);
    return output!;
  }
);
