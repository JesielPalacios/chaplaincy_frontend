import axios from 'axios'

export async function createMatterCancellationService({
  subjectToCancel,
  teacher,
  lastDateOfClassAttendance,
  studentSignature,
  token,
}) {
  const formData = new FormData()
  formData.append('subjectToCancel', subjectToCancel)
  formData.append('teacher', teacher)
  formData.append('lastDateOfClassAttendance', lastDateOfClassAttendance)
  formData.append('file', studentSignature)

  return await axios
    .post('http://localhost:3001/api/matter-cancellations', formData, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (!res.ok) throw new Error('La respuesta es NO ok')
      return res.json()
    })
}

export async function getAllMatterCancellationsService(token) {
  return await axios.get('http://localhost:3001/api/matter-cancellations', {
    headers: {
      Authorization: token,
    },
  })
}

export async function getMatterCancellationService(token, id) {
  return await axios.get('http://localhost:3001/api/matter-cancellation/' + id, {
    headers: {
      Authorization: token,
    },
  })
}
