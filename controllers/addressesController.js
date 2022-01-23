const validateIP = require('validate-ip-node');
const axios = require('axios');

exports.checkBody = (req, res, next) => {
  if (req.body.initial) {
    const adresses = req.body.data;
    for (const adress of adresses) {
      if (!validateIP(adress.ip)) {
        return res.status(404).json({
          status: 'fail',
          message: 'Invalid IP',
        });
      }
      // eslint-disable-next-line radix
      const p = parseInt(adress.port);
      // eslint-disable-next-line no-restricted-globals
      if (p < 0 || p > 65535 || isNaN(p)) {
        return res.status(404).json({
          status: 'fail',
          message: 'Invalid port',
        });
      }
    }
  }

  next();
};

const getNode = async (ip, port) => {
  try {
    const node = await axios.get(
      `https://bitnodes.io/api/v1/nodes/${ip}-${port}/`
    );
    node.data.port = port;
    return node.data;
  } catch (e) {
    if (e.response.statusText === 'Not Found')
      return { address: ip, port, status: 'Not A Bitcoin Node' };
    console.log(e.message);
  }
};

exports.getBitcoinNodesList = async (req, res) => {
  const bitcoinNodesData = [];
  const adresses = req.body.data;

  try {
    for (const adress of adresses) {
      // eslint-disable-next-line no-await-in-loop
      const node = await getNode(adress.ip, adress.port);
      bitcoinNodesData.push(node);
    }
    console.log(bitcoinNodesData);
    return res.status(201).json({
      status: 'success',
      data: bitcoinNodesData,
    });
  } catch (e) {
    res.status(404).json({
      status: 'faild',
      message: e.message,
    });
  }
};

// exports.createTour = (req, res) => {
//   // console.log(req.body);

//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);

//   tours.push(newTour);

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
// };
