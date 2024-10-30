import mockMessages from "./data.json";

const getRandomDelay = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const httpService = {
  async getMessages() {
    const delay = getRandomDelay(1000, 5000);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return mockMessages;
  },
};
