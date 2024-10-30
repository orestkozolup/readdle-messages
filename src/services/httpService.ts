import mockMessages from "./data.json";

export const httpService = {
  async getMessages() {
    await new Promise(resolve => setTimeout(resolve, 8000));
    return mockMessages;
  },
};