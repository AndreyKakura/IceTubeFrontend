export interface AuthResponseDto {
  accessToken: string,

  refreshToken: string,

  roles: Array<string>
}
