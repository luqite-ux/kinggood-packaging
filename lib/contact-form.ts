type InquiryInsertResult = { error: unknown }

export async function submitInquirySafely(
  insertInquiry: () => PromiseLike<InquiryInsertResult>,
): Promise<boolean> {
  try {
    const { error } = await insertInquiry()
    return !error
  } catch {
    return false
  }
}

export async function submitInquiryWithClient<Client>(
  createClient: () => Client | null,
  insertInquiry: (client: Client) => PromiseLike<InquiryInsertResult>,
): Promise<boolean> {
  return submitInquirySafely(() => {
    const client = createClient()
    return client
      ? insertInquiry(client)
      : Promise.resolve({ error: new Error('Inquiry client is unavailable') })
  })
}
