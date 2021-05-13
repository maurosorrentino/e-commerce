app.get('/auth/cart', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'cart.html'))

);

app.get('/auth/cancel', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'cancel.html'))

);

app.get('/auth/change-details', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'change-details.html'))

);

app.get('/auth/login', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'login.html'))

);

app.get('/auth/my-items', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'my-items.html'))

);

app.get('/auth/orders', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'orders.html'))

);

app.get('/auth/payouts', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'payouts.html'))

);

app.get('/auth/save-your-iban', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'save-your-iban.html'))

);

app.get('/auth/sell', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'sell.html'))

);

app.get('/auth/settings', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'settings.html'))

);

app.get('/auth/signup', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'signup.html'))

);

app.get('/auth/success', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'success.html'))

);

app.get('/reset-password', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'reset-password.html'))

);

app.get('/view-item/:itemId', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'view-item[itemId].html'))

);

app.get('/reset-password-form/:resetToken/:userId', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'reset-password-form[resetToken][userId].html'))

);