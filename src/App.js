// import React from 'react'
// import {
//   NameCards,
//   Chats,
//   Header,
//   Skills,
//   FooterButtons,
//   // Login,
//   // Signup,
//   // SignupOrg,
// } from './components'
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// import './styles/App.css'
// import SignupOrg from './components/SignUpOrg'
// import Login from './components/AuthForm'
// import Signup from './components/SignUp'

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Switch>
//           <Route path="/chat">
//             <Header />
//             <Chats />
//           </Route>
//           <Route path="/skills">
//             <Header />
//             <Skills />
//           </Route>
//           <Route path="/">
//             <Header />
//             <NameCards />
//           </Route>
//           <Route path="/login">
//             <Login />
//           </Route>
//           <Route path="/signup">
//             <Signup />
//           </Route>
//           <Route path="/signupOrg">
//             <SignupOrg />
//           </Route>
//         </Switch>
//         <FooterButtons />
//       </Router>
//     </div>
//   )
// }

// export default App

import React from 'react'
// import Navbar from "./components/NavBar";
import Routes from './routes'

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes />
    </div>
  )
}

export default App
