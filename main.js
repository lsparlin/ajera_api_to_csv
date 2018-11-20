var config = require('./config.json')
var projectReader = require('./ProjectReader.js')

var axios = require('axios')
var createCsvWriter = require('csv-writer').createObjectCsvWriter

const csvFilename = 'output/test-output.csv'
const csvWriter = createCsvWriter({
  path: csvFilename,
  header: projectReader.csvColumnDefinition
})
var csvWriterPromise = Promise.resolve()

axios.post(config.ApiUrl, { // CreateAPISession
  Method: "CreateAPISession",
  Username: config.auth.Username,
  Password: config.auth.Password,
  APIVersion: 1,
  UseSessionCookie: false
}).then( (response) => {
  console.log('API Token message:', response.data.Message)

  return response.data.Content.SessionToken
}).then( (sessionToken) => {

  axios.post(config.ApiUrl, { // ListProjects
    Method: "ListProjects",
    SessionToken: sessionToken,
    MethodArguments: config.ListProjectsArguments
  }).then( (listProjectsResponse) => {
    var projects = listProjectsResponse.data.Content.Projects
    console.log('Found', projects.length, 'projects')
    console.log('Getting more details...')

    var lastGetProjectsPromise
    for (var i = 0; i <= projects.length; i += 100) {
      lastGetProjectsPromise = axios.post(config.ApiUrl, { // GetProjects
        Method: 'GetProjects',
        SessionToken: sessionToken,
        MethodArguments: {
          RequestedProjects: projects.map( p => p.ProjectKey).slice(i, i + 100)
        }
      }).then( (getProjectsResponse) => {
        var fullProjects = getProjectsResponse.data.Content.Projects
  
        var csvProjects = fullProjects.map(project => projectReader.projectForCsv(project)) 
        csvWriterPromise = csvWriterPromise.then( () => { csvWriter.writeRecords(csvProjects); return "success" })
          .catch( error => {
            console.log('error writing CSV:', error)
          })
          .then(() => console.log('Writing projects to', csvFilename))
      })

    }

    lastGetProjectsPromise.then( () => { // EndAPISession
      axios.post(config.ApiUrl, { Method: 'EndAPISession', SessionToken: sessionToken}).then( (endResponse) => { console.log(endResponse.data.Content.message) })
    })

  })

})

