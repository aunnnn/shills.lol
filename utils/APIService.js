import axios from 'axios'

const BASE_URL = "https://api.shills.lol"

const urlWithPath = (path) => `${BASE_URL}${path}`

const getAllLists = () => {
  return axios.get(urlWithPath('/lists'))
}

const getList = (symbol) => {
  return axios.get(urlWithPath(`/lists/${symbol}`))
}

const getIntroLists = () => {
  return axios.get(urlWithPath(`/intro_lists`))
}

const addNewDefinition = (list_id, text) => {
  return axios.post(urlWithPath(`/definitions`), {
    list_id: list_id,
    text: text,
  })
}

const voteDefinition = (def_id, vote_type, vote_amount=1) => {
  if (vote_type !== "up" && vote_type !== "down") {
    console.error("Error! vote_type must be either 'up' or 'down'")
    return null
  }
  return axios.post(urlWithPath(`/vote`), {
    def_id,
    vote_type,
    vote_amount,
  })
}

export default {
  getAllLists,
  getList,
  getIntroLists,
  addNewDefinition,
  voteDefinition,
}
