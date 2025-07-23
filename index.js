const express = require('express');
const app = express();
const realEstateRoutes = require('./routes/masterRoutes');
const PORT=process.env.PORT

app.use(express.json());

app.use('/api', realEstateRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
