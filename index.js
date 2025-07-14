const express = require('express');
const app = express();
const realEstateRoutes = require('./routes/realEstateRoutes');

app.use(express.json());

app.use('/api', realEstateRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
