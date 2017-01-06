export function handleAPIError(res) {
  return function (error) {
    console.error(error)
    return res.send({ error })
  }
}
