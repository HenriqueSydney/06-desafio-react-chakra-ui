import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://parseapi.back4app.com/classes/',
  headers: {
    'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', // This is the fake app's application id
    'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH', // This is the fake app's readonly master key
  },
})
