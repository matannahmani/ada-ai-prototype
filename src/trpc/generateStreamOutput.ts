export const generateStreamOutput = (data: string) => `***OUTPUT:${data}***`
export const isStreamOutput = (data: string) => data.startsWith("***OUTPUT:")
export const parseStreamOutput = (data: string) => {
  if (isStreamOutput(data)) {
    return data.substring(data.indexOf("{"), data.lastIndexOf("}") + 1)
  }
  return null
}
