export interface User {
  username?: string
  email: string
  password: string
  avatar?: string
}
// https://twitter.com/mattpocockuk/status/1744320298743108031
// https://twitter.com/mattpocockuk/status/1745049856207368320
// type safe fetch https://twitter.com/mattpocockuk/status/1746857014255403499
/*
 {
  "user": {
    "id": "d314b11c-99ba-48df-9c2f-64e04f71d8da",
    "aud": "authenticated",
    "role": "authenticated",
    "email": "arbust908@gmail.com",
    "email_confirmed_at": "2024-01-30T00:15:50.369623Z",
    "phone": "",
    "confirmation_sent_at": "2024-01-30T00:15:23.187591Z",
    "confirmed_at": "2024-01-30T00:15:50.369623Z",
    "last_sign_in_at": "2024-01-30T00:38:31.72073396Z",
    "app_metadata": {
      "provider": "email",
      "providers": [
        "email"
      ]
    },
    "user_metadata": {},
    "identities": [
      {
        "identity_id": "02f52b9a-9d10-4391-aa20-680799c490bb",
        "id": "d314b11c-99ba-48df-9c2f-64e04f71d8da",
        "user_id": "d314b11c-99ba-48df-9c2f-64e04f71d8da",
        "identity_data": {
          "email": "arbust908@gmail.com",
          "email_verified": false,
          "phone_verified": false,
          "sub": "d314b11c-99ba-48df-9c2f-64e04f71d8da"
        },
        "provider": "email",
        "last_sign_in_at": "2024-01-30T00:15:23.185925Z",
        "created_at": "2024-01-30T00:15:23.185973Z",
        "updated_at": "2024-01-30T00:15:23.185973Z",
        "email": "arbust908@gmail.com"
      }
    ],
    "created_at": "2024-01-30T00:15:23.184024Z",
    "updated_at": "2024-01-30T00:38:31.725278Z"
  },
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiIsImtpZCI6IjBWMUQyK0hDQXozZnBOdWYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA2NTc4NzExLCJpYXQiOjE3MDY1NzUxMTEsImlzcyI6Imh0dHBzOi8vbWRpbGhodmp2dmJ6enluZmdld2Quc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImQzMTRiMTFjLTk5YmEtNDhkZi05YzJmLTY0ZTA0ZjcxZDhkYSIsImVtYWlsIjoiYXJidXN0OTA4QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzA2NTc1MTExfV0sInNlc3Npb25faWQiOiJhOWFmMTQ4Ny1hM2E4LTQ1NzktYWU5Yi1mNjcyOTBhNmU2MmUifQ.lF3Hc3uzgGVqjzCw_iEzEb8tfOOD4LNfAP3uqbLzJ7U",
    "token_type": "bearer",
    "expires_in": 3600,
    "expires_at": 1706578711,
    "refresh_token": "ymWnKXtTTZvgYe1L80Yauw",
    "user": {
      "id": "d314b11c-99ba-48df-9c2f-64e04f71d8da",
      "aud": "authenticated",
      "role": "authenticated",
      "email": "arbust908@gmail.com",
      "email_confirmed_at": "2024-01-30T00:15:50.369623Z",
      "phone": "",
      "confirmation_sent_at": "2024-01-30T00:15:23.187591Z",
      "confirmed_at": "2024-01-30T00:15:50.369623Z",
      "last_sign_in_at": "2024-01-30T00:38:31.72073396Z",
      "app_metadata": {
        "provider": "email",
        "providers": [
          "email"
        ]
      },
      "user_metadata": {},
      "identities": [
        {
          "identity_id": "02f52b9a-9d10-4391-aa20-680799c490bb",
          "id": "d314b11c-99ba-48df-9c2f-64e04f71d8da",
          "user_id": "d314b11c-99ba-48df-9c2f-64e04f71d8da",
          "identity_data": {
            "email": "arbust908@gmail.com",
            "email_verified": false,
            "phone_verified": false,
            "sub": "d314b11c-99ba-48df-9c2f-64e04f71d8da"
          },
          "provider": "email",
          "last_sign_in_at": "2024-01-30T00:15:23.185925Z",
          "created_at": "2024-01-30T00:15:23.185973Z",
          "updated_at": "2024-01-30T00:15:23.185973Z",
          "email": "arbust908@gmail.com"
        }
      ],
      "created_at": "2024-01-30T00:15:23.184024Z",
      "updated_at": "2024-01-30T00:38:31.725278Z"
    }
  }
}
*/
export interface SupaUser {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string
  phone: string
  confirmation_sent_at: string
  confirmed_at: string
  last_sign_in_at: string
  app_metadata: {
    provider: string
    providers: string[]
  }
  user_metadata: Record<string, unknown>
  identities: {
    identity_id: string
    id: string
    user_id: string
    identity_data: {
      email: string
      email_verified: boolean
      phone_verified: boolean
      sub: string
    }
    provider: string
    last_sign_in_at: string
    created_at: string
    updated_at: string
    email: string
  }[]
  created_at: string
  updated_at: string
}

export interface SupaSession {
  access_token: string
  token_type: string
  expires_in: number
  expires_at: number
  refresh_token: string
  user: SupaUser
}
