import {PrivateKey} from '@textile/crypto'
import {Client} from '@textile/threads-client'

declare const USER_API_SECRET: string
declare const USER_API_KEY: string

export async function handleRequest(request: Request): Promise<Response> {
  try {
    const client = await Client.withKeyInfo({
      key: USER_API_KEY,
      secret: USER_API_SECRET
    }, undefined, true)

    const identity = PrivateKey.fromRandom()
    const token = await client.getToken(identity)

    return new Response(token)
  } catch (e) {
    return new Response(e)
  }
}
