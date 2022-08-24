import json

def handler(event, context):

  print(f'received event: {event}')
  body = event['body']
  print(f"body {body}")

  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps(f'Hello from your new Amplify Python lambda! {body}')
  }
