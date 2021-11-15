import axios from 'axios'
const server = process.env.REACT_APP_BASE_URL

export const requestForgotPassword = (email) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      axios({
        url: server + '/forgot-password',
        method: 'POST',
        data: {email}
      }).then(({ data }) => {
        resolve(data)
      }).catch(({ response }) => {
        console.log(response)
        reject(response)
      })
    })
  }
}