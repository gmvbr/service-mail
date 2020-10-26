# Service e-mail

Microserviço para enviar e-mails através do [AMQP](https://www.npmjs.com/package/amqplib).

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