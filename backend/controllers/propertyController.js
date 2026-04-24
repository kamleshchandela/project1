const Property = require('../models/Property');

// Create new property
exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { property }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort('-createdAt');
    res.status(200).json({
      status: 'success',
      results: properties.length,
      data: { properties }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get single property
exports.getProperty = async (req, res) => {
  try {
    let property;
    try {
      property = await Property.findById(req.params.id);
    } catch (err) {
      // If it fails to cast to ObjectId (e.g. manual string ID), fallback to exact string match
      property = await Property.collection.findOne({ _id: req.params.id });
    }

    if (!property) {
      return res.status(404).json({
        status: 'fail',
        message: 'Property not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: { property }
    });
  } catch (error) {
    console.error("Get Property Error:", error);
    res.status(400).json({
      status: 'fail',
      message: error.message || 'Invalid ID format'
    });
  }
};

// Update property (Optional)
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: { property }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
