const config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || '',
  appName: process.env.REACT_APP_NAME || '',
  appVersion: process.env.REACT_APP_VERSION || '',
  linkedInCallbackUrl: process.env.REACT_APP_LINKEDIN_CALLBACK_URL || '',
  linkedInClientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID || '',
  websiteName: process.env.REACT_APP_WEBSITE_NAME || 'Knecthub'
};

export default config;
