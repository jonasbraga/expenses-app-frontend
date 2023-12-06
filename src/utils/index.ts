import { decodeJwt } from 'jose'

export const paymentMethodsIdMapper = new Map([
  ['PIX', '43195d22-1c82-4843-b3ca-4629b863991b'],
  ['DÉBITO', '0f160b31-412c-4082-b70d-5b20e44363a9'],
  ['CRÉDITO', 'c9b20762-c81c-418a-b79b-1cf4c5516502'],
  ['DINHEIRO', '82f95afb-8bc7-4fbf-85e8-c7d064233e12'],
])

export const paymentIdMethodsMapper = new Map([
  ['43195d22-1c82-4843-b3ca-4629b863991b', 'PIX'],
  ['0f160b31-412c-4082-b70d-5b20e44363a9', 'DÉBITO'],
  ['c9b20762-c81c-418a-b79b-1cf4c5516502', 'CRÉDITO'],
  ['82f95afb-8bc7-4fbf-85e8-c7d064233e12', 'DINHEIRO'],
])

type jwtClaims = {
  userId: string
  iat: number
  exp: number
  aud: string
  iss: string
  sub: string
  jti: string
}

export const getDecodedToken = () => {
  const token = sessionStorage.getItem('token')
  if (!token) {
    return null
  }
  const claims = decodeJwt<jwtClaims>(token)

  return claims
}

export const getUserIdFromToken = () => {
  const claims = getDecodedToken()
  if (!claims) {
    return null
  }
  return claims.iss
}
