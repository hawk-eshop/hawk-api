export const RFC_9110_BASE_URL = 'https://datatracker.ietf.org/doc/html/rfc9110#name-'

export const RFC_9110_LINKS: Record<number, string> = {
  400: `${RFC_9110_BASE_URL}400-bad-request`,
  401: `${RFC_9110_BASE_URL}401-unauthorized`,
  403: `${RFC_9110_BASE_URL}403-forbidden`,
  404: `${RFC_9110_BASE_URL}404-not-found`,
  500: `${RFC_9110_BASE_URL}500-internal-server-error`
  // Add more mappings as needed
}
