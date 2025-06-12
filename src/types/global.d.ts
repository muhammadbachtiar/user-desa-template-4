interface LABahasaChatbotConfigType {
    token: string
    baseUrl: string
  }
  
  declare global {
    interface Window {
      LABahasaChatbotConfig: LABahasaChatbotConfigType
    }
  }
  
  export {}