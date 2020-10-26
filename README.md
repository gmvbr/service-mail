# Service e-mail

Microserviço para enviar e-mails através do [AMQP](https://www.npmjs.com/package/amqplib).

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts) 
[![Node.js CI](https://github.com/gmvbr/service-mail/workflows/Node.js%20CI/badge.svg?branch=main)](https://github.com/gmvbr/service-mail/actions) [![codecov](https://codecov.io/gh/gmvbr/service-mail/branch/main/graph/badge.svg)](https://codecov.io/gh/gmvbr/service-mail)


# Variáveis de ambiente

Chave               | Tipo       | Padrão
--------------------|------------| -----------
TRANSPORT_HOST      |  string    |   
TRANSPORT_PORT      |  int       | 587
TRANSPORT_SECURE    |  boolean   | false
TRANSPORT_AUTH_USER |  string    |
TRANSPORT_AUTH_PASS |  string    |
AMQP_URL            |  string    |
AMQP_QUEUE          |  string    | queue_email


# Enviar a mensagem no formato json, em UTF-8

Vejas as opções de mensagem em [nodemail](https://nodemailer.com/message/)


# Desenvolvimento

```bash
docker-compose -f docker-compose.test.yml up
```