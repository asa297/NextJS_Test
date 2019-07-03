import React from 'react'
import { getPageNameFromReq } from '<helpers>/utils'
import firebase from 'firebase/app'
import 'firebase/auth'
import { withAuthFirebase } from '<components>'
import { admin } from '<helpers>/role'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)

    return { pageName: name }
  }

  test() {
    firebase.auth().signInWithEmailAndPassword('makejack4@gmail.com', '026936804')
  }

  render() {
    return (
      <>
        <div>test</div>
        <button onClick={() => this.test()}>test</button>
      </>
    )
  }
}

export default withAuthFirebase([admin])(index)
