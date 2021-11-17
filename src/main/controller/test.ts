const test = {
  testFunc: (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data,
          handled: 'handled'
        })
      }, 1000)
    })
  }
}

export default test;
