import Ajv from 'ajv';

function validate() {
  const ajv = new Ajv({
    allErrors: true,
    useDefaults: true,
  });
  const env = ajv.compile({
    type: 'object',
    properties: {
      AMQP_URL: {
        type: 'string',
      },
      AMQP_QUEUE: {
        type: 'string',
        default: 'queue_email',
      },
      TRANSPORT_HOST: {
        type: 'string',
      },
      TRANSPORT_PORT: {
        type: 'string',
        default: '587',
      },
      TRANSPORT_SECURE: {
        type: 'string',
        default: 'false',
      },
      TRANSPORT_AUTH_USER: {
        type: 'string',
      },
      TRANSPORT_AUTH_PASS: {
        type: 'string',
      },
    },
    required: [
      'AMQP_URL',
      'AMQP_QUEUE',
      'TRANSPORT_HOST',
      'TRANSPORT_PORT',
      'TRANSPORT_SECURE',
      'TRANSPORT_AUTH_USER',
      'TRANSPORT_AUTH_PASS',
    ],
  });
  const result = env(process.env);
  if (!result) {
    console.error(env.errors);
    throw new Error('environment: error');
  }
}

export default validate;
