document.addEventListener('DOMContentLoaded', function () {
  function request (url, form) {
    return new Promise(function (resolve, reject) {
      var formData = new window.FormData(form)

      var xhr = new window.XMLHttpRequest()
      xhr.onreadystatechange = function (event) {
        if (this.readyState === 4) {
          if (this.status === 200) {
            resolve(this.responseText)
          } else {
            var error = new Error(this.statusText)
            error.status = this.status
            error.statusText = this.statusText
            error.responseText = this.responseText
            reject(error)
          }
        }
      }
      xhr.open('POST', '/statistics', true)
      xhr.send(formData)
    })
  }

  function updateElement (name, value) {
    var element = document.querySelector(name)
    element.innerHTML = value
  }

  var file = document.querySelector('input[type="file"]')

  file.addEventListener('click', function (event) {
    this.value = null
  })

  file.addEventListener('change', function (event) {
    event.preventDefault()

    var form = document.querySelector('form')
    request('/statistics', form)
      .then(function (responseText) {
        var statistics = JSON.parse(responseText)
        console.log('Statistics API Response Received')
        console.log(statistics)
        updateElement('.lines', statistics.lineCount)
        updateElement('.words', statistics.wordCount)
        updateElement('.letters', statistics.letterCount)
        updateElement('.common_letters', statistics.commonLetters.join(', '))
        updateElement('.common_words', statistics.commonWords.join(', '))
        updateElement('.mean', statistics.mean)
        updateElement('.median', statistics.median)
        updateElement('.mode', statistics.mode.join(', '))
        document.querySelector('.statistics').classList.remove('hidden')
        document.querySelector('.error').classList.add('hidden')
      })
      .catch(function (error) {
        if (error.status === 415) {
          var response = JSON.parse(error.responseText)
          return Promise.reject(new Error(response.error))
        }
        return Promise.reject(error)
      })
      .catch(function (error) {
        console.log('Statistics API Error Received')
        console.log(error)
        updateElement('.error', error)
        document.querySelector('.statistics').classList.add('hidden')
        document.querySelector('.error').classList.remove('hidden')
      })

    return false
  })
})
