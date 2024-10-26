class FetchService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(
    endpoint,
    options = {},
    isTokenRequired = true,
    isVoid = false,
    onError = () => {}
  ) {
    const authToken = `Bearer ${localStorage.getItem('authToken')}`;
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');

    if (isTokenRequired) {
      headers.set('Authorization', authToken);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      onError(response);

      const errorText = await response.text();
      throw new Error(`Fetch error: ${response.status} - ${errorText}`);
    }

    try {
      if (!isVoid) {
        return await response.json();
      }
    } catch (error) {
      console.log('error returning response: ', error);
      throw new Error(`Parsing error: can't parse json from response`);
    }
  }
}

const fetchService = new FetchService('http://localhost:8080/');

export default fetchService;

// TODO:
// Token Refresh and Retries
// Add token refresh logic and automatic retries for certain status codes
