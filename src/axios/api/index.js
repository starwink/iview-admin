import demo from './demo.js'
import notes from './notes.js'
import markdown from './markdown.js'
import apiTest from './apiTest.js'
// import { request } from '@/axios/request/http.js'

export const api = {
  ...demo,
  ...notes,
  ...markdown,
  ...apiTest,
}
