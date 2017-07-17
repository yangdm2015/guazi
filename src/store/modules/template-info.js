/**
 * Created by yangshan on 2017/6/8.
 */
const templateInfo = {
  state: {
    id: '',
    name: '',
    type: '',
    templateSrc: ''
  },
  mutations: {
    SET_TEMPLATE_INFO: (state, result) => {
      state = result
      state.edited = true
    }
  }
}
export default templateInfo
