export const extractPdfText = async (file: File): Promise<string> => {
  const text = await file.text()
  return text
}
