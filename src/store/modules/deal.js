/**
 * Created by yangshan on 2017/6/8.
 */
const deal = {
  state: {
    started: false,
    clicked: false,
    comfirmed: false
  },
  mutations: {
    DEAL_STARTED: (state) => {
      state.started = true
    },
    TAB_CLICKED: (state) => {
      state.clicked = true
    },
    DEAL_COMFIRMED: (state) => {
      state.comfirmed = true
    }
  }
}

export default deal
