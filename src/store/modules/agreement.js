/**
 * Created by yangshan on 2017/6/8.
 */
const agreement = {
  state: [
    {
      id: '',
      agreementFields: [
        {
          highLight: '',
          propertyName: '',
          type: '',
          key: '',
          markerId: {
            endMarkerId: '',
            startMarkerId: ''
          },
          height: '',
          value: ''
        }
      ],
      mainAgreement: ''
    }
  ],
  mutations: {
    SET_AGREEMENT: (state, result) => {
      let id = result.id
      state[id] = result
      state.edited = true
    }
  }
}

export default agreement
