module.exports = {
  name: 'Keep Out',
  url: '/out/:person/:noun/:possessive/:container/:from',
  fields: [
    { name: 'Person', field: 'person' },
    { name: 'Noun', field: 'noun' },
    { name: 'Possessive Determiner', field: 'possessive' },
    { name: 'Container', field: 'container' },
    { name: 'From', field: 'from' }
  ],

  register (app, output) {
    return app.get('/out/:person/:noun/:possessive/:container/:from', function (req, res) {
      const message = `Keep ${req.params.person}'s ${req.params.noun} out ${req.params.possessive} fucking ${req.params.container}`
      const subtitle = `- ${req.params.from}`
      return output(req, res, message, subtitle)
    })
  }
}
