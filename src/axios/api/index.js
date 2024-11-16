import demo from './demo.js'
import notes from './notes.js'
import markdown from './markdown.js'
import apiTest from './apiTest.js'
import dirFile from './dirfile.js'
import sayDict from './sayDict.js'
import sayConfig from './sayConfig.js'
// import { request } from '@/axios/request/http.js'

export const api = {
  ...demo,
  ...notes,
  ...markdown,
  ...apiTest,
  ...dirFile,
  ...sayDict,
  ...sayConfig,
}
