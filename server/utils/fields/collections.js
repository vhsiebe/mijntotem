const fields = [
    'title',
    'description',
    'thumbnail',
    '*variants.calculated_price',
    'handle',
    '*categories',
];

export default fields.join(',');