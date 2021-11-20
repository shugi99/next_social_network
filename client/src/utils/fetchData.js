import axios from 'axios'
import { API_URL } from '@helpers/config'

const defaultOptions = {
  baseURL: API_URL,
  withCredentials: true,
}

export const api = axios.create(defaultOptions)

export const getDataAPI = async (url, token) => {
  const res = await api.get(`${url}`, {
    headers: { Authorization: token },
  })
  return res
}

export const postDataAPI = async (url, post, token) => {
  const res = await api.post(`${url}`, post, {
    headers: { Authorization: token },
  })
  return res
}

export const putDataAPI = async (url, post, token) => {
  const res = await api.put(`${url}`, post, {
    headers: { Authorization: token },
  })
  return res
}

export const patchDataAPI = async (url, post, token) => {
  const res = await api.patch(`${url}`, post, {
    headers: { Authorization: token },
  })
  return res
}

export const deleteDataAPI = async (url, token) => {
  const res = await api.delete(`${url}`, {
    headers: { Authorization: token },
  })
  return res
}
