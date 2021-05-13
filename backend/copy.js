app.get('/auth/cart', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'cart.html'))

);

app.get('/auth/cancel', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'cancel.html'))

);

app.patch('/auth/change-details', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'change-details.html'))

);

app.post('/auth/login', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'login.html'))

);

app.get('/auth/my-items', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'my-items.html'))

);

app.get('/auth/orders', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'orders.html'))

);

app.get('/auth/order', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'order.html'))

);

app.get('/auth/payouts', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'payouts.html'))

);

app.put('/auth/save-new-iban', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'save-your-iban.html'))

);

app.put('/auth/sell', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'sell.html'))

);

app.get('/auth/settings', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'settings.html'))

);

app.put('/auth/signup', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'signup.html'))

);

app.post('/auth/success', (req, res) =>

res.sendFile(path.resolve(__dirname + '/../', 'frontend' , 'out', 'auth', 'change-details.html'))

);