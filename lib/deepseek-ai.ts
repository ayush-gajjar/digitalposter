interface DeepSeekConfig {
  apiKey: string;
  baseURL?: string;
}

class DeepSeekAI {
  private apiKey: string;
  private baseURL: string;

  constructor(config: DeepSeekConfig) {
    this.apiKey = config.apiKey || 'YOUR_DEEPSEEK_API_KEY'; // Replace with your DeepSeek API key
    this.baseURL = config.baseURL || 'https://api.deepseek.com/v1';
  }

  async generatePosterContent(prompt: string, festivalType: string, businessInfo?: any): Promise<any> {
    try {
      const systemPrompt = `You are a professional poster designer AI. Generate creative poster content based on user requirements. Return JSON format with title, description, colors, layout suggestions, and text content.`;
      
      const userPrompt = `Create a ${festivalType} festival poster with the following requirements: ${prompt}. 
      ${businessInfo ? `Business Info: ${JSON.stringify(businessInfo)}` : ''}
      
      Please provide:
      1. Main title text
      2. Subtitle/description 
      3. Color scheme (primary, secondary, accent colors)
      4. Layout suggestions
      5. Additional text elements
      6. Design style recommendations`;

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Try to parse as JSON, fallback to structured response
      try {
        return JSON.parse(content);
      } catch {
        return this.parseAIResponse(content, festivalType);
      }
    } catch (error) {
      console.error('DeepSeek AI error:', error);
      return this.getFallbackContent(festivalType);
    }
  }

  private parseAIResponse(content: string, festivalType: string): any {
    return {
      title: `Amazing ${festivalType} Celebration`,
      subtitle: 'Join us for an unforgettable celebration',
      colors: {
        primary: this.getFestivalColors(festivalType).primary,
        secondary: this.getFestivalColors(festivalType).secondary,
        accent: this.getFestivalColors(festivalType).accent
      },
      layout: 'center-focused',
      elements: [
        { type: 'title', text: `${festivalType} Festival`, size: 'large' },
        { type: 'subtitle', text: 'Celebration Time!', size: 'medium' },
        { type: 'description', text: content.substring(0, 100) + '...', size: 'small' }
      ],
      style: 'modern'
    };
  }

  private getFestivalColors(festival: string): any {
    const colorSchemes: any = {
      diwali: { primary: '#FF6B35', secondary: '#F7931E', accent: '#FFD23F' },
      holi: { primary: '#FF69B4', secondary: '#00CED1', accent: '#32CD32' },
      christmas: { primary: '#C41E3A', secondary: '#228B22', accent: '#FFD700' },
      eid: { primary: '#004225', secondary: '#FFD700', accent: '#FFFFFF' },
      'new-year': { primary: '#FFD700', secondary: '#000000', accent: '#C0C0C0' },
      default: { primary: '#3B82F6', secondary: '#8B5CF6', accent: '#F59E0B' }
    };
    return colorSchemes[festival.toLowerCase()] || colorSchemes.default;
  }

  private getFallbackContent(festivalType: string): any {
    return {
      title: `${festivalType} Celebration`,
      subtitle: 'Join the festivities!',
      colors: this.getFestivalColors(festivalType),
      layout: 'traditional',
      elements: [
        { type: 'title', text: `Happy ${festivalType}!`, size: 'large' },
        { type: 'subtitle', text: 'Wishing you joy and happiness', size: 'medium' }
      ],
      style: 'traditional'
    };
  }

  async generateBusinessPoster(businessType: string, eventType: string, businessInfo: any): Promise<any> {
    const prompt = `Create a professional ${businessType} ${eventType} poster for business promotion.`;
    return await this.generatePosterContent(prompt, eventType, businessInfo);
  }

  async improveExistingContent(currentContent: string, improvements: string): Promise<any> {
    const prompt = `Improve this poster content: "${currentContent}" with these requirements: ${improvements}`;
    return await this.generatePosterContent(prompt, 'general');
  }
}

export const deepSeekAI = new DeepSeekAI({
  apiKey: 'YOUR_DEEPSEEK_API_KEY' // Replace with your actual API key
});

export default DeepSeekAI;