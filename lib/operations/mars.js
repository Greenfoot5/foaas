module.exports = {
    name: 'Fuck off to Mars',
    url: '/mars/:from',
    fields: [
      { name: 'From', field: 'from' }
    ],

    register (app, output) {
      return app.get('/mars/:company/:from', function (req, res) {
        const message = `Get on a spaceship and fuck off to mars`
        const subtitle = `- ${req.params.from}`
        return output(req, res, message, subtitle)
      })
    }
  }
