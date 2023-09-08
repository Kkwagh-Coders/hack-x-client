import { LATENCY_IN_SECONDS } from './serverConfig';

async function fakeRequest(
  data: any,
  expectedResponse: any,
  isRejected: boolean,
) {
  const response = await new Promise((resolve, reject) => {
    console.log('Fake Request Data: ', data);

    setTimeout(() => {
      if (isRejected) {
        return reject(new Error('Promise IsRejected'));
      }
      return resolve({ data: expectedResponse });
    }, LATENCY_IN_SECONDS * 1000);
  });

  return response;
}

export default fakeRequest;
