export const handlerBotApiGateway = async (event: any, context: any, callback: any) => {
  console.log('Request arrived...')
  const body = JSON.parse(event.body)

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(body),
  })
}