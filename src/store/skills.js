// import axios from "axios";

const SET_SKILLS = 'SET_SKILLS'
// const DUMMY_SKILLS_LIST = ["C++", "JavaScript", "SQL", "HTML"];
const DUMMY_SKILLS_LIST = [
  {id: 1, name: 'C++'},
  {id: 2, name: 'JavaScript'},
  {id: 3, name: 'SQL'},
  {id: 4, name: 'HTML'},
]

const setSkills = (skills) => ({type: SET_SKILLS, skills})

export const getAllSkills = () => async (dispatch) => {
  try {
    //Access API to get the skills list from DB table
    // const {data : skills} = await axios.get(`/api/skills`);
    // dispatch(setSkills(skills));
    console.log('dispatching set skills')
    dispatch(setSkills(DUMMY_SKILLS_LIST))
  } catch (err) {
    console.error(err)
  }
}

const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SKILLS:
      console.log(action.skills)
      return action.skills
    default:
      return state
  }
}
