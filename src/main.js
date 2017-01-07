import 'normalize.css/normalize.css'
import 'mdi/css/materialdesignicons.min.css'

import './styles/base.scss'
import './styles/common.scss'

import * as store from './store'

store.initFirebase()
store.initVue()
