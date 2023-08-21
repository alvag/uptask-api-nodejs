export * from './send-email.helper';

export const generateRandomId = () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const timestamp = new Date().getTime().toString(36);
    return `${randomString}${timestamp}`;
};
