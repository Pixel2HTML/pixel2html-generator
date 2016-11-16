'use strict'

module.exports = {
  errorHandler : function (error) {
    console.log(error.toString());
    this.emit('end');
  }
}
