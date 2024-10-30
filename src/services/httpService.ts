import mockMessages from "./data.json";

export const httpService = {
  async getMessages() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return mockMessages;
  },
};