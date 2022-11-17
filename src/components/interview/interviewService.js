import axios from 'axios'
import {
  error,
  getAllInterviews,
  getInterview,
  loading,
  resetFlags,
  getInterviewStats,
} from './InterviewSlice.js'

export async function getAllInterviewsService(dispatch, token) {
  dispatch(loading())

  try {
    const res = await axios.get(
      process.env.REACT_APP_API_HOST + '/api/interviews',
      {
        headers: {
          Authorization: token,
        },
      }
    )

    // console.log('res', res)
    dispatch(getAllInterviews(res.data))
  } catch (err) {
    console.log('error', err)
    dispatch(error())
  }
}

export async function getInterviewService(dispatch, token, id) {
  dispatch(loading())

  try {
    const res = await axios.get(
      process.env.REACT_APP_API_HOST + '/api/interview/' + id,
      {
        headers: {
          Authorization: token,
        },
      }
    )

    dispatch(getInterview(res.data))
  } catch (err) {
    dispatch(getInterview({}))
    console.log('error', err)
    dispatch(error())
  }
}

export async function createInterviewService(
  dispatch,
  token,
  title,
  id,
  interviewData
) {
  dispatch(loading())

  try {
    const res =
      title === 'Agregar nueva entrevista'
        ? await axios.post(
            process.env.REACT_APP_API_HOST + '/api/interviews',
            interviewData,
            {
              headers: {
                Authorization: token,
                'Content-Type': 'application/json',
              },
            }
          )
        : await axios.put(
            process.env.REACT_APP_API_HOST + '/api/interview/' + id,
            interviewData,
            {
              headers: {
                Authorization: token,
                'Content-Type': 'application/json',
              },
            }
          )

    dispatch(resetFlags())
    return res.data._id
  } catch (err) {
    dispatch(getInterview({}))
    console.log('error', err.response.data)
    dispatch(error())
  }
}

export async function deleteInterviewService(dispatch, token, id) {
  dispatch(loading())

  try {
    const res = await axios.delete(
      process.env.REACT_APP_API_HOST + '/api/interview/' + id,
      {
        headers: {
          Authorization: token,
        },
      }
    )

    // console.log('res', res)
    dispatch(resetFlags())
  } catch (err) {
    dispatch(getInterview({}))
    // console.log('error', err)
    dispatch(error())
  }
}

export async function getInterviewStatsService(dispatch, token) {
  dispatch(loading())

  try {
    const res = await axios.get(
      process.env.REACT_APP_API_HOST + '/api/statsInterviews',
      {
        headers: {
          Authorization: token,
        },
      }
    )

    // console.log('res', res)
    dispatch(getInterviewStats(res.data))
  } catch (err) {
    dispatch(getInterview({}))
    // console.log('error', err)
    dispatch(error())
  }
}
